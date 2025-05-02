"use client";

import Link from "next/link";
import Image from "next/image";
import {
  FaUserShield,
  FaClipboardCheck,
  FaMobileAlt,
  FaAndroid,
  FaApple,
} from "react-icons/fa";

export default function Welcome() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <div className="container mx-auto px-6 py-16">
        <nav className="flex justify-between items-center mb-16">
          <div className="flex items-center">
            <Image
              src="/logo.png"
              alt="Civic Connect Logo"
              width={180}
              height={48}
              priority
              className="h-12 w-auto"
            />
          </div>
          <div className="flex gap-4">
            <Link
              href="/login"
              className="px-6 py-2 text-blue-600 hover:text-blue-700 font-semibold"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
            >
              Sign Up
            </Link>
          </div>
        </nav>

        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div className="lg:w-1/2 mb-12 lg:mb-0">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Empowering Communities Through Digital Governance
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Join Civic Connect to streamline citizen services, enhance
              community engagement, and build a more responsive administration.
            </p>
            <div className="flex gap-4">
              <Link
                href="/signup"
                className="px-8 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition text-lg font-semibold"
              >
                Get Started
              </Link>
              <Link
                href="/login"
                className="px-8 py-3 border-2 border-blue-600 text-blue-600 rounded-full hover:bg-blue-50 transition text-lg font-semibold"
              >
                Learn More
              </Link>
            </div>
          </div>
          <div className="lg:w-1/2">
            <Image
              src="/globe.svg"
              alt="Digital Governance"
              width={600}
              height={400}
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why Choose Civic Connect?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="p-6 text-center">
              <FaUserShield className="text-5xl text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-4 text-gray-900">
                Secure Platform
              </h3>
              <p className="text-gray-600">
                Advanced security measures to protect sensitive information and
                maintain data privacy.
              </p>
            </div>
            <div className="p-6 text-center">
              <FaClipboardCheck className="text-5xl text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-4 text-gray-800">
                Efficient Management
              </h3>
              <p className="text-gray-600">
                Streamlined processes for quick response and resolution of
                citizen concerns.
              </p>
            </div>
            <div className="p-6 text-center">
              <FaMobileAlt className="text-5xl text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-4 text-gray-900">
                Mobile Friendly
              </h3>
              <p className="text-gray-600">
                Access services and manage tasks on-the-go with our mobile
                application.
              </p>

              <div className="flex items-center justify-center gap-3 mt-2 text-gray-600">
                <span className="flex items-center">
                  <FaApple className="text-xl mr-1" /> iOS
                </span>
                <span className="flex items-center">
                  <FaAndroid className="text-xl mr-1" /> Android
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-50 py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <Image
                src="/logo.png"
                alt="Civic Connect Logo"
                width={140}
                height={36}
                className="h-9 w-auto"
              />
              <p className="text-gray-600 mt-2">
                © 2025 Civic Connect. All rights reserved.
              </p>
            </div>
            <div className="flex gap-8">
              <Link href="#" className="text-gray-600 hover:text-blue-600">
                About
              </Link>
              <Link href="#" className="text-gray-600 hover:text-blue-600">
                Contact
              </Link>
              <Link href="#" className="text-gray-600 hover:text-blue-600">
                Privacy Policy
              </Link>
              <Link href="#" className="text-gray-600 hover:text-blue-600">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
