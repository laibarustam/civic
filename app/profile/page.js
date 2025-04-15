'use client';

import { FaArrowLeft, FaEnvelope, FaUser, FaMapMarkerAlt, FaPhone, FaIdCard } from 'react-icons/fa';
import { RiLockPasswordLine } from 'react-icons/ri';
import { MdDelete } from 'react-icons/md';
import Image from 'next/image';
import Link from 'next/link';

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-[#f7f7f9] flex flex-col items-center p-8">
      {/* Back Arrow */}
      <div className="w-full max-w-3xl">
        <Link href="/">
          <FaArrowLeft className="text-2xl text-gray-800 mb-4 cursor-pointer hover:text-blue-500 transition-all" />
        </Link>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-3xl shadow-lg p-8 w-full max-w-3xl flex flex-col items-center">
        {/* Avatar + Name */}
        <Image
          src="/image1.jpg" // Use the image from the public folder
          width={100}
          height={100}
          alt="Profile Avatar"
          className="rounded-full mb-4 border-4 border-indigo-500" // Ensures the image is round
        />
        <h1 className="text-3xl font-semibold text-center text-gray-900">Laiba Rustam</h1>
        <p className="text-sm text-gray-500 mb-6 text-center">laibarustam858@gmail.com</p>

       {/* Action Buttons */}
       <div className="flex gap-4 mb-6">
          {/* Edit Profile Button - Link to Settings Page */}
          <Link href="/settings">
            <button className="px-6 py-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-500 transition duration-300">
              Edit Profile
            </button>
          </Link>

          {/* Logout Button - Link to Logout Page */}
          <Link href="/logout">
            <button className="px-6 py-3 bg-rose-500 text-white rounded-full hover:bg-rose-600 transition duration-300">
              Logout
            </button>
          </Link>
        </div>

        {/* Information Box */}
        <div className="bg-white w-full max-w-md p-6 rounded-2xl mb-6 shadow-lg space-y-4">
          <p className="text-sm font-semibold text-gray-700 mb-2">Information</p>
          <ul className="text-gray-700 space-y-4 text-sm">
            <li className="flex items-center gap-3"><FaEnvelope className="text-indigo-500" /> laibarustam858@gmail.com</li>
            <li className="flex items-center gap-3"><FaUser className="text-indigo-500" /> Laiba Rustam</li>
            <li className="flex items-center gap-3"><FaMapMarkerAlt className="text-indigo-500" />Taxila</li>
            <li className="flex items-center gap-3"><FaPhone className="text-indigo-500" /> 03113499931</li>
            <li className="flex items-center gap-3"><FaIdCard className="text-indigo-500" /> 12345-1234567-1</li>
          </ul>
        </div>

        {/* Actions Box */}
        <div className="bg-white w-full max-w-md p-6 rounded-2xl shadow-lg">
          <p className="text-sm font-semibold text-gray-700 mb-4">Actions</p>
          <ul className="space-y-4">
            <li className="flex justify-between items-center cursor-pointer hover:text-blue-700 transition-all">
              <span className="flex items-center gap-2"><RiLockPasswordLine className="text-blue-600" /> Change Password</span>
              <span className="text-xl">&rarr;</span>
            </li>
            <li className="flex justify-between items-center text-rose-500 cursor-pointer hover:text-red-600 transition-all">
              <span className="flex items-center gap-2"><MdDelete className="text-rose-600" /> Delete Account</span>
              <span className="text-xl">&rarr;</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
