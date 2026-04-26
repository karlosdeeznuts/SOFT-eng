<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EmployeeMiddleware
{
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        switch($user->role){
            case 'Cashier':
                return $next($request);
                break;
            default:
                abort(403);
        }
    }
}