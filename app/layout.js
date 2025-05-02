"use client";

import "./globals.css";
import Sidebar from "./components/sidebar";
import { usePathname } from "next/navigation";

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const authPages = ["/", "/login", "/signup", "/forgetpassword"];
  const isAuthPage = authPages.includes(pathname);

  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen">
          {!isAuthPage && <Sidebar />}
          <main className={`flex-1 ${!isAuthPage ? "p-6 bg-gray-100" : ""}`}>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
