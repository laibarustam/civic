"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FaArrowLeft,
  FaUser,
  FaMapMarkerAlt,
  FaPhone,
  FaIdCard,
  FaEnvelope,
} from "react-icons/fa";
import { auth, db } from "/firebase";
import { doc, updateDoc } from "firebase/firestore";

export default function SettingsPage() {
  const [formData, setFormData] = useState({
    name: "Laiba Rustam",
    location: "Taxila",
    phone: "03113499931",
    cnic: "12345-1234567-1",
    email: "laibarustam858@gmail.com",
  });

  const [isUpdating, setIsUpdating] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async () => {
    setIsUpdating(true);
    try {
      const user = auth.currentUser;
      if (!user) throw new Error("No authenticated user");

      const userRef = doc(db, "user_admin", user.uid);
      const updateData = {
        ...formData,
      };

      await updateDoc(userRef, updateData);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Error updating profile. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f7f9] flex flex-col items-center p-8">
      {/* Back Arrow */}
      <div className="w-full max-w-3xl">
        <Link href="/profile">
          <FaArrowLeft className="text-2xl text-gray-800 mb-4 cursor-pointer hover:text-indigo-600 transition-all" />
        </Link>
      </div>

      {/* Settings Card */}
      <div className="bg-white rounded-3xl shadow-lg p-8 w-full max-w-3xl flex flex-col items-center">
        {/* Form Section */}
        <div className="bg-white w-full max-w-md p-6 rounded-2xl mb-6 shadow-lg space-y-6">
          <p className="text-sm font-semibold text-gray-600 mb-4">
            Update Your Information
          </p>

          <div className="space-y-4">
            {/* Name Input */}
            <div className="flex items-center gap-3 border-b pb-4 border-gray-200">
              <FaUser className="text-gray-500" />
              <input
                type="text"
                name="name"
                value={formData.full_name}
                onChange={handleChange}
                className="w-full border-none outline-none bg-transparent text-sm text-gray-600 py-2 focus:ring-0"
                placeholder="Enter your name"
              />
            </div>

            {/* Email Input */}
            <div className="flex items-center gap-3 border-b pb-4 border-gray-200">
              <FaEnvelope className="text-gray-500" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border-none outline-none bg-transparent text-sm text-gray-600 py-2 focus:ring-0"
                placeholder="Enter your email"
              />
            </div>

            {/* Location Input */}
            <div className="flex items-center gap-3 border-b pb-4 border-gray-200">
              <FaMapMarkerAlt className="text-gray-500" />
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full border-none outline-none bg-transparent text-sm text-gray-600 py-2 focus:ring-0"
                placeholder="Enter your location"
              />
            </div>

            {/* Phone Input */}
            <div className="flex items-center gap-3 border-b pb-4 border-gray-200">
              <FaPhone className="text-gray-500" />
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border-none outline-none bg-transparent text-sm text-gray-600 py-2 focus:ring-0"
                placeholder="Enter your phone number"
              />
            </div>

            {/* CNIC Input */}
            <div className="flex items-center gap-3 border-b pb-4 border-gray-200">
              <FaIdCard className="text-gray-500" />
              <input
                type="text"
                name="cnic"
                value={formData.cnic}
                onChange={handleChange}
                className="w-full border-none outline-none bg-transparent text-sm text-gray-600 py-2 focus:ring-0"
                placeholder="Enter your CNIC"
              />
            </div>
          </div>
        </div>

        {/* Update Button */}
        <button
          onClick={handleUpdate}
          disabled={isUpdating}
          className="px-8 py-3 rounded-full bg-indigo-600 text-white hover:bg-indigo-500 transition duration-300 disabled:bg-indigo-400"
        >
          {isUpdating ? "Updating..." : "Update"}
        </button>
      </div>
    </div>
  );
}
