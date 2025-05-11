"use client";

import ReportsGraph from "../components/ReportsGraph";
import {
  FaChartBar,
  FaCheckCircle,
  FaExclamationTriangle,
} from "react-icons/fa";
import { useState, useEffect } from "react";
import { auth, db } from "/firebase";
import {
  collection,
  doc,
  getDoc,
  query,
  onSnapshot,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

export default function Home() {
  const [userData, setUserData] = useState({
    full_name: "",
    role: "",
    department: "",
  });
  const [reports, setReports] = useState([]);
  const [users, setUsers] = useState([]);
  const [taskHistory, setTaskHistory] = useState([]);

  // ✅ Fetch logged-in user's admin data
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user_admin) => {
      console.log("Auth user:", user_admin);
      if (user_admin) {
        // Fetch data from the correct collection (user_admin instead of users)
        const userDoc = await getDoc(doc(db, "user_admin", user_admin.uid));
        if (userDoc.exists()) {
          const data = userDoc.data();
          console.log("User data:", data);
          setUserData({
            full_name: data.full_name || "User",
            role: data.role || "Not Specified",
            department: data.department || "Not Specified",
          });
        } else {
          console.warn("No such user document in Firestore.");
        }
      } else {
        console.warn("User is not authenticated.");
      }
    });
  
    return () => unsubscribe();
  }, []);
  
  // Fetch all reports data
  useEffect(() => {
    const q = query(collection(db, "reports"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedReports = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          date: data.timestamp
            ? data.timestamp.toDate().toLocaleDateString()
            : "",
        };
      });
      setReports(fetchedReports);
    });
    return () => unsubscribe();
  }, []);

  // Fetch all users data
  useEffect(() => {
    const q = query(collection(db, "users"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedUsers = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(fetchedUsers);
    });
    return () => unsubscribe();
  }, []);

  // Fetch all task history data
  useEffect(() => {
    const q = query(collection(db, "task_history"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedHistory = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTaskHistory(fetchedHistory);
    });
    return () => unsubscribe();
  }, []);

  // Helper: Get task for a given report ID
  const getTaskForReport = (reportId) => {
    return taskHistory.find((task) => task.id === reportId);
  };

const totalReports = reports.length;

const resolvedReports = reports.filter(
  (r) => r.status && r.status.toLowerCase() === "done"
).length;

const pendingReports = reports.filter(
  (r) => r.status && r.status.toLowerCase() === "pending"
).length;

const inProgressReports = reports.filter(
  (r) => r.status && r.status.toLowerCase() === "in progress"
).length;

  return (
    <div className="flex min-h-screen">
      {/* Main Content */}
      <main className="flex-1 bg-[#f9fafb] p-10 overflow-y-auto">
        {/* Header */}
        <h2 className="text-2xl font-semibold mb-2 text-gray-800">
          Civic Connect - Admin Panel
        </h2>
        <div className="flex items-center gap-4 mb-10">
          <img
  src={userData.image || "/default-profile.jpg"}
  alt="User Profile"
  className="w-16 h-16 rounded-full object-cover"
/>

          <div className="text-gray-800">
            <p className="text-lg font-semibold">Welcome, {userData.full_name}</p>
            <p className="text-sm text-gray-700">{userData.role}</p>
            <p className="text-sm text-gray-700">{userData.department}</p>
            </div>
        </div>

{/* Summary Cards */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
      <div className="bg-green-200 p-6 rounded text-black flex items-center justify-center flex-col hover:bg-green-300 hover:shadow-xl transform hover:scale-105 transition-all duration-300">
        <FaChartBar className="text-4xl mb-4" />
        <h3 className="text-lg font-bold">Total Reports</h3>
        <p className="text-3xl font-semibold mt-2">{totalReports}</p>
      </div>
      <div className="bg-blue-200 p-6 rounded text-black flex items-center justify-center flex-col hover:bg-blue-300 hover:shadow-xl transform hover:scale-105 transition-all duration-300">
        <FaCheckCircle className="text-4xl mb-4" />
        <h3 className="text-lg font-bold">Resolved Reports</h3>
        <p className="text-3xl font-semibold mt-2">{resolvedReports}</p>
      </div>
      <div className="bg-yellow-200 p-6 rounded text-black flex items-center justify-center flex-col hover:bg-yellow-300 hover:shadow-xl transform hover:scale-105 transition-all duration-300">
        <FaExclamationTriangle className="text-4xl mb-4" />
        <h3 className="text-lg font-bold">Pending Reports</h3>
        <p className="text-3xl font-semibold mt-2">{pendingReports}</p>
      </div>
      <div className="bg-orange-200 p-6 rounded text-black flex items-center justify-center flex-col hover:bg-orange-300 hover:shadow-xl transform hover:scale-105 transition-all duration-300">
        <FaExclamationTriangle className="text-4xl mb-4" />
        <h3 className="text-lg font-bold">In Progress Reports</h3>
        <p className="text-3xl font-semibold mt-2">{inProgressReports}</p>
      </div>
    </div>

    {/* Graph Section */}
    <div className="bg-white p-6 rounded shadow mb-10">
      <h3 className="text-lg font-semibold mb-4">Graphs</h3>
      <ReportsGraph />
    </div>

    {/* Report Table */}
    <div className="bg-white p-6 rounded shadow mb-10">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">Report Table</h3>
      <table className="w-full text-sm text-left text-gray-800">
        <thead className="bg-gray-100">
          <tr>
            {["Report ID", "Issue Type", "Location", "Status", "Assigned To", "Task Info"].map((header) => (
              <th key={header} className="px-4 py-2 border">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {reports.map((report) => {
            const task = getTaskForReport(report.id);
            return (
              <tr key={report.id} className="border-t">
                <td className="px-4 py-2 border">{report.id}</td>
                <td className="px-4 py-2 border">{report.category || "N/A"}</td>
                <td className="px-4 py-2 border">{report.location || "N/A"}</td>
                <td className="px-4 py-2 border">{report.status || "N/A"}</td>
                <td className="px-4 py-2 border">{report.assigned_to || "Unassigned"}</td>
                <td className="px-4 py-2 border text-sm">
                  {task ? (
                    <div>
                      <div><b>Assigned:</b> {task.assigned_to}</div>
                      <div><b>Done At:</b> {task.completedAt?.toDate().toLocaleString()}</div>
                      <div><b>Note:</b> {task.instruction}</div>
                    </div>
                  ) : (
                    <span className="text-gray-500">Not Started</span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>

    {/* User Engagement Table */}
    <div className="bg-white p-6 rounded shadow">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">User Engagement Table</h3>
      <table className="w-full text-sm text-left text-gray-800">
        <thead className="bg-gray-100">
          <tr>
            {["User", "Email", "Role", "Location"].map((header) => (
              <th key={header} className="px-4 py-2 border">{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-t">
              <td className="px-4 py-2 border">{user.full_name || "N/A"}</td>
              <td className="px-4 py-2 border">{user.email}</td>
              <td className="px-4 py-2 border">{user.role}</td>
              <td className="px-4 py-2 border">{user.locations || "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

        {/* Footer */}
        <footer className="text-center text-sm text-gray-700 mt-8">
          © 2025 civicconect.com | Developed by Wasif & Laiba
        </footer>
      </main>
    </div>
  );
}
