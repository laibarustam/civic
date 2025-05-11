'use client';

import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '/firebase'; // adjust path if needed
import AnalyticsChart from '../components/AnalyticsChart';
import ReportsGraph from '../components/ReportsGraph';
import { FaChartBar, FaCheckCircle, FaExclamationTriangle, FaUsers } from 'react-icons/fa';

export default function Analytics() {
  const [reportCounts, setReportCounts] = useState({
    total: 0,
    resolved: 0,
    pending: 0,
    inProgress: 0,  // Added inProgress
  });

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'reports'));
        const total = snapshot.size;

        let resolved = 0;
        let pending = 0;
        let inProgress = 0;

        snapshot.forEach(doc => {
          const status = doc.data().status?.toLowerCase();
          if (status === 'done') resolved++;
          else if (status === 'pending') pending++;
          else if (status === 'in progress') inProgress++;
        });

        setReportCounts({ total, resolved, pending, inProgress });
      } catch (err) {
        console.error('Error fetching reports:', err);
      }
    };

    fetchReports();
  }, []);

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'users'));
        const userList = snapshot.docs.map(doc => doc.data());
        setUsers(userList);
      } catch (err) {
        console.error('Error fetching users:', err);
      }
    };
  
    fetchUsers();
  }, []);

  const filteredUsers = users; // Replace this with actual filters if needed

  return (
    <main className="min-h-screen bg-[#f5f7fb] p-8">
      <h2 className="text-2xl font-semibold text-center mb-8">Civic Connect - Analytics and Insights</h2>
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="bg-green-200 p-6 rounded text-black flex items-center justify-center flex-col hover:bg-green-300 hover:shadow-xl transform hover:scale-105 transition-all duration-300">
          <FaChartBar className="text-4xl mb-4" />
          <h3 className="text-lg font-bold">Total Reports</h3>
          <p className="text-3xl font-semibold mt-2">{reportCounts.total}</p>
        </div>
        <div className="bg-blue-200 p-6 rounded text-black flex items-center justify-center flex-col hover:bg-blue-300 hover:shadow-xl transform hover:scale-105 transition-all duration-300">
          <FaCheckCircle className="text-4xl mb-4" />
          <h3 className="text-lg font-bold">Resolved Reports</h3>
          <p className="text-3xl font-semibold mt-2">{reportCounts.resolved}</p>
        </div>
        <div className="bg-yellow-200 p-6 rounded text-black flex items-center justify-center flex-col hover:bg-yellow-300 hover:shadow-xl transform hover:scale-105 transition-all duration-300">
          <FaExclamationTriangle className="text-4xl mb-4" />
          <h3 className="text-lg font-bold">Pending Reports</h3>
          <p className="text-3xl font-semibold mt-2">{reportCounts.pending}</p>
        </div>
        <div className="bg-orange-200 p-6 rounded text-black flex items-center justify-center flex-col hover:bg-orange-300 hover:shadow-xl transform hover:scale-105 transition-all duration-300">
          <FaExclamationTriangle className="text-4xl mb-4" />
          <h3 className="text-lg font-bold">In Progress Reports</h3>
          <p className="text-3xl font-semibold mt-2">{reportCounts.inProgress}</p>
        </div>
      </div>

      {/* Graph Section */}
      <section className="bg-white p-6 mb-8 rounded shadow">
        <h3 className="text-lg font-semibold mb-4">Graphs</h3>
        <ReportsGraph data={reportCounts} />
      </section>

      {/* Pie Chart Section */}
<section className="bg-white p-6 mb-8 rounded shadow">
  <h3 className="text-lg font-semibold mb-4">Charts</h3>
  <AnalyticsChart data={reportCounts} />
  <div className="flex justify-center mt-4 space-x-4 text-sm">
    <div className="flex items-center">
      <span className="w-3 h-3 bg-orange-400 rounded-full mr-2" /> Total
    </div>
    <div className="flex items-center">
      <span className="w-3 h-3 bg-blue-500 rounded-full mr-2" /> Resolved
    </div>
    <div className="flex items-center">
      <span className="w-3 h-3 bg-purple-500 rounded-full mr-2" /> Pending
    </div>
    <div className="flex items-center">
      {/* Updated color for In Progress (using a different shade of orange or any color you prefer) */}
      <span className="w-3 h-3 bg-yellow-500 rounded-full mr-2" /> In Progress
    </div>
  </div>
</section>


      {/* User Engagement Table */}
{/* User Engagement Table */}
<section className="max-w-5xl mx-auto mb-12">
  <h3 className="text-xl font-semibold mb-4">User Management Table</h3>
  <div className="overflow-x-auto">
    <table className="w-full bg-white shadow border rounded text-sm">
      <thead className="bg-gray-100">
        <tr className="text-left">
          <th className="p-3 border-x text-center">Serial no</th>
          <th className="p-3 border-x text-center">Name</th>
          <th className="p-3 border-x text-center">Email</th>
          <th className="p-3 border-x text-center">Role</th>
          <th className="p-3 border-x text-center">Location</th>
        </tr>
      </thead>
      <tbody>
        {filteredUsers.map((user, index) => (
          <tr key={index} className="border-t">
            <td className="p-3 border-x text-center">{index + 1}</td>
            <td className="p-3 border-x text-center">{user.full_name || 'N/A'}</td>
            <td className="p-3 border-x text-center">{user.email}</td>
            <td className="p-3 border-x text-center">{user.role}</td>
            <td className="p-3 border-x text-center">{user.locations}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</section>


      {/* Footer */}
      <footer className="text-center text-sm text-gray-700 mt-8">
        © 2025 civicconect.com | Developed by Wasif & Laiba
      </footer>
    </main>
  );
}
