<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AdminMiddleware
{
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        switch($user->role){
            case 'Admin':
            case 'Manager':
            case 'Owner':
                return $next($request);
                break;
            default:
                abort(403);
        }
    }
}