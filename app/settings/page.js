"use client";

import { useEffect, useState } from "react";
import { auth, db, storage } from "/firebase";
import { onAuthStateChanged } from "firebase/auth";
import {
  doc,
  getDoc,
  updateDoc
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL
} from "firebase/storage";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FaArrowLeft } from "react-icons/fa";
import Link from "next/link";

export default function EditProfilePage() {
  const [userData, setUserData] = useState({
    full_name: "",
    email: "",
    phone: "",
    city: "",
    cnic: "",
    rank: "",
    department: "",
    badge_number: "",
    profile_image: "", // 🔸 New field for image URL
  });
  const [imageFile, setImageFile] = useState(null);
  const [uid, setUid] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUid(user.uid);
        const userRef = doc(db, "user_admin", user.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setUserData(userSnap.data());
        }
        setLoading(false);
      } else {
        router.push("/login");
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let imageUrl = userData.profile_image;

      // 🔹 Upload image if a new file is selected
      if (imageFile) {
        const storageRef = ref(storage, `profile_images/${uid}`);
        await uploadBytes(storageRef, imageFile);
        imageUrl = await getDownloadURL(storageRef);
      }

      const updatedData = { ...userData, profile_image: imageUrl };

      await updateDoc(doc(db, "user_admin", uid), updatedData);

      alert("Profile updated successfully!");
      router.push("/profile");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile.");
    }
  };

  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-xl">
        <div className="mb-4">
          <Link href="/profile">
            <FaArrowLeft className="text-2xl text-gray-600 cursor-pointer hover:text-indigo-500" />
          </Link>
        </div>

        <h2 className="text-2xl font-bold text-center mb-6">Edit Profile</h2>

        {/* 🔸 Image Preview */}
        <div className="flex justify-center mb-4">
          <Image
            src={userData.profile_image || "/default-avatar.png"}
            alt="Profile"
            width={100}
            height={100}
            className="rounded-full border-2 border-indigo-500"
          />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* 🔹 File input for profile image */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Change Profile Image
            </label>
            <input type="file" onChange={handleImageChange} />
          </div>

          {/* Other fields */}
          {[
            { name: "full_name", label: "Full Name" },
            { name: "email", label: "Email", disabled: true },
            { name: "phone", label: "Phone" },
            { name: "city", label: "City" },
            { name: "cnic", label: "CNIC" },
            { name: "rank", label: "Rank" },
            { name: "department", label: "Department" },
            { name: "badge_number", label: "Badge Number" },
          ].map(({ name, label, disabled }) => (
            <div key={name}>
              <label className="block text-sm font-medium text-gray-700">
                {label}
              </label>
              <input
                type="text"
                name={name}
                value={userData[name] || ""}
                onChange={handleChange}
                disabled={disabled}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                required={!disabled}
              />
            </div>
          ))}

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}
