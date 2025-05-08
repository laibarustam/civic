'use client';
import { useEffect, useState } from 'react';
import { db } from '/firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import { FaUsers, FaUserShield, FaUserCheck, FaRegUser } from 'react-icons/fa';
import ReportMap from '../components/ReportMap';

export default function UserPage() {
  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalAdmins, setTotalAdmins] = useState(0);
  const [totalOfficers, setTotalOfficers] = useState(0);
  const [totalCitizens, setTotalCitizens] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('');

  useEffect(() => {
    const usersCollection = collection(db, 'users');

    const unsubscribe = onSnapshot(usersCollection, (snapshot) => {
      const usersList = snapshot.docs.map((doc) => doc.data());
      setUsers(usersList);
      setTotalUsers(usersList.length);
      setTotalAdmins(usersList.filter((user) => user.role === 'Admin').length);
      setTotalOfficers(usersList.filter((user) => user.role === 'Officer').length);
      setTotalCitizens(usersList.filter((user) => user.role === 'Citizen').length);
    });

    return () => unsubscribe();
  }, []);

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRole = roleFilter ? user.role === roleFilter : true;

    return matchesSearch && matchesRole;
  });
// Just before return (
  const selectedLocation = users
  .filter((user) => user.locations?.latitude && user.locations?.longitude)
  .map((user) => ({
    latitude: user.locations.latitude,
    longitude: user.locations.longitude,
  }));

  return (
    <main className="bg-[#f5f7fb] min-h-screen p-8">
      <h2 className="text-2xl font-semibold text-center mb-6">Civic Connect - User Management Panel</h2>

      {/* Cards */}
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

      {/* Table */}
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
              {filteredUsers.map((user, index) => (
                <tr key={index} className="border-t">
                  <td className="p-3">{index + 1}</td>
                  <td className="p-3">{user.full_name || 'N/A'}</td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3">{user.role}</td>
                  <td className="p-3">{user.locations}</td>
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
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border p-2 rounded-l w-full"
          />
          <button className="bg-blue-600 text-white px-4 py-2 rounded-r">🔍</button>
        </div>

        {/* Role Filter */}
        <div className="flex gap-4 mt-4">
          <span
            onClick={() => setRoleFilter('Admin')}
            className={`px-4 py-1 rounded cursor-pointer transition-all duration-300 ${
              roleFilter === 'Admin' ? 'bg-red-400' : 'bg-red-200 hover:bg-red-300 hover:shadow-lg transform hover:scale-105'
            }`}
          >
            Admin
          </span>
          <span
            onClick={() => setRoleFilter('Officer')}
            className={`px-4 py-1 rounded cursor-pointer transition-all duration-300 ${
              roleFilter === 'Officer' ? 'bg-green-400' : 'bg-green-200 hover:bg-green-300 hover:shadow-lg transform hover:scale-105'
            }`}
          >
            Officer
          </span>
          <span
            onClick={() => setRoleFilter('Citizen')}
            className={`px-4 py-1 rounded cursor-pointer transition-all duration-300 ${
              roleFilter === 'Citizen' ? 'bg-yellow-400' : 'bg-yellow-200 hover:bg-yellow-300 hover:shadow-lg transform hover:scale-105'
            }`}
          >
            Citizen
          </span>
          <span
            onClick={() => setRoleFilter('')}
            className="px-4 py-1 rounded cursor-pointer bg-gray-200 hover:bg-gray-300 hover:shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            All
          </span>
        </div>
      </section>

  {/* Map */}
    {/* Map Heatmap */}
    <div className="max-w-5xl mx-auto mb-10">
        <h3 className="text-xl font-semibold mb-4">User Locations on Map</h3>
        <div className="rounded shadow overflow-hidden">
          <ReportMap selectedLocation={selectedLocation} />
        </div>
      </div>


      {/* Footer */}
      <footer className="text-center text-sm text-gray-700 mt-8">
        © 2025 civicconect.com | Developed by Wasif & Laiba
      </footer>
    </main>
  );
}
