'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { FaArrowLeft } from 'react-icons/fa';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '/firebase';
import Link from 'next/link'; // ✅ Added this import

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      router.push('/dashboard');
    } catch (error) {
      console.error("Login Error: ", error);
      if (error.code === 'auth/user-not-found') {
        setError('email', { message: 'No user found with this email' });
      } else if (error.code === 'auth/wrong-password') {
        setError('password', { message: 'Incorrect password' });
      } else {
        setError('password', { message: 'An error occurred. Please try again.' });
      }
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <Link href="/" className="absolute top-8 left-8 text-xl text-gray-800 hover:text-black">
        <FaArrowLeft />
      </Link>

      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-3xl flex flex-col items-center">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">Login to Your Account</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4">
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
