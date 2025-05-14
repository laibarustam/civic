"use client";

import "./globals.css";
import Sidebar from "./components/sidebar";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { auth } from "/firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const publicPages = ["/", "/login", "/signup", "/forgetpassword"];
  const isPublicPage = publicPages.includes(pathname);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);

      if (!user && !isPublicPage) {
        router.push("/login");
      }

      if (user && isPublicPage && pathname !== "/") {
        router.push("/dashboard");
      }
    });

    return () => unsubscribe();
  }, [pathname, isPublicPage]);

  if (loading) {
    return (
      <html lang="en">
        <body>
          <div className="min-h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        </body>
      </html>
    );
  }

  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen">
          {!isPublicPage && user && <Sidebar />}
          <main className={`flex-1 ${!isPublicPage ? "p-6 bg-gray-100" : ""}`}>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
