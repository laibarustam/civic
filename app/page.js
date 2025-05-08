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
    <div className="min-h-screen bg-gradient-to-b from-[#F9D5E5] to-[#E0F7FF] text-[#2E3A59] font-sans">
      {/* Hero Section */}
      <div className="container mx-auto px-6 py-20">
        <nav className="flex justify-between items-center mb-20">
          <div className="flex items-center">
            <Image
              src="/logo.png"
              alt="Civic Connect Logo"
              width={160}
              height={40}
              priority
              className="h-10 w-auto"
            />
          </div>
          <div className="flex gap-4">
            <Link
              href="/login"
              className="px-6 py-2 text-pink-600 hover:text-pink-700 font-semibold transition"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="px-6 py-2 bg-pink-500 text-white rounded-2xl shadow hover:bg-pink-600 transition font-semibold"
            >
              Sign Up
            </Link>
          </div>
        </nav>

        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div className="lg:w-1/2 mb-16 lg:mb-0">
            <h1 className="text-5xl font-bold mb-6 leading-tight">
              Empowering Communities <br /> Through Digital Governance
            </h1>
            <p className="text-xl text-[#5E6B85] mb-8">
              Join Civic Connect to streamline citizen services, enhance
              community engagement, and build a more responsive administration.
            </p>
            <div className="flex gap-4">
              <Link
                href="/signup"
                className="px-8 py-3 bg-gradient-to-r from-pink-400 to-sky-400 text-white rounded-2xl shadow-lg hover:scale-105 transition text-lg font-semibold"
              >
                Get Started
              </Link>
              <Link
                href="#about-us"
                className="px-8 py-3 border-2 border-pink-400 text-pink-500 rounded-2xl hover:bg-pink-100 transition text-lg font-semibold"
              >
                Learn More
              </Link>
            </div>
          </div>
          <div className="lg:w-1/2">
            <Image
              src="/background.avif"
              alt="Digital Governance"
              width={600}
              height={400}
              className="w-full h-auto drop-shadow-lg"
            />
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-24 rounded-t-[3rem] shadow-inner">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
            Why Choose Civic Connect?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="p-6 text-center bg-[#F0F9FF] rounded-2xl shadow-md hover:shadow-lg transition">
              <FaUserShield className="text-5xl text-pink-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-4 text-gray-900">
                Secure Platform
              </h3>
              <p className="text-gray-600">
                Advanced security measures to protect sensitive information and
                maintain data privacy.
              </p>
            </div>
            <div className="p-6 text-center bg-[#F0F9FF] rounded-2xl shadow-md hover:shadow-lg transition">
              <FaClipboardCheck className="text-5xl text-sky-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-4 text-gray-900">
                Efficient Management
              </h3>
              <p className="text-gray-600">
                Streamlined processes for quick response and resolution of
                citizen concerns.
              </p>
            </div>
            <div className="p-6 text-center bg-[#F0F9FF] rounded-2xl shadow-md hover:shadow-lg transition">
              <FaMobileAlt className="text-5xl text-pink-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-4 text-gray-900">
                Mobile Friendly
              </h3>
              <p className="text-gray-600">
                Access services and manage tasks on-the-go with our mobile
                application.
              </p>
              <div className="flex items-center justify-center gap-4 mt-4 text-gray-700">
                <span className="flex items-center">
                  <FaApple className="text-xl mr-2" /> iOS
                </span>
                <span className="flex items-center">
                  <FaAndroid className="text-xl mr-2" /> Android
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* About Us Section */}
      <div id="about-us" className="bg-gradient-to-r from-[#F9D5E5] to-[#E0F7FF] py-24">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">About Us</h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-8">
            At Civic Connect, we believe in the power of digital transformation to
            make civic life better. Our mission is to bridge the gap between citizens
            and governance through technology — making services faster, more transparent,
            and more accessible to everyone.
          </p>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Founded by a team of tech enthusiasts and civic planners, we work closely with
            communities to understand real needs and deliver meaningful solutions. Whether
            it's reporting issues, accessing resources, or tracking responses, Civic Connect
            puts the power in the hands of the people.
          </p>
        </div>
      </div>

      <div className="bg-white py-16">
  <div className="container mx-auto text-center px-6">
    <h2 className="text-3xl font-bold text-gray-900 mb-6">What Our Users Say</h2>
    <div className="flex justify-center gap-8">
    <div className="max-w-xs p-6 bg-[#F0F9FF] rounded-2xl shadow-md">
        <p className="text-gray-600 mb-4">
          "Thanks to Civic Connect, our local governance is more transparent, and we can quickly access services."
        </p>
        <span className="font-semibold text-gray-800">John D., Local Government Official</span>
      </div>
      <div className="max-w-xs p-6 bg-[#F0F9FF] rounded-2xl shadow-md">
        <p className="text-gray-600 mb-4">
          "Civic Connect has made reporting and resolving issues so much easier in our community. It's a game-changer!"
        </p>
        <span className="font-semibold text-gray-800">Sarah L., Community Member</span>
      </div>
      <div className="max-w-xs p-6 bg-[#F0F9FF] rounded-2xl shadow-md">
        <p className="text-gray-600 mb-4">
          "Thanks to Civic Connect, our local governance is more transparent, and we can quickly access services."
        </p>
        <span className="font-semibold text-gray-800">John D., Local Government Official</span>
      </div>
    </div>
  </div>
</div>

<div className="bg-gradient-to-r from-[#F9D5E5] to-[#E0F7FF] py-16">
  <div className="container mx-auto text-center px-6">
    <h2 className="text-3xl font-bold text-gray-900 mb-4">
      Ready to Make a Difference?
    </h2>
    <p className="text-lg text-gray-700 mb-8">
      Join Civic Connect today and become a part of a community that’s transforming governance.
    </p>
    <Link
      href="/signup"
      className="px-8 py-3 bg-pink-500 text-white rounded-2xl shadow-lg hover:bg-pink-600 transition text-lg font-semibold"
    >
      Get Started
    </Link>
  </div>
</div>

<div className="bg-white py-16 px-6 rounded-2xl shadow-lg">
  <div className="container mx-auto text-center">
    <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Impact</h2>
    <div className="flex justify-around gap-10">
      <div className="p-6 bg-gradient-to-r from-[#F9D5E5] to-[#E0F7FF] shadow-md rounded-2xl text-gray-900">
        <h3 className="text-2xl font-semibold mb-4">500+ Reports Resolved</h3>
        <p className="text-gray-600">Thousands of issues resolved across communities.</p>
      </div>
      <div className="p-6 bg-gradient-to-r from-[#F9D5E5] to-[#E0F7FF] shadow-md rounded-2xl text-gray-900">
        <h3 className="text-2xl font-semibold mb-4">1,000+ Active Users</h3>
        <p className="text-gray-600">A growing network of users making a difference.</p>
      </div>
      <div className="p-6 bg-gradient-to-r from-[#F9D5E5] to-[#E0F7FF] shadow-md rounded-2xl text-gray-900">
        <h3 className="text-2xl font-semibold mb-4">98% Satisfaction Rate</h3>
        <p className="text-gray-600">Our users love the simplicity and efficiency of Civic Connect.</p>
      </div>
    </div>
  </div>
</div>



 {/* footer */}
      <footer className="bg-gradient-to-r from-[#F9D5E5] to-[#E0F7FF] py-6 mt-8">
  <div className="container mx-auto px-6 flex justify-between items-center">
    {/* Logo */}
    <div className="flex-1">
      <Image
        src="/logo.png"
        alt="Civic Connect Logo"
        width={140}
        height={36}
        className="h-9 w-auto"
      />
    </div>

    {/* Copyright Text Centered */}
    <div className="text-center flex-1">
      <p className="text-gray-600 text-sm">
        © 2025 Civic Connect. All rights reserved.
      </p>
    </div>

    {/* Footer Navigation */}
    <div className="flex gap-6 text-sm text-gray-600 flex-1 justify-end">
      <Link href="#about-us" className="hover:text-pink-500">
        About Us
      </Link>
      <Link href="#" className="hover:text-pink-500">
        Privacy Policy
      </Link>
      <Link href="#" className="hover:text-pink-500">
        Terms of Service
      </Link>
    </div>
  </div>
</footer>

    </div>
  );
}
