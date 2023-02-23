<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserRol extends Model
{
    use HasFactory;

    public function users() {
        return $this->hasMany(NewUser::class, "user_rols_id");
    }
}
