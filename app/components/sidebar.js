"use client";
import React, { useState, useEffect } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { auth, db } from "@/firebase"; // make sure you import auth and db!
import { doc, getDoc } from "firebase/firestore";
import {
  FaTachometerAlt,
  FaTasks,
  FaChartLine,
  FaUsers,
  FaUserAlt,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

const bottomLinks = [
  { href: "/profile", label: "Profile", icon: <FaUserAlt /> },
  { href: "/settings", label: "Settings", icon: <FaCog /> },
  { href: "/logout", label: "Logout", icon: <FaSignOutAlt /> },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [role, setRole] = useState("");

  useEffect(() => {
    const fetchRole = async () => {
      const user = auth.currentUser;
      if (user) {
        const docRef = doc(db, "user_admin", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setRole(docSnap.data().role);
        }
      }
    };
    fetchRole();
  }, []);

  let topLinks = [
    { href: "/dashboard", label: "Dashboard", icon: <FaTachometerAlt /> },
    { href: "/analytics", label: "Analytics", icon: <FaChartLine /> },
    { href: "/users", label: "Users", icon: <FaUsers /> },
  ];

  if (role === "admin") {
    topLinks.push({ href: "/task", label: "Task", icon: <FaTasks /> });
  }

  if (role === "officer") {
    topLinks.push({
      href: "/OfficerTasksPage",
      label: "Officer Tasks",
      icon: <FaTasks />,
    });
  }

  const isAuthPage =
    pathname === "/login" || pathname === "/app" || pathname === "/forgetpassword";

  if (isAuthPage) return null;

  return (
    <div className="w-64 bg-gradient-to-b from-[#24428a] to-[#7888b0] text-white flex flex-col justify-between min-h-screen p-4 font-sans">
      {/* Top Section */}
      <div>
        <div className="flex flex-col items-center mb-8">
          <img src="/logo.png" alt="CivicConnect Logo" className="w-40 h-auto" />
        </div>
        <nav className="flex flex-col gap-3">
          {topLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`p-2 rounded hover:bg-white hover:text-[#24428a] transition flex items-center gap-2 ${
                pathname === link.href
                  ? "bg-white text-[#24428a] font-semibold"
                  : ""
              }`}
            >
              {link.icon}
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Bottom Section */}
      <div className="pt-8 border-t border-[#a5b5d2]">
        <nav className="flex flex-col gap-3">
          {bottomLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`p-2 rounded hover:bg-white hover:text-[#24428a] transition flex items-center gap-2 ${
                pathname === link.href
                  ? "bg-white text-[#24428a] font-semibold"
                  : ""
              }`}
            >
              {link.icon}
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
