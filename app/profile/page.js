"use client";

import {
  FaArrowLeft,
  FaEnvelope,
  FaUser,
  FaMapMarkerAlt,
  FaPhone,
  FaIdCard,
  FaBuilding,
} from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { auth, db } from "/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { sendPasswordResetEmail } from "firebase/auth";
import { doc, getDoc, deleteDoc } from "firebase/firestore";


export default function ProfilePage() {
  const [userData, setUserData] = useState({
    full_name: "",
    email: "",
    phone: "",
    city: "",
    cnic: "",
    rank: "",
    department: "",
    badge_number: "",
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log("User is logged in:", user.uid);  // Debug log
        try {
          // Fetching user data from Firestore
          const userDoc = await getDoc(doc(db, "user_admin", user.uid));
          if (userDoc.exists()) {
            console.log("User data fetched:", userDoc.data());  // Debug log
            setUserData(userDoc.data());
          } else {
            console.log("No user document found");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);  // Error log
        }
      } else {
        console.log("User not logged in");
      }
    });

    return () => unsubscribe();
  }, []);

  const handleChangePassword = async () => {
  if (auth.currentUser?.email) {
    try {
      await sendPasswordResetEmail(auth, auth.currentUser.email);
      alert("Password reset email sent!");
    } catch (error) {
      console.error("Error sending password reset email:", error);
      alert("Failed to send reset email.");
    }
  }
};

const handleDeleteAccount = async () => {
  const user = auth.currentUser;

  if (!user) {
    alert("User not authenticated.");
    return;
  }

  const confirmed = confirm("Are you sure you want to delete your profile data? This cannot be undone.");
  if (!confirmed) return;

  try {
    await deleteDoc(doc(db, "user_admin", user.uid));
    alert("Account data deleted from Firestore.");
    window.location.href = "/"; // or redirect to login
  } catch (error) {
    console.error("Error deleting Firestore document:", error);
    alert("Failed to delete your account data.");
  }
};


  return (
    <div className="min-h-screen bg-[#f7f7f9] flex flex-col items-center p-8">
      {/* Back Arrow */}
      <div className="w-full max-w-3xl">
        <Link href="/dashboard">
          <FaArrowLeft className="text-2xl text-gray-800 mb-4 cursor-pointer hover:text-blue-500 transition-all" />
        </Link>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-3xl shadow-lg p-8 w-full max-w-3xl flex flex-col items-center">
        {/* Avatar + Name */}
        <Image
          src="/image1.jpg"
          width={100}
          height={100}
          alt="Profile Avatar"
          className="rounded-full mb-4 border-4 border-indigo-500"
        />
        <h1 className="text-3xl font-semibold text-center text-gray-900">
          {userData.full_name}
        </h1>
        <p className="text-sm text-gray-500 mb-6 text-center">
          {userData.email}
        </p>

        {/* Action Buttons */}
        <div className="flex gap-4 mb-6">
          <Link href="/settings">
            <button className="px-6 py-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-500 transition duration-300">
              Edit Profile
            </button>
          </Link>

          <Link href="/logout">
            <button className="px-6 py-3 bg-rose-500 text-white rounded-full hover:bg-rose-600 transition duration-300">
              Logout
            </button>
          </Link>
        </div>

        {/* Information Box */}
        <div className="bg-white w-full max-w-md p-6 rounded-2xl mb-6 shadow-lg space-y-4">
          <p className="text-sm font-semibold text-gray-700 mb-2">
            Information
          </p>
          <ul className="text-gray-700 space-y-4 text-sm">
            <li className="flex items-center gap-3">
              <FaEnvelope className="text-indigo-500" /> {userData.email}
            </li>
            <li className="flex items-center gap-3">
              <FaUser className="text-indigo-500" /> {userData.full_name}
            </li>
            <li className="flex items-center gap-3">
              <FaMapMarkerAlt className="text-indigo-500" /> {userData.city}
            </li>
            <li className="flex items-center gap-3">
              <FaPhone className="text-indigo-500" /> {userData.phone}
            </li>
            <li className="flex items-center gap-3">
              <FaIdCard className="text-indigo-500" /> {userData.cnic}
            </li>
            <li className="flex items-center gap-3">
              <FaUser className="text-indigo-500" /> {userData.rank}
            </li>
            <li className="flex items-center gap-3">
              <FaBuilding className="text-indigo-500" /> {userData.department}
            </li>
            <li className="flex items-center gap-3">
              <FaIdCard className="text-indigo-500" /> {userData.badge_number}
            </li>
          </ul>
        </div>

        {/* Actions Box */}
        <div className="bg-white w-full max-w-md p-6 rounded-2xl shadow-lg">
          <p className="text-sm font-semibold text-gray-700 mb-4">Actions</p>
          <ul className="space-y-4">
            <li
  onClick={handleChangePassword}
  className="flex justify-between items-center cursor-pointer hover:text-blue-700 transition-all"
>
  <span className="flex items-center gap-2">
    <RiLockPasswordLine className="text-blue-600" /> Change Password
  </span>
  <span className="text-xl">&rarr;</span>
</li>

<li
  onClick={handleDeleteAccount}
  className="flex justify-between items-center text-rose-500 cursor-pointer hover:text-red-600 transition-all"
>
  <span className="flex items-center gap-2">
    <MdDelete className="text-rose-600" /> Delete Account
  </span>
  <span className="text-xl">&rarr;</span>
</li>


          </ul>
        </div>
      </div>
    </div>
  );
}
