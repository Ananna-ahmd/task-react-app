<?php

namespace App\Http\Controllers;
use Inertia\Inertia;
use App\Models\TaskList;


use Illuminate\Http\Request;

class ListController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $lists = TaskList::where('user_id', auth()->id())->get();
        return Inertia::render('Lists/index',[
            'lists' => $lists,
            'flash' => [session('success'),
            'errors' => session('errors'),]
        ]);

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
       $validated = $request->validate([
        'title' => 'required|string|max:255',
        'description' => 'nullable|string|max:255',


       ]);
       TaskList::create([
        ... $validated,
        'user_id' => auth()->id(),
       ]);
       return redirect()->route('lists.index')->with('success', 'List created successfully');


    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, TaskList $list )
    {
         $validated = $request->validate([
        'title' => 'required|string|max:255',
        'description' => 'nullable|string|max:255',


       ]);
       $list->update($validated);
       return redirect()->route('lists.index')->with('success', 'List updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(TaskList $list)
    {
        $list->delete();
        return redirect()->route('lists.index')->with('success', 'List deleted successfully');
    }
}
