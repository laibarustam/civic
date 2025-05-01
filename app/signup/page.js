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
  FaUserShield,
  FaClipboardCheck,
  FaMobileAlt,
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
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-b from-blue-50 to-white">
      <Link
        href="/"
        className="absolute top-8 left-8 flex items-center gap-2 text-gray-800 hover:text-blue-600 transition-colors"
      >
        <FaArrowLeft className="text-xl" />
        <span>Back to Home</span>
      </Link>

      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-4xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left side - Welcome Content */}
          <div className="hidden lg:flex flex-col justify-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              Welcome to Civic Connect
            </h2>
            <p className="text-gray-600 mb-8">
              Join our platform to make a difference in your community.
              Together, we can build a more responsive and efficient civic
              administration.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-gray-600">
                <FaUserShield className="text-blue-600 text-xl" />
                <span>Secure and private platform</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <FaClipboardCheck className="text-blue-600 text-xl" />
                <span>Streamlined civic processes</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <FaMobileAlt className="text-blue-600 text-xl" />
                <span>Mobile-friendly interface</span>
              </div>
            </div>
          </div>

          {/* Right side - Sign Up Form */}
          <div>
            <h1 className="text-2xl font-bold text-center mb-8 text-gray-800 lg:text-left">
              Create Your Account
            </h1>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-700">
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-600 mb-1 block">
                      Full Name
                    </label>
                    <div className="flex items-center gap-3 border rounded-lg p-2 focus-within:border-blue-500 transition">
                      <FaUser className="text-gray-400" />
                      <input
                        type="text"
                        placeholder="Full Name"
                        {...register("name", { required: "Name is required" })}
                        className="w-full border-none outline-none bg-transparent text-sm"
                      />
                    </div>
                    {errors.name && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="text-sm text-gray-600 mb-1 block">
                      Email
                    </label>
                    <div className="flex items-center gap-3 border rounded-lg p-2 focus-within:border-blue-500 transition">
                      <FaEnvelope className="text-gray-400" />
                      <input
                        type="email"
                        placeholder="Email"
                        {...register("email", {
                          required: "Email is required",
                          pattern: {
                            value:
                              /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                            message: "Invalid email address",
                          },
                        })}
                        className="w-full border-none outline-none bg-transparent text-sm"
                      />
                    </div>
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-600 mb-1 block">
                      Phone Number
                    </label>
                    <div className="flex items-center gap-3 border rounded-lg p-2 focus-within:border-blue-500 transition">
                      <FaPhone className="text-gray-400" />
                      <input
                        type="text"
                        placeholder="Phone Number"
                        {...register("phone", {
                          required: "Phone number is required",
                        })}
                        className="w-full border-none outline-none bg-transparent text-sm"
                      />
                    </div>
                    {errors.phone && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="text-sm text-gray-600 mb-1 block">
                      CNIC
                    </label>
                    <div className="flex items-center gap-3 border rounded-lg p-2 focus-within:border-blue-500 transition">
                      <FaIdCard className="text-gray-400" />
                      <input
                        type="text"
                        placeholder="00000-0000000-0"
                        {...register("cnic", {
                          required: "CNIC is required",
                          pattern: {
                            value: /^\d{5}-\d{7}-\d{1}$/,
                            message: "CNIC must be in format: 00000-0000000-0",
                          },
                        })}
                        className="w-full border-none outline-none bg-transparent text-sm"
                      />
                    </div>
                    {errors.cnic && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.cnic.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Professional Information */}
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-700">
                  Professional Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-600 mb-1 block">
                      Rank
                    </label>
                    <div className="flex items-center gap-3 border rounded-lg p-2 focus-within:border-blue-500 transition">
                      <FaIdCard className="text-gray-400" />
                      <input
                        type="text"
                        placeholder="Rank"
                        {...register("rank", { required: "Rank is required" })}
                        className="w-full border-none outline-none bg-transparent text-sm"
                      />
                    </div>
                    {errors.rank && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.rank.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="text-sm text-gray-600 mb-1 block">
                      Department
                    </label>
                    <div className="flex items-center gap-3 border rounded-lg p-2 focus-within:border-blue-500 transition">
                      <FaBuilding className="text-gray-400" />
                      <select
                        {...register("department", {
                          required: "Department is required",
                        })}
                        className="w-full border-none outline-none bg-transparent text-sm"
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
                      <p className="text-red-500 text-xs mt-1">
                        {errors.department.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-600 mb-1 block">
                      Badge Number/Office ID
                    </label>
                    <div className="flex items-center gap-3 border rounded-lg p-2 focus-within:border-blue-500 transition">
                      <FaIdCard className="text-gray-400" />
                      <input
                        type="text"
                        placeholder="Badge Number/Office ID"
                        {...register("badgeNumber", {
                          required: "Badge Number/Office ID is required",
                        })}
                        className="w-full border-none outline-none bg-transparent text-sm"
                      />
                    </div>
                    {errors.badgeNumber && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.badgeNumber.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="text-sm text-gray-600 mb-1 block">
                      City
                    </label>
                    <div className="flex items-center gap-3 border rounded-lg p-2 focus-within:border-blue-500 transition">
                      <FaMapMarkerAlt className="text-gray-400" />
                      <input
                        type="text"
                        placeholder="City"
                        {...register("city", { required: "City is required" })}
                        className="w-full border-none outline-none bg-transparent text-sm"
                      />
                    </div>
                    {errors.city && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.city.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Password Section */}
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-700">Security</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-600 mb-1 block">
                      Password
                    </label>
                    <div className="flex items-center gap-3 border rounded-lg p-2 focus-within:border-blue-500 transition">
                      <FaLock className="text-gray-400" />
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
                        className="w-full border-none outline-none bg-transparent text-sm"
                      />
                    </div>
                    {errors.password && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.password.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="text-sm text-gray-600 mb-1 block">
                      Confirm Password
                    </label>
                    <div className="flex items-center gap-3 border rounded-lg p-2 focus-within:border-blue-500 transition">
                      <FaLock className="text-gray-400" />
                      <input
                        type="password"
                        placeholder="Confirm Password"
                        {...register("confirmPassword", {
                          required: "Confirm password is required",
                          validate: (value) =>
                            value === watch("password") ||
                            "Passwords do not match",
                        })}
                        className="w-full border-none outline-none bg-transparent text-sm"
                      />
                    </div>
                    {errors.confirmPassword && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.confirmPassword.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:bg-blue-400 disabled:cursor-not-allowed mt-8"
              >
                {isSubmitting ? "Creating Account..." : "Create Account"}
              </button>

              <p className="text-center text-sm text-gray-600 mt-6">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-blue-600 hover:underline font-medium"
                >
                  Login here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
