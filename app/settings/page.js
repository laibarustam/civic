'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaArrowLeft, FaUser, FaMapMarkerAlt, FaPhone, FaIdCard, FaEnvelope } from 'react-icons/fa';

export default function SettingsPage() {
  const [formData, setFormData] = useState({
    name: 'Laiba Rustam',
    location: 'Taxila',
    phone: '03113499931',
    cnic: '12345-1234567-1', // CNIC field
    email: 'laibarustam858@gmail.com', // Email field
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = () => {
    console.log('Updated data:', formData);
    // Add your update logic here (e.g., API call)
  };

  const handleImageChange = () => {
    // Logic to change the profile image (e.g., opening file input or modal)
    console.log('Change profile image clicked');
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
        {/* Avatar */}
        <Image
          src="/image1.jpg" // Use image1.jpg from the public directory
          width={100}
          height={100}
          alt="Avatar"
          className="rounded-full mb-8 border-4 border-indigo-500"
        />

        {/* Change Profile Image Button */}
        <button
          onClick={handleImageChange}
          className="text-sm text-indigo-600 mt-2 hover:text-indigo-800 transition duration-300"
        >
          Change Profile Image
        </button>

        {/* Space after Change Profile Image */}
        <div className="mb-6" /> {/* Added space below the "Change Profile Image" text */}

        {/* Form Section */}
        <div className="bg-white w-full max-w-md p-6 rounded-2xl mb-6 shadow-lg space-y-6">
          <p className="text-sm font-semibold text-gray-600 mb-4">Update Your Information</p>

          <div className="space-y-4">
            {/* Name Input */}
            <div className="flex items-center gap-3 border-b pb-4 border-gray-200">
              <FaUser className="text-gray-500" />
              <input
                type="text"
                name="name"
                value={formData.name}
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
          className="px-8 py-3 rounded-full bg-indigo-600 text-white hover:bg-indigo-500 transition duration-300"
        >
          Update
        </button>
      </div>
    </div>
  );
}
