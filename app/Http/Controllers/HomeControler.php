<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class HomeControler extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index($value, $paginate)
    {

        if ($value == "null") {
            $users = User::paginate($paginate);

            foreach ($users as $user) {
                if ($user->user_rols_id === 2) {
                    $user->average = $user->evaluations()->avg('nota');
                }
            }

            return response()->json([
                "users" => $users,
            ]);
        }

        $users = User::where('name', 'LIKE', "%$value%")
            ->orWhere('email', 'LIKE', "%$value%")
            ->paginate($paginate);

        foreach ($users as $user) {
            if ($user->user_rols_id === 2) {
                $user->average = $user->evaluations()->avg('nota');
            }
        }

        return response()->json([
            "users" => $users
        ]);
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
    public function show(string $id)
    {
        //
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
