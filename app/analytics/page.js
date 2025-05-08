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
  });

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'reports'));
        const total = snapshot.size;

        let resolved = 0;
        let pending = 0;

        snapshot.forEach(doc => {
          const status = doc.data().status?.toLowerCase();
          if (status === 'resolved') resolved++;
          else pending++;
        });

        setReportCounts({ total, resolved, pending });
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

      {/* Overview Boxes */}
      <section className="grid grid-cols-4 gap-4 mb-8">
        <div className="bg-green-200 p-4 rounded text-center shadow hover:bg-green-300 hover:shadow-xl transform hover:scale-105 transition-all duration-300">
          <FaChartBar className="text-4xl mb-4 mx-auto" />
          <p className="font-semibold text-lg">Total Reports</p>
          <p className="text-xl font-bold">({reportCounts.total})</p>
        </div>
        <div className="bg-blue-200 p-4 rounded text-center shadow hover:bg-blue-300 hover:shadow-xl transform hover:scale-105 transition-all duration-300">
          <FaCheckCircle className="text-4xl mb-4 mx-auto" />
          <p className="font-semibold text-lg">Resolved Reports</p>
          <p className="text-xl font-bold">({reportCounts.resolved})</p>
        </div>
        <div className="bg-yellow-200 p-4 rounded text-center shadow hover:bg-yellow-300 hover:shadow-xl transform hover:scale-105 transition-all duration-300">
          <FaExclamationTriangle className="text-4xl mb-4 mx-auto" />
          <p className="font-semibold text-lg">Pending Reports</p>
          <p className="text-xl font-bold">({reportCounts.pending})</p>
        </div>
        <div className="bg-purple-200 p-4 rounded text-center shadow hover:bg-purple-300 hover:shadow-xl transform hover:scale-105 transition-all duration-300">
          <FaUsers className="text-4xl mb-4 mx-auto" />
          <p className="font-semibold text-lg">Active Users</p>
          <p className="text-xl font-bold">(102)</p>
        </div>
      </section>

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
            <span className="w-3 h-3 bg-blue-500 rounded-full mr-2" /> Resolved
          </div>
          <div className="flex items-center">
            <span className="w-3 h-3 bg-purple-500 rounded-full mr-2" /> Pending
          </div>
          <div className="flex items-center">
            <span className="w-3 h-3 bg-orange-400 rounded-full mr-2" /> Total
          </div>
        </div>
      </section>

  
        {/* User Engagement Table */}
        
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
  