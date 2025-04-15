// app/layout.js
import './globals.css';
import Sidebar from './components/sidebar';

export const metadata = {
  title: 'Civic Connect',
  description: 'Admin Panel',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen">
          <Sidebar />
          <main className="flex-1 p-6 bg-gray-100">{children}</main>
        </div>
      </body>
    </html>
  );
}
