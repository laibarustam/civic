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
    <div className="min-h-screen bg-gradient-to-b from-[#24428a] to-[#7888b0] text-white font-sans">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-10">
        <nav className="flex justify-between items-center mb-20">
          <Image
            src="/logo.png"
            alt="Civic Connect Logo"
            width={160}
            height={40}
            priority
            className="h-10 w-auto"
          />
          <div className="flex gap-4">
            <Link
              href="/login"
              className="px-6 py-2 text-white hover:text-gray-200 font-semibold transition"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="px-6 py-2 bg-white text-[#24428a] rounded-full shadow hover:bg-gray-100 transition font-semibold"
            >
              Sign Up
            </Link>
          </div>
        </nav>

        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div className="lg:w-1/2 mb-16 lg:mb-0 animate-fade-in p-8">
            <h1 className="text-5xl font-bold mb-6 leading-tight">
              Empowering Communities <br /> Through Digital Governance
            </h1>
            <p className="text-xl text-purple-100 mb-8">
              Join Civic Connect to streamline citizen services, enhance
              community engagement, and build a more responsive administration.
            </p>
            <div className="flex gap-4">
              <Link
                href="/signup"
                className="px-8 py-3 bg-white text-[#24428a] rounded-full shadow-lg hover:scale-105 transition text-lg font-semibold"
              >
                Get Started
              </Link>
              <Link
                href="#about-us"
                className="px-8 py-3 border-2 border-white text-white rounded-full hover:bg-white hover:text-[#24428a] transition text-lg font-semibold"
              >
                Learn More
              </Link>
            </div>
          </div>
          <div className="lg:w-1/2 animate-slide-up">
            <Image
              src="/background.jpg"
              alt="Digital Governance"
              width={600}
              height={400}
              className="w-full h-auto rounded-3xl shadow-xl"
            />
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-24 rounded-3xl shadow-inner">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-[#2e2e2e] mb-16">
            Why Choose Civic Connect?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[  
              {
                icon: <FaUserShield className="text-5xl text-black mb-4" />,
                title: "Secure Platform",
                desc: "Advanced security measures to protect sensitive information and maintain data privacy.",
              },
              {
                icon: <FaClipboardCheck className="text-5xl text-black mb-4" />,
                title: "Efficient Management",
                desc: "Streamlined processes for quick response and resolution of citizen concerns.",
              },
              {
                icon: <FaMobileAlt className="text-5xl text-black mb-4" />,
                title: "Mobile Friendly",
                desc: (
                  <>
                    Access services and manage tasks on-the-go with our mobile
                    app.
                    <div className="flex justify-center gap-4 mt-4 text-[#333]">
                      <span className="flex items-center gap-2">
                        <FaApple /> iOS
                      </span>
                      <span className="flex items-center gap-2">
                        <FaAndroid /> Android
                      </span>
                    </div>
                  </>
                ),
              },
            ].map((card, idx) => (
              <div
                key={idx}
                className="p-8 bg-[#edf1fc] text-center rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col items-center"
              >
                {card.icon}
                <h3 className="text-xl font-semibold mb-3 text-black">
                  {card.title}
                </h3>
                <p className="text-black">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* About Us Section */}
      <div
        id="about-us"
        className="bg-gradient-to-r from-[#24428a] to-[#7888b0] py-24 rounded-3xl"
      >
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6 text-white">About Us</h2>
          <p className="text-xl text-purple-100 max-w-3xl mx-auto mb-8">
            At Civic Connect, we believe in the power of digital transformation
            to make civic life better. Our mission is to bridge the gap between
            citizens and governance through technology.
          </p>
          <p className="text-lg text-purple-200 max-w-2xl mx-auto">
            Whether it's reporting issues, accessing resources, or tracking
            responses, Civic Connect puts the power in the hands of the people.
          </p>
        </div>
      </div>

      {/* Testimonials */}
      <div className="bg-white py-16">
        <div className="container mx-auto text-center px-6">
          <h2 className="text-3xl font-bold text-[#2e2e2e] mb-6">
            What Our Users Say
          </h2>
          <div className="flex flex-wrap justify-center gap-8">
            {[  
              {
                quote:
                  "Thanks to Civic Connect, our local governance is more transparent.",
                name: "John D., Government Official",
              },
              {
                quote:
                  "Reporting issues is easier than ever. Civic Connect is a game-changer!",
                name: "Sarah L., Community Member",
              },
              {
                quote:
                  "It made citizen service response so much faster. Love it!",
                name: "Amir K., Resident",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="max-w-xs p-6 bg-[#edf1fc] rounded-3xl shadow-md transition hover:shadow-xl"
              >
                <p className="text-gray-700 mb-4">"{item.quote}"</p>
                <span className="font-semibold text-[#4b3869]">
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-[#24428a] to-[#7888b0] py-16 text-center px-6 rounded-3xl">
        <h2 className="text-3xl font-bold mb-4 text-white">Ready to Make a Difference?</h2>
        <p className="text-lg text-purple-100 mb-8">
          Join Civic Connect today and be part of smarter governance.
        </p>
        <Link
          href="/signup"
          className="px-8 py-3 bg-white text-[#24428a] rounded-full shadow-lg hover:scale-105 transition font-semibold text-lg"
        >
          Get Started
        </Link>
      </div>

      {/* Impact Cards */}
      <div className="bg-white py-16 px-6 rounded-2xl shadow-inner">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-[#2e2e2e] mb-10">
            Our Impact
          </h2>
          <div className="flex flex-wrap justify-center gap-4 md:gap-8">

            {[  
              ["500+ Reports Resolved", "Thousands of civic issues resolved."],
              ["1,000+ Active Users", "A growing network making change."],
              ["98% Satisfaction Rate", "Users love Civic Connect."],
            ].map(([title, desc], idx) => (
              <div
                key={idx}
                className="p-6 bg-[#edf1fc] rounded-3xl shadow hover:shadow-xl transition"
              >
                <h3 className="text-2xl font-semibold mb-2 text-[#4b3869]">
                  {title}
                </h3>
                <p className="text-gray-600">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

     {/* Footer */}
<footer className="bg-gradient-to-r from-[#24428a] to-[#7888b0] py-6 mt-8 rounded-3xl">
  <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-white gap-4 md:gap-0">
    <Image
      src="/logo.png"
      alt="Civic Connect Logo"
      width={140}
      height={36}
      className="h-9 w-auto"
    />
    <div className="text-center text-sm flex-1">
      <p>&copy; 2025 Civic Connect. All rights reserved.</p>
    </div>
    <div className="flex gap-6 text-sm">
      <Link href="#about-us" className="hover:text-gray-200">
        About Us
      </Link>
      <Link href="/terms" className="hover:text-gray-200">
        Terms & Conditions
      </Link>
      <Link href="/privacy" className="hover:text-gray-200">
        Privacy Policy
      </Link>
    </div>
  </div>
</footer>

    </div>
  );
}
