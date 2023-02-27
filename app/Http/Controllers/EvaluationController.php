<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Evaluations;
use App\Models\User;
use Illuminate\Support\Facades\Validator;



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
        $date = $request->date;

        $validator = Validator::make($request->all(), [
            'teacher_id' => 'required',
            'student_id' => 'required',
            'nota' => 'required|numeric|min:1|max:10',
            // 'date' => 'required',
        ]);

        if ($validator->fails()) {
            return response([
                'errors' => $validator->errors()->toJson()
            ]);
        }
        $teacher = User::find($teacherId);
        $student = User::find($studentId);

        $evaluation = new Evaluations();
        $evaluation->teacher()->associate($teacher);
        $evaluation->student()->associate($student);
        $evaluation->nota = $nota;
        $evaluation->created_at = $date;
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
