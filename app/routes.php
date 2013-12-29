<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the Closure to execute when that URI is requested.
|
*/

Route::get('/', function()
{
	return View::make('app');
});

Route::get('/todo', function()
{
	return Todo::all();
});

Route::get('/todo/{id}', function($id)
{
	return Todo::find($id);
});

Route::post('/todo', function()
{
	return Todo::create(Input::all());
});

Route::put('/todo/{id}', function($id)
{
	$todo = Todo::find($id);
	$todo->update(Input::all());
	return $todo;
});

Route::delete('/todo/{id}', function($id)
{
	Todo::find($id)->delete();
	return '';
});
