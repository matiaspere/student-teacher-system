<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Evaluations;
use App\Models\User;


class EvaluationController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $this->authorize('crear-evaluacion');

        $teacherId = $request->teacher_id;
        $studentId = $request->student_id;
        $nota = $request->nota;

        $teacher = User::find($teacherId);
        $student = User::find($studentId);

        $evaluation = new Evaluations();
        $evaluation->teacher()->associate($teacher);
        $evaluation->student()->associate($student);
        $evaluation->nota = $nota;
        $evaluation->save();

        return response()->json($evaluation, 201);
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
