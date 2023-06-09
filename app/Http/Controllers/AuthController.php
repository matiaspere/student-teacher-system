<?php

namespace App\Http\Controllers;

use App\Models\UserRol;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\User;


class AuthController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login', 'signup']]);
    }

    public function signup(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|string|email|max:100|unique:users',
            'password' => 'required|string|min:6',
            'password_confirmation' => 'required|same:password',
            'user_rols_id' => 'required',
        ]);

        if ($validator->fails()) {
            return response([
                'errors' => $validator->errors()->toJson()
            ]);
        }

        $user_rol = UserRol::findOrFail($request->user_rols_id);

        $user = $user_rol->users()->create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'user_rols_id' => $request->user_rols_id,
        ]);
        // dd($user);
        return response([
            'user' => $user,
        ], 201);
    }
    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required',
            'password' => 'required',
        ]);

        if ($validator->fails()) {
            return response([
                'errors' => $validator->errors()->toJson()
            ]);
        }

        $credentials = request(['email', 'password']);
        // dd($credentials);
        if (!$token = auth()->attempt($credentials)) {
            $errors = 'User or password incorrect';
            // dd($token);
            return response()->json($errors);
        }

        return $this->respondWithToken($token);
    }

    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function user()
    {

        return response()->json(auth()->user());
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        auth()->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        return $this->respondWithToken(auth()->refresh());
    }

    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'user' => auth()->user(),
            'expires_in' => auth()->factory()->getTTL() * 60
        ]);
    }


}
