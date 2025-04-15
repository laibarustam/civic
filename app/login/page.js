'use client';

import { useForm } from 'react-hook-form';
import { useState } from 'react';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle form submission
  const onSubmit = (data) => {
    setIsSubmitting(true);

    // Simulate API call for authentication (replace with actual API)
    setTimeout(() => {
      if (data.email === 'test@example.com' && data.password === 'password123') {
        // Simulating successful login
        window.location.href = '/profile'; // Redirect to profile after successful login
      } else {
        // Simulating failed login (invalid credentials)
        setError('password', { message: 'Invalid email or password' });
        setIsSubmitting(false);
      }
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#f7f7f9] flex flex-col items-center justify-center p-8">
      {/* Back Arrow outside the card */}
      <Link href="/" className="absolute top-8 left-8 text-2xl text-gray-800 cursor-pointer hover:text-indigo-600 transition-all">
        <FaArrowLeft />
      </Link>

      {/* Login Form Card with white background, centered */}
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-3xl flex flex-col items-center">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">Login to Your Account</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4">
          {/* Email Field */}
          <div className="flex flex-col space-y-2">
            <label htmlFor="email" className="text-sm text-gray-600">Email</label>
            <input
              id="email"
              type="email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address',
                },
              })}
              className="w-full p-3 border rounded-md outline-none bg-transparent"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          {/* Password Field */}
          <div className="flex flex-col space-y-2">
            <label htmlFor="password" className="text-sm text-gray-600">Password</label>
            <input
              id="password"
              type="password"
              {...register('password', {
                required: 'Password is required',
                minLength: { value: 6, message: 'Password should be at least 6 characters long' },
              })}
              className="w-full p-3 border rounded-md outline-none bg-transparent"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          {/* Error message for invalid credentials */}
          {errors.password?.message && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-300 disabled:bg-blue-400"
          >
            {isSubmitting ? 'Logging in...' : 'Log In'}
          </button>
        </form>

        <div className="text-sm text-center mt-4">
        <Link href="/forgetpassword" className="text-blue-600 hover:underline">
  Forget your password?
</Link>
</div>


        <div className="text-sm text-center mt-2">
          <span>Don't have an account?</span>
          <Link href="/signup" className="text-blue-600 hover:underline ml-1">Sign Up</Link>
        </div>
      </div>
    </div>
  );
}
