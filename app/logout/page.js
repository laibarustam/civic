'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';

export default function LogoutPage() {
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = () => {
    setIsLoggingOut(true);
    // Add your logout logic here (e.g., clearing token or user data)
    // For example:
    // localStorage.removeItem('authToken');
    // Or use your auth provider's logout method (e.g., Firebase, NextAuth)
    setTimeout(() => {
      // After logging out, redirect to the login page or homepage
      window.location.href = '/login'; // Redirect to the login page
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#f7f7f9] flex flex-col items-center p-8">
      {/* Back Arrow */}
      <div className="w-full max-w-3xl mb-6">
        <Link href="/profile">
          <FaArrowLeft className="text-2xl text-gray-800 cursor-pointer hover:text-indigo-600 transition-all" />
        </Link>
      </div>

      {/* Logout Confirmation Card */}
      <div className="bg-white rounded-3xl shadow-lg p-8 w-full max-w-3xl flex flex-col items-center">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">Are you sure you want to log out?</h1>
        <p className="text-sm text-gray-600 mb-8">You will be logged out and redirected to the login page.</p>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="px-8 py-3 rounded-full bg-red-600 text-white hover:bg-red-500 transition duration-300"
        >
          {isLoggingOut ? 'Logging out...' : 'Log Out'}
        </button>
      </div>
    </div>
  );
}
