'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  FaTachometerAlt, FaTasks, FaChartLine, FaUsers, FaBell,
  FaUserAlt, FaCog, FaSignOutAlt,
} from 'react-icons/fa';

const topLinks = [
  { href: '/dashboard', label: 'Dashboard', icon: <FaTachometerAlt /> },
  { href: '/task', label: 'Task', icon: <FaTasks /> },
  { href: '/analytics', label: 'Analytics', icon: <FaChartLine /> },
  { href: '/users', label: 'Users', icon: <FaUsers /> },
  { href: '/notifications', label: 'Notifications', icon: <FaBell /> },
];

const bottomLinks = [
  { href: '/profile', label: 'Profile', icon: <FaUserAlt /> },
  { href: '/settings', label: 'Settings', icon: <FaCog /> },
  { href: '/logout', label: 'Logout', icon: <FaSignOutAlt /> },
];

export default function Sidebar() {
  const pathname = usePathname();
  const isAuthPage = pathname === '/login' || pathname === '/app' || pathname === '/forgetpassword';

  if (isAuthPage) return null;

  return (
    <div className="w-64 bg-gradient-to-b from-[#24428a] to-[#7888b0] text-white flex flex-col justify-between min-h-screen p-4 font-sans">
      {/* Top Section */}
      <div>
        <div className="flex flex-col items-center mb-8">
          <img
            src="/logo.png"
            alt="CivicConnect Logo"
            className="w-40 h-auto"
          />
        </div>
        <nav className="flex flex-col gap-3">
          {topLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`p-2 rounded hover:bg-white hover:text-[#24428a] transition flex items-center gap-2 ${
                pathname === link.href ? 'bg-white text-[#24428a] font-semibold' : ''
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
                pathname === link.href ? 'bg-white text-[#24428a] font-semibold' : ''
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
