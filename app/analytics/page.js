"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "/firebase"; // adjust path if needed
import AnalyticsChart from "../components/AnalyticsChart";
import ReportsGraph from "../components/ReportsGraph";
import {
  FaChartBar,
  FaCheckCircle,
  FaExclamationTriangle,
  FaUsers,
} from "react-icons/fa";

export default function Analytics() {
  const [reportCounts, setReportCounts] = useState({
    total: 0,
    solved: 0,
    pending: 0,
    rejected: 0,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);

  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const snapshot = await getDocs(collection(db, "reports"));
        const total = snapshot.size;

        let solved = 0;
        let pending = 0;
        let rejected = 0;

        snapshot.forEach((doc) => {
          const status = doc.data().status?.toLowerCase();
          if (status === "solved") solved++;
          else if (status === "pending") pending++;
          else if (status === "rejected") rejected++;
        });

        setReportCounts({ total, solved, pending, rejected });
      } catch (err) {
        console.error("Error fetching reports:", err);
      }
    };

    fetchReports();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoadingUsers(true);
        const snapshot = await getDocs(collection(db, "user_admin"));
        const userList = snapshot.docs.map((doc) => {
          const data = doc.data();
          return { id: doc.id, ...data };
        });
        setUsers(userList);
      } catch (err) {
        console.error("Error fetching users:", err);
      } finally {
        setLoadingUsers(false);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users;
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <main className="min-h-screen bg-[#f5f7fb] p-8">
      <h2 className="text-2xl font-semibold text-center mb-8 text-black">
        Civic Connect - Analytics and Insights
      </h2>
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="bg-green-200 p-6 rounded text-black flex items-center justify-center flex-col hover:bg-green-300 hover:shadow-xl transform hover:scale-105 transition-all duration-300">
          <FaChartBar className="text-4xl mb-4" />
          <h3 className="text-lg font-bold">Total Reports</h3>
          <p className="text-3xl font-semibold mt-2">{reportCounts.total}</p>
        </div>
        <div className="bg-blue-200 p-6 rounded text-black flex items-center justify-center flex-col hover:bg-blue-300 hover:shadow-xl transform hover:scale-105 transition-all duration-300">
          <FaCheckCircle className="text-4xl mb-4" />
          <h3 className="text-lg font-bold">Solved Reports</h3>
          <p className="text-3xl font-semibold mt-2">{reportCounts.solved}</p>
        </div>
        <div className="bg-yellow-200 p-6 rounded text-black flex items-center justify-center flex-col hover:bg-yellow-300 hover:shadow-xl transform hover:scale-105 transition-all duration-300">
          <FaExclamationTriangle className="text-4xl mb-4" />
          <h3 className="text-lg font-bold">Pending Reports</h3>
          <p className="text-3xl font-semibold mt-2">{reportCounts.pending}</p>
        </div>
        <div className="bg-orange-200 p-6 rounded text-black flex items-center justify-center flex-col hover:bg-orange-300 hover:shadow-xl transform hover:scale-105 transition-all duration-300">
          <FaExclamationTriangle className="text-4xl mb-4" />
          <h3 className="text-lg font-bold">Rejected Reports</h3>
          <p className="text-3xl font-semibold mt-2">{reportCounts.rejected}</p>
        </div>
      </div>

      {/* Graph Section */}
      <section className="bg-white p-6 mb-8 rounded shadow">
        <h3 className="text-lg font-semibold mb-4 text-black">Graphs</h3>
        <ReportsGraph data={reportCounts} />
      </section>

      {/* Pie Chart Section */}
      <section className="bg-white p-6 mb-8 rounded shadow">
        <h3 className="text-lg font-semibold mb-4 text-black">Charts</h3>
        <AnalyticsChart data={reportCounts} />
        <div className="flex justify-center mt-4 space-x-4 text-sm">
          {" "}
          <div className="flex items-center">
            <span className="w-3 h-3 bg-orange-400 rounded-full mr-2" />{" "}
            <span className="text-black">Total</span>
          </div>
          <div className="flex items-center">
            <span className="w-3 h-3 bg-blue-500 rounded-full mr-2" />{" "}
            <span className="text-black">Solved</span>
          </div>
          <div className="flex items-center">
            <span className="w-3 h-3 bg-purple-500 rounded-full mr-2" />{" "}
            <span className="text-black">Pending</span>
          </div>
          <div className="flex items-center">
            <span className="w-3 h-3 bg-yellow-500 rounded-full mr-2" />{" "}
            <span className="text-black">Rejected</span>
          </div>
        </div>
      </section>

      {/* User Management Table */}
      <section className="max-w-5xl mx-auto mb-12 text-black">
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
              {loadingUsers ? (
                <tr>
                  <td colSpan="5" className="p-5 text-center">
                    <div className="flex justify-center items-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                      <span className="ml-2">Loading users...</span>
                    </div>
                  </td>
                </tr>
              ) : currentUsers.length === 0 ? (
                <tr>
                  <td colSpan="5" className="p-5 text-center">
                    No users found
                  </td>
                </tr>
              ) : (
                currentUsers.map((user, index) => (
                  <tr key={index} className="border-t">
                    <td className="p-3 border-x text-center">
                      {indexOfFirstUser + index + 1}
                    </td>
                    <td className="p-3 border-x text-center">
                      {user.full_name || "N/A"}{" "}
                    </td>
                    <td className="p-3 border-x text-center">{user.email}</td>
                    <td className="p-3 border-x text-center">
                      {user.role || "N/A"}
                    </td>
                    <td className="p-3 border-x text-center">
                      {user.locations
                        ? typeof user.locations === "object"
                          ? `${user.locations.latitude || "N/A"}, ${
                              user.locations.longitude || "N/A"
                            }`
                          : user.locations
                        : "N/A"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {/* Pagination */}
          {filteredUsers.length > 0 ? (
            <div className="flex justify-center mt-6">
              <div className="flex items-center space-x-1">
                <button
                  onClick={() => currentPage > 1 && paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 border rounded-l-md ${
                    currentPage === 1
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-white text-gray-700 hover:bg-blue-50"
                  }`}
                >
                  Previous
                </button>

                <div className="flex flex-wrap space-x-1">
                  {totalPages <= 7 ? (
                    Array.from({ length: totalPages }, (_, i) => (
                      <button
                        key={i}
                        onClick={() => paginate(i + 1)}
                        className={`px-4 py-2 border ${
                          currentPage === i + 1
                            ? "bg-blue-500 text-white"
                            : "bg-white text-gray-700 hover:bg-blue-50"
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))
                  ) : (
                    <>
                      <button
                        onClick={() => paginate(1)}
                        className={`px-4 py-2 border ${
                          currentPage === 1
                            ? "bg-blue-500 text-white"
                            : "bg-white text-gray-700 hover:bg-blue-50"
                        }`}
                      >
                        1
                      </button>

                      {currentPage > 3 && (
                        <span className="px-4 py-2">...</span>
                      )}

                      {Array.from(
                        { length: Math.min(5, totalPages) },
                        (_, i) => {
                          let pageNum;
                          if (currentPage <= 3) {
                            pageNum = i + 2;
                          } else if (currentPage >= totalPages - 2) {
                            pageNum = totalPages - 5 + i + 1;
                          } else {
                            pageNum = currentPage - 2 + i;
                          }

                          if (pageNum > 1 && pageNum < totalPages) {
                            return (
                              <button
                                key={pageNum}
                                onClick={() => paginate(pageNum)}
                                className={`px-4 py-2 border ${
                                  currentPage === pageNum
                                    ? "bg-blue-500 text-white"
                                    : "bg-white text-gray-700 hover:bg-blue-50"
                                }`}
                              >
                                {pageNum}
                              </button>
                            );
                          }
                          return null;
                        }
                      ).filter(Boolean)}

                      {currentPage < totalPages - 2 && (
                        <span className="px-4 py-2">...</span>
                      )}

                      <button
                        onClick={() => paginate(totalPages)}
                        className={`px-4 py-2 border ${
                          currentPage === totalPages
                            ? "bg-blue-500 text-white"
                            : "bg-white text-gray-700 hover:bg-blue-50"
                        }`}
                      >
                        {totalPages}
                      </button>
                    </>
                  )}
                </div>

                <button
                  onClick={() =>
                    currentPage < totalPages && paginate(currentPage + 1)
                  }
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 border rounded-r-md ${
                    currentPage === totalPages
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-white text-gray-700 hover:bg-blue-50"
                  }`}
                >
                  Next
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-4 text-gray-500">No users found</div>
          )}

          {/* Showing entries info */}
          <div className="text-sm text-gray-500 mt-3 text-center">
            Showing {indexOfFirstUser + 1} to{" "}
            {Math.min(indexOfLastUser, filteredUsers.length)} of{" "}
            {filteredUsers.length} entries
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center text-sm text-gray-700 mt-8">
        © 2025 civicconect.com | Developed by Wasif & Laiba
      </footer>
    </main>
  );
}
