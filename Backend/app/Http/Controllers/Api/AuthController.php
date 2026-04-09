<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    // Check Authentication Status
    public function check()
    {
        return response()->json([
            'user' => Auth::user(),
        ]);
    }

    // User Registration (SPA Auth)
    public function register(Request $request)
    {
        // 1. Validate input
        $validator = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
        ]);

        // 2. Create user
        $user = User::create([
            'name'     => $validator['name'],
            'email'    => $validator['email'],
            'password' => Hash::make($validator['password']),
        ]);

        // Login the user immediately using Session guard
        Auth::login($user);

        return response()->json([
            'message' => 'Account created successfully',
            'user' => $user->only(['id', 'name', 'email', 'role', 'phone', 'avatar']),
        ], 201);
    }

    // User Login (SPA Auth)
    public function login(Request $request)
    {
        // 1. Validate Input
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        // 2. Attempt to authenticate using the Session guard
        if (!Auth::attempt($credentials)) {
            throw ValidationException::withMessages([
                'email' => ['Incorrect email or password.'],
            ]);
        }

        // 3. Regenerate session to prevent fixation
        $request->session()->regenerate();

        // 4. Success Response
        return response()->json([
            'message' => 'Logged in successfully',
            'user' => Auth::user(),
        ], 200);
    }

    // User Logout (SPA Auth)
    public function logout(Request $request)
    {
        // For SPA Auth, we will log out using the Session guard
        Auth::guard('web')->logout();
        
        // Invalidate the session and regenerate CSRF token
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json([
            'message' => 'Logged out successfully'
        ], 200);
    }
}