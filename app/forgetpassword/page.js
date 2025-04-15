'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaEnvelope, FaArrowLeft } from 'react-icons/fa';
import Link from 'next/link';

export default function ForgetPasswordPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    // Handle forget password logic (like sending an email to reset password)
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] flex flex-col items-center justify-center p-6">
      {/* Back to Home Arrow outside the card */}
      <Link href="/" className="absolute top-8 left-8 text-xl text-gray-800 hover:text-black">
        <FaArrowLeft />
      </Link>

      {/* Card with darker shadow */}
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Forgot Password</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4">
          <div className="flex items-center gap-3 border-b pb-2">
            <FaEnvelope className="text-gray-500" />
            <input
              type="email"
              placeholder="Email"
              {...register('email', {
                required: 'Email is required',
                pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              })}
              className="w-full border-none outline-none bg-transparent text-sm"
            />
          </div>
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 mt-6 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
          >
            Reset Password
          </button>
        </form>

        <p className="mt-4 text-sm text-center">
          Remembered your password?{' '}
          <Link href="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
