'use client';
import { useEffect, useState } from 'react';
import { db } from '/firebase'; // Import Firestore instance
import { collection, onSnapshot } from 'firebase/firestore';
import { FaUsers, FaUserShield, FaUserCheck, FaRegUser } from 'react-icons/fa';

export default function UserPage() {
  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalAdmins, setTotalAdmins] = useState(0);
  const [totalOfficers, setTotalOfficers] = useState(0);
  const [totalCitizens, setTotalCitizens] = useState(0);

  useEffect(() => {
    const usersCollection = collection(db, 'users');

    // Real-time listener for fetching user data
    const unsubscribe = onSnapshot(usersCollection, (snapshot) => {
      const usersList = snapshot.docs.map((doc) => doc.data());
      setUsers(usersList);
      setTotalUsers(usersList.length);

      // Filter by roles
      setTotalAdmins(usersList.filter(user => user.role === 'Admin').length);
      setTotalOfficers(usersList.filter(user => user.role === 'Officer').length);
      setTotalCitizens(usersList.filter(user => user.role === 'Citizen').length);
    });

    return () => unsubscribe(); // Clean up the listener when the component is unmounted
  }, []);

  return (
    <main className="bg-[#f5f7fb] min-h-screen p-8">
      <h2 className="text-2xl font-semibold text-center mb-6">Civic Connect - User Management Panel</h2>

      {/* User Overview Cards with Icons and Hover Effects */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 max-w-5xl mx-auto text-white text-center">
        <div className="bg-green-300 text-black py-6 rounded shadow hover:bg-green-400 hover:shadow-xl transform hover:scale-105 transition-all duration-300">
          <FaUsers className="text-4xl mb-4 mx-auto" />
          <p className="text-lg font-semibold">Total User</p>
          <p className="text-xl font-bold">({totalUsers})</p>
        </div>
        <div className="bg-cyan-300 text-black py-6 rounded shadow hover:bg-cyan-400 hover:shadow-xl transform hover:scale-105 transition-all duration-300">
          <FaUserShield className="text-4xl mb-4 mx-auto" />
          <p className="text-lg font-semibold">Admins</p>
          <p className="text-xl font-bold">({totalAdmins})</p>
        </div>
        <div className="bg-yellow-200 text-black py-6 rounded shadow hover:bg-yellow-300 hover:shadow-xl transform hover:scale-105 transition-all duration-300">
          <FaUserCheck className="text-4xl mb-4 mx-auto" />
          <p className="text-lg font-semibold">Officers</p>
          <p className="text-xl font-bold">({totalOfficers})</p>
        </div>
        <div className="bg-fuchsia-300 text-black py-6 rounded shadow hover:bg-fuchsia-400 hover:shadow-xl transform hover:scale-105 transition-all duration-300">
          <FaRegUser className="text-4xl mb-4 mx-auto" />
          <p className="text-lg font-semibold">Citizens</p>
          <p className="text-xl font-bold">({totalCitizens})</p>
        </div>
      </section>

      {/* User Table */}
      <section className="max-w-5xl mx-auto mb-12">
        <h3 className="text-xl font-semibold mb-4">User Management Table</h3>
        <div className="overflow-x-auto">
          <table className="w-full bg-white shadow border rounded text-sm">
            <thead className="bg-gray-100">
              <tr className="text-left">
                <th className="p-3">Serial no</th>
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Role</th>
                <th className="p-3">Location</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index} className="border-t">
                  <td className="p-3">{index + 1}</td> {/* Using index + 1 as serial_no */}
                  <td className="p-3">{user.full_name || 'N/A'}</td> {/* Use full_name field */}
                  <td className="p-3">{user.email}</td>
                  <td className="p-3">{user.role}</td>
                  <td className="p-3">{user.locations}</td> {/* Use location field */}
                  <td className="p-3 space-x-2">
                    {user.status === 'Suspended' ? (
                      <button className="text-green-600 font-medium">✔ Activate</button>
                    ) : (
                      <>
                        <button className="text-blue-600 font-medium">✏ Edit</button>
                        <button className="text-red-600 font-medium">❌ Delete</button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Search */}
        <div className="flex items-center mt-6">
          <input
            type="text"
            placeholder="Search by Name, EmailID"
            className="border p-2 rounded-l w-full"
          />
          <button className="bg-blue-600 text-white px-4 py-2 rounded-r">🔍</button>
        </div>

        {/* Filter Labels */}
        <div className="flex gap-4 mt-4">
          <span className="bg-red-200 px-4 py-1 rounded cursor-pointer hover:bg-red-300 hover:shadow-lg transform hover:scale-105 transition-all duration-300">
            Admin
          </span>
          <span className="bg-green-200 px-4 py-1 rounded cursor-pointer hover:bg-green-300 hover:shadow-lg transform hover:scale-105 transition-all duration-300">
             Officer
          </span>
          <span className="bg-yellow-200 px-4 py-1 rounded cursor-pointer hover:bg-yellow-300 hover:shadow-lg transform hover:scale-105 transition-all duration-300">
           Citizen
          </span>
        </div>
      </section>

      {/* Map */}
      <section className="max-w-4xl mx-auto mb-10">
        <h3 className="text-xl font-semibold mb-4">Google Maps to Show Issue Locations</h3>
        <div className="rounded shadow overflow-hidden">
          <img
            src="https://maps.googleapis.com/maps/api/staticmap?center=33.6844,73.0479&zoom=14&size=600x300&maptype=roadmap&markers=color:red%7Clabel:C%7C33.6844,73.0479&key=YOUR_API_KEY"
            alt="Map Placeholder"
            className="w-full"
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center text-sm text-gray-700 mt-8">
          © 2025 civicconect.com | Developed by Wasif & Laiba
        </footer>
    </main>
  );
}
