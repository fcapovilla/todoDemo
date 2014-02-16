<?php

class Todo extends Eloquent {

	protected $fillable = array('label', 'done');

	public function getCreatedAtAttribute()
	{
		return strtotime($this->attributes['created_at']);
	}

	public function getUpdatedAtAttribute()
	{
		return strtotime($this->attributes['updated_at']);
	}
}
