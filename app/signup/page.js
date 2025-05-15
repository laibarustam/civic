"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";

import {
  FaEnvelope,
  FaLock,
  FaArrowLeft,
  FaMapMarkerAlt,
} from "react-icons/fa";

import { auth, db } from "/firebase"; // your firebase config export
import {
  createUserWithEmailAndPassword,
} from "firebase/auth";
import {
  doc,
  setDoc,
  collection,
  query,
  where,
  getDocs,
  getFirestore,
} from "firebase/firestore";
import { sendEmailVerification } from "firebase/auth";


export default function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    clearErrors,
    setError,
  } = useForm({
    mode: "onBlur",
  });

  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Role and department dynamic selects
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");

  // Watch role and password for validation dependencies
  const formRole = watch("role");
  const password = watch("password");

  // Sync selected role & reset department when role changes
  useEffect(() => {
    setSelectedRole(formRole || "");
    setSelectedDepartment("");
    setValue("department", "");
    clearErrors("department");
  }, [formRole, setValue, clearErrors]);

  const allDepartments = [
   "Municipal Corporation",
   "Police Department",
   "Fire & Emergency Services",
   "Electricity & Gas Departments",
   "Public Works Department (PWD)",
  ];
const [passwordStrength, setPasswordStrength] = useState("");

const getPasswordStrength = (password) => {
  if (!password) return "";

  const strongRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
  const mediumRegex = /^(?=.*[A-Z])(?=.*\d).{6,}$/;

  if (strongRegex.test(password)) return "strong";
  if (mediumRegex.test(password)) return "medium";
  return "weak";
};
const passwordValue = watch("password");

useEffect(() => {
  setPasswordStrength(getPasswordStrength(passwordValue));
}, [passwordValue]);

  const departments =
    selectedRole === "admin"
      ? ["Head of Department"]
      : selectedRole === "officer"
      ? allDepartments
      : [];

  // CNIC formatting helper
  const formatCNIC = (value) => {
    const digits = value.replace(/\D/g, "");
    if (digits.length <= 5) return digits;
    if (digits.length <= 12) return digits.slice(0, 5) + "-" + digits.slice(5);
    return (
      digits.slice(0, 5) +
      "-" +
      digits.slice(5, 12) +
      "-" +
      digits.slice(12, 13)
    );
  };

  // CNIC uniqueness check in Firestore
  async function checkUniqueCNIC(value) {
    const cnicQuery = query(collection(db, "user_admin"), where("cnic", "==", value));
    const snapshot = await getDocs(cnicQuery);
    return snapshot.empty; // true if unique
  }

  async function onSubmit(data) {
    setIsSubmitting(true);

    try {
      // Normalize CNIC formatting
      const normalizedCNIC = formatCNIC(data.cnic);

      // Check CNIC uniqueness again before submission
      const isUnique = await checkUniqueCNIC(normalizedCNIC);
      if (!isUnique) {
        setError("cnic", { message: "CNIC already exists" });
        setIsSubmitting(false);
        return;
      }

      // Create Firebase Auth user
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email.trim(),
        data.password
      );

      const user = userCredential.user;
       await sendEmailVerification(user);

      // Save user details in Firestore
      await setDoc(doc(db, "user_admin", user.uid), {
        full_name: data.full_name.trim(),
        email: data.email.trim(),
        phone: "+92" + data.phone.trim(),
        city: data.city.trim(),
        cnic: normalizedCNIC,
        rank: data.rank.trim(),
        department: data.department,
        badge_number: data.badgeNumber.trim(),
        role: data.role,
        created_at: new Date().toISOString(),
      });
      alert("Registration successful! Please check your email to verify your account.");

      // Redirect after signup based on role
      if (data.role === "officer") {
        router.push("/OfficerTasksPage");
      } else {
        router.push("/login");
      }
    } catch (error) {
      console.error("Registration error:", error);
      if (error.code === "auth/email-already-in-use") {
        setError("email", { message: "This email is already registered" });
      } else {
        alert("Registration failed. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-[#24428a] to-[#7888b0]">
      <Link
        href="/"
        className="absolute top-8 left-8 flex items-center gap-2 text-gray-800 hover:text-blue-600 transition-colors"
      >
        <FaArrowLeft className="text-xl" />
        <span>Back to Home</span>
      </Link>

      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-4xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="hidden lg:flex flex-col justify-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              Welcome to Civic Connect
            </h2>
            <p className="text-gray-600 mb-8">
              Join our platform to make a difference in your community.
              Together, we can build a more responsive and efficient civic
              administration.
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
            noValidate
          >
            {/* Full Name */}
             <div className="space-y-1">
              <label className="text-sm text-gray-600 block">Full Name</label>
            <input
              type="text"
              {...register("full_name", {
                required: "Full Name is required",
                minLength: { value: 3, message: "Minimum 3 characters" },
                maxLength: { value: 50, message: "Maximum 50 characters" },
                 pattern: {
      value: /^[A-Za-z ]+$/,
      message: "Invalid name",
    },
  })}
  className="w-full border rounded p-2 outline-none text-black"
  placeholder="Enter your full name"
/>

{errors.full_name && (
  <p className="text-red-500 text-xs mt-1">{errors.full_name.message}</p>
)}
</div>
            {/* Email */}
            <div className="space-y-1">
              <label className="text-sm text-gray-600 block">Email</label>
              <div className="flex items-center gap-2 border rounded-lg p-2">
                <FaEnvelope className="text-gray-400" />
                <input
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value:
                        /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                      message: "Invalid email address",
                    },
                  })}
                  className="flex-grow outline-none text-black"
                  placeholder="example@mail.com"
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-1">
              <label className="text-sm text-gray-600 block">Enter Password</label>
         <input
  type="password"
  {...register("password", {
    required: "Password is required",
    minLength: {
      value: 8,
      message: "Password must be at least 8 characters",
    },
    pattern: {
      value: /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/,
      message: "Include uppercase, number, and special character",
    },
  })}
  className="w-full border rounded p-2 outline-none text-black"
  placeholder="Enter your password"
/>

{errors.password && (
  <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
)}

{passwordStrength && !errors.password && (
  <p
    className={`text-xs mt-1 ${
      passwordStrength === "strong"
        ? "text-green-600"
        : passwordStrength === "medium"
        ? "text-yellow-600"
        : "text-red-600"
    }`}
  >
    {passwordStrength === "strong"
      ? "Strong Password"
      : passwordStrength === "medium"
      ? "Medium Password"
      : "Weak Password"}
  </p>
)}
</div>

            {/* Confirm Password */}
            <div className="space-y-1">
              <label className="text-sm text-gray-600 block">Confirm</label>
            <input
  type="password"
  {...register("confirmPassword", {
    required: "Please confirm your password",
    validate: (value) =>
      value === watch("password") || "Passwords do not match",
  })}
  className="w-full border rounded p-2 outline-none text-black"
  placeholder="Confirm your password"
/>
{errors.confirmPassword && (
  <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>
)}

</div>
            {/* Phone */}
            <div className="space-y-1">
              <label className="text-sm text-gray-600 block">Phone</label>
              <div className="flex items-center gap-2 border rounded-lg p-2">
<span className="text-gray-600">+92</span>
<input
type="text"
{...register("phone", {
required: "Phone is required",
pattern: {
value: /^[3-9]\d{9}$/,
message:
"Phone must be 10 digits without leading zero, e.g. 3001234567",
},
})}
className="flex-grow outline-none text-black"
placeholder="3001234567"
/>
</div>
{errors.phone && (
<p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
)}
</div>
        {/* City */}
        <div className="space-y-1">
          <label className="text-sm text-gray-600 block">City</label>
          <div className="flex items-center gap-2 border rounded-lg p-2">
            <FaMapMarkerAlt className="text-gray-400" />
            <input
              type="text"
              {...register("city", {
                required: "City is required",
                minLength: { value: 2, message: "Minimum 2 characters" },
              })}
              className="flex-grow outline-none text-black"
              placeholder="Your city"
            />
          </div>
          {errors.city && (
            <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>
          )}
        </div>

        {/* CNIC */}
        <div className="space-y-1">
          <label className="text-sm text-gray-600 block">CNIC</label>
          <input
            type="text"
            {...register("cnic", {
              required: "CNIC is required",
              minLength: { value: 15, message: "Complete CNIC required" },
              maxLength: { value: 15, message: "Complete CNIC required" },
              pattern: {
                value: /^\d{5}-\d{7}-\d{1}$/,
                message: "Format: 12345-1234567-1",
              },
              validate: {
                uniqueCNIC: async (value) => {
                  // async uniqueness check
                  const unique = await checkUniqueCNIC(value);
                  return unique || "CNIC already exists";
                },
              },
            })}
            onChange={(e) => {
              const formatted = formatCNIC(e.target.value);
              setValue("cnic", formatted);
            }}
            className="w-full border rounded p-2 outline-none text-black"
            placeholder="12345-1234567-1"
            maxLength={15}
          />
          {errors.cnic && (
            <p className="text-red-500 text-xs mt-1">{errors.cnic.message}</p>
          )}
        </div>

        {/* Rank */}
        <div className="space-y-1">
              <label className="text-sm text-gray-600 block">Rank</label>
        <input
          type="text"
          {...register("rank", {
            required: "Rank is required",
            pattern: { value: /^\d+$/, message: "Rank must be digits only" },
          })}
          className="w-full border rounded p-2 outline-none text-black"
          placeholder="123 (digits only)"
        />
        {errors.rank && (
          <p className="text-red-500 text-xs mt-1">{errors.rank.message}</p>
        )}
</div>
        {/* Badge Number */}
        <div className="space-y-1">
              <label className="text-sm text-gray-600 block">Badge Number</label>
        <input
          type="text"
          {...register("badgeNumber", {
            required: "Badge Number is required",
            pattern: {
              value: /^\d+$/,
              message: "Badge Number must be digits only",
            },
          })}
          className="w-full border rounded p-2 outline-none text-black"
          placeholder="1234 (digits only)"
        />
        {errors.badgeNumber && (
          <p className="text-red-500 text-xs mt-1">{errors.badgeNumber.message}</p>
        )}
</div>
        {/* Role */}
        <select
          {...register("role", { required: "Role is required" })}
          className="w-full border rounded p-2 text-black"
          onChange={(e) => setSelectedRole(e.target.value)}
          value={selectedRole}
        >
          <option value="">Select Role</option>
          <option value="admin">Admin</option>
          <option value="officer">Officer</option>
        </select>
        {errors.role && (
          <p className="text-red-500 text-xs mt-1">{errors.role.message}</p>
        )}

        {/* Department */}
        <select
          {...register("department", {
            required: "Department is required",
          })}
          className="w-full border rounded p-2 text-black"
          disabled={!selectedRole}
          onChange={(e) => setSelectedDepartment(e.target.value)}
          value={selectedDepartment}
        >
          <option value="">Select Department</option>
          {departments.map((dep) => (
            <option key={dep} value={dep}>
              {dep}
            </option>
          ))}
        </select>
        {errors.department && (
          <p className="text-red-500 text-xs mt-1">{errors.department.message}</p>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded p-3 transition"
        >
          {isSubmitting ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  </div>
</div>
  );
}
