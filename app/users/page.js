"use client";
import { useEffect, useState } from "react";
import { db } from "/firebase";
import { collection, onSnapshot, doc, deleteDoc } from "firebase/firestore";
import { FaUsers, FaUserShield, FaUserCheck, FaRegUser } from "react-icons/fa";
import ReportMap from "../components/ReportMap";

export default function UserPage() {
  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalAdmins, setTotalAdmins] = useState(0);
  const [totalOfficers, setTotalOfficers] = useState(0);
  const [totalCitizens, setTotalCitizens] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("");

  useEffect(() => {
    const usersCollection = collection(db, "users");
    const adminsCollection = collection(db, "user_admin");

    const unsubscribeUsers = onSnapshot(usersCollection, (snapshot) => {
      const citizens = snapshot.docs.map((doc) => ({
        ...doc.data(),
        source: "citizen",
      }));

      setUsers((prev) => {
        const withoutCitizens = prev.filter((u) => u.source !== "citizen");
        return [...withoutCitizens, ...citizens];
      });

      setTotalCitizens(citizens.length);
    });

    const unsubscribeAdmins = onSnapshot(adminsCollection, (snapshot) => {
      const adminUsers = snapshot.docs.map((doc) => ({
        ...doc.data(),
        source: "admin",
      }));

      const admins = adminUsers.filter((user) => user.role === "Admin");
      const officers = adminUsers.filter((user) => user.role === "Officer");

      setUsers((prev) => {
        const withoutAdmins = prev.filter((u) => u.source !== "admin");
        return [...withoutAdmins, ...adminUsers];
      });

      setTotalAdmins(admins.length);
      setTotalOfficers(officers.length);
    });

    return () => {
      unsubscribeUsers();
      unsubscribeAdmins();
    };
  }, []);

  useEffect(() => {
    setTotalUsers(users.length);
  }, [users]);

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRole = roleFilter ? user.role === roleFilter : true;

    return matchesSearch && matchesRole;
  });

  const selectedLocation = users
    .filter((user) => user.locations?.latitude && user.locations?.longitude)
    .map((user) => ({
      latitude: user.locations.latitude,
      longitude: user.locations.longitude,
    }));

  return (
    <main className="bg-[#f5f7fb] min-h-screen p-8">
      <h2 className="text-2xl font-semibold text-center mb-6 text-black">
        Civic Connect - User Management Panel
      </h2>

      {/* Cards */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 max-w-5xl mx-auto text-white text-center">
        <div className="bg-green-300 text-black py-6 rounded shadow hover:bg-green-400 hover:shadow-xl transform hover:scale-105 transition-all duration-300">
          <FaUsers className="text-4xl mb-4 mx-auto" />
          <p className="text-lg font-semibold">Total Users</p>
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
      <div className="max-w-5xl mx-auto mb-12">
        <h3 className="text-xl font-semibold mb-4 text-black">
          User Management Table
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full bg-white shadow border rounded text-sm">
            {" "}
            <thead className="bg-gray-100">
              <tr className="text-center text-black">
                <th className="p-3 border-r border-gray-300">Serial No</th>
                <th className="p-3 border-r border-gray-300">Name</th>
                <th className="p-3 border-r border-gray-300">Email</th>
                <th className="p-3 border-r border-gray-300">Role</th>
              </tr>
            </thead>
            <tbody>
              {" "}
              {filteredUsers.map((user, index) => (
                <tr
                  key={user.id || index}
                  className="border-t border-gray-300 text-center text-black"
                >
                  <td className="p-3 border-r border-gray-300">{index + 1}</td>
                  <td className="p-3 border-r border-gray-300">
                    {user.full_name || "N/A"}
                  </td>
                  <td className="p-3 border-r border-gray-300">{user.email}</td>
                  <td className="p-3 border-r border-gray-300">{user.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Search */}
      <div className="flex items-center mt-6">
        <input
          type="text"
          placeholder="Search by Name, EmailID"
          className="border p-2 rounded-l w-full text-black"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded-r">
          🔍
        </button>
      </div>

      {/* Role Filter */}
      <div className="flex gap-4 mt-4">
        <span
          onClick={() => setRoleFilter("Admin")}
          className={`px-4 py-1 rounded cursor-pointer transition-all duration-300 ${
            roleFilter === "Admin"
              ? "bg-red-800"
              : "bg-red-500 hover:bg-red-600 hover:shadow-lg transform hover:scale-105"
          }`}
        >
          Admin
        </span>
        <span
          onClick={() => setRoleFilter("Officer")}
          className={`px-4 py-1 rounded cursor-pointer transition-all duration-300 ${
            roleFilter === "Officer"
              ? "bg-green-800"
              : "bg-green-600 hover:bg-green-500 hover:shadow-lg transform hover:scale-105"
          }`}
        >
          Officer
        </span>
        <span
          onClick={() => setRoleFilter("citizen")}
          className={`px-4 py-1 rounded cursor-pointer transition-all duration-300 ${
            roleFilter === "citizen"
              ? "bg-yellow-800"
              : "bg-yellow-500 hover:bg-yellow-600 hover:shadow-lg transform hover:scale-105"
          }`}
        >
          Citizen
        </span>
        <span
          onClick={() => setRoleFilter("")}
          className="px-4 py-1 rounded cursor-pointer bg-gray-600 hover:bg-gray-500 hover:shadow-lg transform hover:scale-105 transition-all duration-300"
        >
          All
        </span>
      </div>

      {/* Map */}
      {/* Map Heatmap
      <div className="max-w-5xl mx-auto mb-10">
        <h3 className="text-xl font-semibold mb-4">User Locations on Map</h3>
        <div className="rounded shadow overflow-hidden">
          <ReportMap selectedLocation={selectedLocation} />
        </div>
      </div> */}

      {/* Footer */}
      <footer className="text-center text-sm text-gray-700 mt-8">
        © 2025 Civic Connect | Developed by Wasif & Laiba
      </footer>
    </main>
  );
}
