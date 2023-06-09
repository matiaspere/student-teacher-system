<?php

namespace App\Http\Controllers;

use App\Models\Evaluations;
use Illuminate\Http\Request;
use App\Models\User;

class UsersController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }
    /**
     * Display a listing of the resource.
     */
    public function index($user_rols_id, $paginate)
    {
        if (!$paginate) {
            $users = User::query()->where('user_rols_id', $user_rols_id)->get();
            return response()->json($users);
        }
        $users = User::query()->where('user_rols_id', $user_rols_id)->paginate($paginate);
        return response()->json($users);
    }

    public function getStudents()
    {
        $users = User::query()->where('user_rols_id', 2)->get();
        return response()->json($users);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function getEvaluations($id)
    {
        $evaluations = Evaluations::where('student_id', $id)->get();
        $average = $evaluations->avg('nota');

        return response()->json([
            "average" => $average,
            "evaluations" => $evaluations,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
