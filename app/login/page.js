"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import {
  FaArrowLeft,
  FaEnvelope,
  FaLock,
  FaUserShield,
  FaShieldAlt,
  FaKey,
} from "react-icons/fa";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "/firebase";
import Link from "next/link";
import Image from "next/image";

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
      router.push("/dashboard");
    } catch (error) {
      console.error("Login Error: ", error);
      if (error.code === "auth/user-not-found") {
        setError("email", { message: "No user found with this email" });
      } else if (error.code === "auth/wrong-password") {
        setError("password", { message: "Incorrect password" });
      } else {
        setError("password", {
          message: "An error occurred. Please try again.",
        });
      }
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-b from-[#24428a] to-[#7888b0] text-white font-sans">
      <Link
        href="/"
        className="absolute top-8 left-8 flex items-center gap-2 text-gray-800 hover:text-blue-600 transition-colors"
      >
        <FaArrowLeft className="text-xl" />
        <span>Back to Home</span>
      </Link>{" "}
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-4xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left side - Welcome Content */}
          <div className="hidden lg:flex flex-col justify-center">
            <Image
              src="/logo.png"
              alt="Civic Connect Logo"
              width={250} // Reasonable width based on your design needs
              height={60} // Adjust the height to maintain the aspect ratio of the logo
              className="mb-8" // Remove the object-contain if it's not needed
            />

            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              Welcome Back!
            </h2>
            <p className="text-gray-600 mb-8">
              Log in to your account to manage civic services, track community
              engagement, and make a difference in your area.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-gray-600">
                <FaUserShield className="text-blue-600 text-xl" />
                <span>Secure authentication system</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <FaShieldAlt className="text-blue-600 text-xl" />
                <span>Protected data privacy</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <FaKey className="text-blue-600 text-xl" />
                <span>Role-based access control</span>
              </div>
            </div>
          </div>

          {/* Right side - Login Form */}
          <div className="flex flex-col justify-center">
            <h1 className="text-2xl font-bold text-center mb-8 text-gray-800 lg:text-left">
              Sign In to Your Account
            </h1>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-600 mb-1 block">
                    Email
                  </label>
                  <div className="flex items-center gap-3 border rounded-lg p-2 focus-within:border-blue-500 transition">
                    <FaEnvelope className="text-gray-400" />{" "}
                    <input
                      type="email"
                      placeholder="Enter your email"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address",
                        },
                      })}
                      className="w-full border-none outline-none bg-transparent text-sm text-black"
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="text-sm text-gray-600 mb-1 block">
                    Password
                  </label>
                  <div className="flex items-center gap-3 border rounded-lg p-2 focus-within:border-blue-500 transition">
                    <FaLock className="text-gray-400" />{" "}
                    <input
                      type="password"
                      placeholder="Enter your password"
                      {...register("password", {
                        required: "Password is required",
                        minLength: {
                          value: 6,
                          message:
                            "Password should be at least 6 characters long",
                        },
                      })}
                      className="w-full border-none outline-none bg-transparent text-sm text-black"
                    />
                  </div>
                  {errors.password && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.password.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex justify-end">
                <Link
                  href="/forgetpassword"
                  className="text-sm text-blue-600 hover:text-blue-700 hover:underline"
                >
                  Forgot your password?
                </Link>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:bg-blue-400 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Signing in..." : "Sign In"}
              </button>

              <p className="text-center text-sm text-gray-600 mt-6">
                Don't have an account yet?{" "}
                <Link
                  href="/signup"
                  className="text-blue-600 hover:underline font-medium"
                >
                  Create an account
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
