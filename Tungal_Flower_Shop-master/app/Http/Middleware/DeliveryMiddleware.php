<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class DeliveryMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next)
    {
        // Change 'role' to whatever column your users table uses to define the user type
        if (auth()->check() && auth()->user()->role === 'delivery') {
            return $next($request);
        }

        abort(403, 'Unauthorized. Delivery personnel only.');
    }
}
