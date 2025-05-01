"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaPhone,
  FaArrowLeft,
  FaIdCard,
  FaBuilding,
  FaMapMarkerAlt,
} from "react-icons/fa";
import Link from "next/link";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "/firebase";
import { doc, setDoc } from "firebase/firestore";

export default function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setError,
  } = useForm();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const departments = [
    "Municipal Administration",
    "Roads & Infrastructure",
    "Water & Sanitation",
    "Parks & Recreation",
    "Public Health",
    "Environmental Protection",
    "Urban Planning",
    "Public Safety",
    "Transportation",
    "Emergency Services",
  ];

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    try {
      // Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const user = userCredential.user;

      // Store additional user data in Firestore
      await setDoc(doc(db, "user_admin", user.uid), {
        full_name: data.name,
        email: data.email,
        phone: data.phone,
        rank: data.rank,
        department: data.department,
        badge_number: data.badgeNumber,
        city: data.city,
        cnic: data.cnic,
        created_at: new Date().toISOString(),
        role: "Admin",
        status: "Active",
      });

      router.push("/login");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        setError("email", { message: "Email is already in use" });
      } else if (error.code === "auth/weak-password") {
        setError("password", { message: "Password is too weak" });
      } else {
        setError("password", {
          message: "An error occurred. Please try again.",
        });
      }
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-white">
      <Link
        href="/"
        className="absolute top-8 left-8 text-xl text-gray-800 hover:text-black"
      >
        <FaArrowLeft />
      </Link>

      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-3xl flex flex-col items-center">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Sign Up
        </h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-md space-y-4"
        >
          {/* Full Name */}
          <div className="flex items-center gap-3 border-b pb-2">
            <FaUser className="text-gray-500" />
            <input
              type="text"
              placeholder="Full Name"
              {...register("name", { required: "Name is required" })}
              className="w-full border-none outline-none bg-transparent text-sm text-gray-700 placeholder-gray-500"
            />
          </div>
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}

          {/* Email */}
          <div className="flex items-center gap-3 border-b pb-2">
            <FaEnvelope className="text-gray-500" />
            <input
              type="email"
              placeholder="Email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Invalid email address",
                },
              })}
              className="w-full border-none outline-none bg-transparent text-sm text-gray-700 placeholder-gray-500"
            />
          </div>
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}

          {/* Phone Number */}
          <div className="flex items-center gap-3 border-b pb-2">
            <FaPhone className="text-gray-500" />
            <input
              type="text"
              placeholder="Phone Number"
              {...register("phone", { required: "Phone number is required" })}
              className="w-full border-none outline-none bg-transparent text-sm text-gray-700 placeholder-gray-500"
            />
          </div>
          {errors.phone && (
            <p className="text-red-500 text-sm">{errors.phone.message}</p>
          )}

          {/* Rank */}
          <div className="flex items-center gap-3 border-b pb-2">
            <FaIdCard className="text-gray-500" />
            <input
              type="text"
              placeholder="Rank"
              {...register("rank", { required: "Rank is required" })}
              className="w-full border-none outline-none bg-transparent text-sm text-gray-700 placeholder-gray-500"
            />
          </div>
          {errors.rank && (
            <p className="text-red-500 text-sm">{errors.rank.message}</p>
          )}

          {/* Department */}
          <div className="flex items-center gap-3 border-b pb-2">
            <FaBuilding className="text-gray-500" />
            <select
              {...register("department", {
                required: "Department is required",
              })}
              className="w-full border-none outline-none bg-transparent text-sm text-gray-700"
            >
              <option value="">Select Department</option>
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>
          {errors.department && (
            <p className="text-red-500 text-sm">{errors.department.message}</p>
          )}

          {/* Badge Number/Office ID */}
          <div className="flex items-center gap-3 border-b pb-2">
            <FaIdCard className="text-gray-500" />
            <input
              type="text"
              placeholder="Badge Number/Office ID"
              {...register("badgeNumber", {
                required: "Badge Number/Office ID is required",
              })}
              className="w-full border-none outline-none bg-transparent text-sm text-gray-700 placeholder-gray-500"
            />
          </div>
          {errors.badgeNumber && (
            <p className="text-red-500 text-sm">{errors.badgeNumber.message}</p>
          )}

          {/* City */}
          <div className="flex items-center gap-3 border-b pb-2">
            <FaMapMarkerAlt className="text-gray-500" />
            <input
              type="text"
              placeholder="City"
              {...register("city", { required: "City is required" })}
              className="w-full border-none outline-none bg-transparent text-sm text-gray-700 placeholder-gray-500"
            />
          </div>
          {errors.city && (
            <p className="text-red-500 text-sm">{errors.city.message}</p>
          )}

          {/* CNIC */}
          <div className="flex items-center gap-3 border-b pb-2">
            <FaIdCard className="text-gray-500" />
            <input
              type="text"
              placeholder="CNIC (00000-0000000-0)"
              {...register("cnic", {
                required: "CNIC is required",
                pattern: {
                  value: /^\d{5}-\d{7}-\d{1}$/,
                  message: "CNIC must be in format: 00000-0000000-0",
                },
              })}
              className="w-full border-none outline-none bg-transparent text-sm text-gray-700 placeholder-gray-500"
            />
          </div>
          {errors.cnic && (
            <p className="text-red-500 text-sm">{errors.cnic.message}</p>
          )}

          {/* Password */}
          <div className="flex items-center gap-3 border-b pb-2">
            <FaLock className="text-gray-500" />
            <input
              type="password"
              placeholder="Password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              className="w-full border-none outline-none bg-transparent text-sm text-gray-700 placeholder-gray-500"
            />
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}

          {/* Confirm Password */}
          <div className="flex items-center gap-3 border-b pb-2">
            <FaLock className="text-gray-500" />
            <input
              type="password"
              placeholder="Confirm Password"
              {...register("confirmPassword", {
                required: "Confirm password is required",
                validate: (value) =>
                  value === watch("password") || "Passwords do not match",
              })}
              className="w-full border-none outline-none bg-transparent text-sm text-gray-700 placeholder-gray-500"
            />
          </div>
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm">
              {errors.confirmPassword.message}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2 mt-6 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
          >
            {isSubmitting ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        <p className="mt-4 text-sm text-center text-gray-600">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
