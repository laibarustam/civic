'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaTachometerAlt, FaTasks, FaChartLine, FaUsers, FaBell, FaUserAlt, FaCog, FaSignOutAlt } from 'react-icons/fa'; // Ensure icons are imported correctly

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

  // Check if the current page is login, signup, forgetpassword or the app root page
  const isAuthPage = pathname === '/login' || pathname === '/app' || pathname === '/forgetpassword';

  if (isAuthPage) {
    return null; // Do not render the sidebar on login, signup or forgetpassword pages
  }

  return (
    <div className="w-64 bg-gradient-to-br from-sky-600 to-blue-800 text-white flex flex-col justify-between min-h-screen p-4">
      {/* Top Section */}
      <div>
        <div className="flex flex-col items-center mb-8">
          <img
            src="/logo.png" // Path to logo image
            alt="CivicConnect Logo"
            className="w-40 h-auto" // Adjust size here (increase width)
          />
        </div>
        <nav className="flex flex-col gap-3">
          {topLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`p-2 rounded hover:bg-white hover:text-sky-600 transition flex items-center gap-2 ${
                pathname === link.href ? 'bg-white text-sky-600 font-semibold' : ''
              }`}
            >
              {link.icon} {/* Displaying icon */}
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Bottom Section */}
      <div className="pt-8 border-t border-sky-500">
        <nav className="flex flex-col gap-3">
          {bottomLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`p-2 rounded hover:bg-white hover:text-sky-600 transition flex items-center gap-2 ${
                pathname === link.href ? 'bg-white text-sky-600 font-semibold' : ''
              }`}
            >
              {link.icon} {/* Displaying icon */}
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
