"use client";

import { useState, useEffect } from "react";
import { db } from "/firebase";
import {
  collection,
  query,
  where,
  onSnapshot,
  doc,
  updateDoc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";

export default function TaskPage() {
  const [pendingReports, setPendingReports] = useState([]);
  const [taskHistory, setTaskHistory] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [department, setDepartment] = useState("");
  const [instruction, setInstruction] = useState("");
  const [status, setStatus] = useState("In Progress");
  const [loading, setLoading] = useState(true);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [allReports, setAllReports] = useState([]);
  const [pendingSearchQuery, setPendingSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [reportsPerPage] = useState(5);
  const [reportsCurrentPage, setReportsCurrentPage] = useState(1);

  // State for report details modal
  const [showReportModal, setShowReportModal] = useState(false);
  const [selectedReportDetails, setSelectedReportDetails] = useState(null);

  // State for active image index
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // State for search query
  const [allReportsSearchQuery, setAllReportsSearchQuery] = useState("");

  // Function to handle next image
  const nextImage = () => {
    if (selectedReportDetails?.images?.length > 0) {
      setActiveImageIndex((prev) =>
        prev === selectedReportDetails.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  // Function to handle previous image
  const prevImage = () => {
    if (selectedReportDetails?.images?.length > 0) {
      setActiveImageIndex((prev) =>
        prev === 0 ? selectedReportDetails.images.length - 1 : prev - 1
      );
    }
  };
  // Filter reports based on search query
  const filteredReports = allReports.filter(
    (report) =>
      report.id.toLowerCase().includes(allReportsSearchQuery.toLowerCase()) ||
      (report.title || "")
        .toLowerCase()
        .includes(allReportsSearchQuery.toLowerCase())
  );

  // Get current reports for pagination using filtered reports
  const indexOfLastReport = reportsCurrentPage * reportsPerPage;
  const indexOfFirstReport = indexOfLastReport - reportsPerPage;
  const currentReports = filteredReports.slice(
    indexOfFirstReport,
    indexOfLastReport
  );

  // Calculate total pages for reports using filtered reports
  const totalReportsPages = Math.ceil(filteredReports.length / reportsPerPage);

  // Change reports page
  const paginateReports = (pageNumber) => setReportsCurrentPage(pageNumber);

  // Function to open Google Maps with the location
  const openInGoogleMaps = (location) => {
    if (!location) return;

    let mapUrl;

    if (
      typeof location === "object" &&
      location.latitude &&
      location.longitude
    ) {
      // If location is an object with latitude and longitude
      mapUrl = `https://www.google.com/maps?q=${location.latitude},${location.longitude}`;
    } else if (typeof location === "string") {
      // If location is a string (address)
      mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        location
      )}`;
    } else {
      return; // Invalid location format
    }

    window.open(mapUrl, "_blank");
  };

  // Function to open modal with report details
  const openReportModal = (report) => {
    setSelectedReportDetails(report);
    setShowReportModal(true);
  };
  useEffect(() => {
    const q = query(collection(db, "reports"));
    return onSnapshot(q, (snapshot) => {
      const all = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          reporterName: data.reporterName || "N/A",
          title: data.title || "No Title",
          description: data.description || "No Description",
          images: data.images || [],
          date: data.timestamp
            ? data.timestamp.toDate().toLocaleDateString()
            : "",
        };
      });
      setAllReports(all);
    });
  }, []);

  useEffect(() => {
    const q = query(
      collection(db, "reports"),
      where("status", "==", "pending")
    );
    return onSnapshot(q, (snapshot) => {
      const reports = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          date: data.timestamp
            ? data.timestamp.toDate().toLocaleDateString()
            : "",
        };
      });
      setPendingReports(reports);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    const q = query(
      collection(db, "reports"),
      where("status", "in", ["In Progress", "Resolved", "Done"])
    );
    return onSnapshot(q, (snapshot) => {
      const history = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          date: data.timestamp
            ? data.timestamp.toDate().toLocaleDateString()
            : "",
        };
      });
      setTaskHistory(history);
    });
  }, []);

  const handleAssign = async () => {
    if (!selectedReport || !department)
      return alert("Please select a report and department.");
    await updateDoc(doc(db, "reports", selectedReport.id), {
      assigned_to: department,
      instruction,
      status: status,
    });
    await setDoc(doc(db, "assigned_reports", selectedReport.id), {
      ...selectedReport,
      assigned_to: department,
      instruction,
      status: status,
      assignedAt: new Date(),
    });
    alert("Task assigned!");
    setShowAssignModal(false);
    setSelectedReport(null);
    setDepartment("");
    setInstruction("");
    setStatus("In Progress");
  };

  const handleMarkDone = async (task) => {
    await updateDoc(doc(db, "reports", task.id), { status: "Resolved" });
    await setDoc(doc(db, "task_history", task.id), {
      ...task,
      status: "Resolved",
      completedAt: new Date(),
      timestamp: new Date(),
    });
    alert("Task marked as Done!");
  };

  const handleEditTask = (task) => {
    setSelectedTask(task);
    setDepartment(task.assigned_to || "");
    setInstruction(task.instruction || "");
    setStatus(task.status || "In Progress");
    setShowEditModal(true);
  };

  const handleDeleteTask = (task) => {
    setSelectedTask(task);
    setShowDeleteModal(true);
  };

  const confirmDeleteTask = async () => {
    if (selectedTask) {
      await deleteDoc(doc(db, "reports", selectedTask.id));
      await deleteDoc(doc(db, "task_history", selectedTask.id));
      alert("Task deleted!");
    }
    setShowDeleteModal(false);
  };

  const handleUpdateTask = async () => {
    if (!selectedTask || !department)
      return alert("Please select a department.");
    await updateDoc(doc(db, "reports", selectedTask.id), {
      assigned_to: department,
      instruction,
      status: status,
    });
    await setDoc(doc(db, "task_history", selectedTask.id), {
      ...selectedTask,
      assigned_to: department,
      instruction,
      status: status,
      updatedAt: new Date(),
    });
    alert("Task updated!");
    setShowEditModal(false);
    setSelectedTask(null);
    setDepartment("");
    setInstruction("");
    setStatus("In Progress");
  };

  const renderModal = (title, confirmText, onConfirm, onCancel, children) => (
    <div className="fixed inset-0 text-black bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg max-w-xl w-full">
        <h3 className="text-lg font-semibold mb-4">{title}</h3>
        <div className="space-y-4">{children}</div>
        <div className="flex justify-between items-center mt-4">
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded w-full"
            onClick={onConfirm}
          >
            {confirmText}
          </button>
          <button
            className="bg-blue-100 text-blue-800 px-4 py-2 rounded w-24 ml-4"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <main className="bg-[#f5f7fb] min-h-screen p-8">
      <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">
        Civic Connect - Assign Task Panel
      </h2>
      {/* Reports Table */}
      <section className="mb-10 text-black">
        <h3 className="text-xl font-bold underline mb-4 text-black-900">
          Reports Overview
        </h3>
        {loading ? (
          <div className="text-center text-gray-600">Loading reports...</div>
        ) : pendingReports.length === 0 ? (
          <div className="text-center text-gray-600">
            No pending reports available.
          </div>
        ) : (
          <table className="min-w-full border text-sm bg-white shadow rounded text-black">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2">Report ID</th>
                <th className="border p-2">Issue Type</th>
                <th className="border p-2">Location</th>
                <th className="border p-2">Date</th>
                <th className="border p-2">Status</th>
                <th className="border p-2">Assign</th>
              </tr>
            </thead>
            <tbody className="text-black">
              {pendingReports.map((report) => (
                <tr key={report.id}>
                  <td className="border p-2 font-bold">{report.id}</td>
                  <td className="border p-2">{report.category}</td>
                  <td className="border p-2">{report.location}</td>
                  <td className="border p-2">{report.date}</td>
                  <td className="border p-2">{report.status}</td>
                  <td className="border p-2">
                    <button
                      className="text-blue-600 hover:underline"
                      onClick={() => {
                        setSelectedReport(report);
                        setShowAssignModal(true);
                      }}
                    >
                      Assign
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
      {/* Modals */}
      {showAssignModal &&
        renderModal(
          "Assign Task",
          "Assign Task",
          handleAssign,
          () => setShowAssignModal(false),
          <>
            <input
              className="w-full border p-2 rounded text-black"
              value={selectedReport.id}
              readOnly
            />
            <input
              className="w-full border p-2 rounded text-black"
              value={selectedReport.category}
              readOnly
            />
            <input
              className="w-full border p-2 rounded text-black"
              value={selectedReport.location}
              readOnly
            />{" "}
            <select
              className="w-full border p-2 rounded text-black"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            >
              <option value="">Select Department</option>
              <option>Municipal Corporation</option>
              <option>Police Department</option>
              <option>Fire & Emergency Services</option>
              <option>Electricity & Gas Departments</option>
              <option>Public Works Department (PWD)</option>
            </select>
            <div className="mb-2">
              <label className="block text-sm font-medium mb-1">Status</label>
              <select
                className="w-full border p-2 rounded text-black"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
              </select>
            </div>
            <input
              type="text"
              className="w-full border p-2 rounded text-black"
              placeholder="Instruction"
              value={instruction}
              onChange={(e) => setInstruction(e.target.value)}
            />
          </>
        )}
      {showEditModal &&
        renderModal(
          "Edit Task",
          "Update Task",
          handleUpdateTask,
          () => setShowEditModal(false),
          <>
            {" "}
            <input
              className="w-full border p-2 rounded text-black"
              value={selectedTask.id}
              readOnly
            />
            <input
              className="w-full border p-2 rounded text-black"
              value={selectedTask.category}
              readOnly
            />
            <input
              className="w-full border p-2 rounded text-black"
              value={selectedTask.location}
              readOnly
            />
            <select
              className="w-full border p-2 rounded text-black"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            >
              <option value="">Select Department</option>
              <option>Municipal Corporation</option>
              <option>Police Department</option>
              <option>Fire & Emergency Services</option>
              <option>Electricity & Gas Departments</option>
              <option>Public Works Department (PWD)</option>
            </select>
            <div className="mb-2">
              <label className="block text-sm font-medium mb-1">Status</label>
              <select
                className="w-full border p-2 rounded text-black"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
              </select>
            </div>
            <input
              type="text"
              className="w-full border p-2 rounded text-black"
              placeholder="Instruction"
              value={instruction}
              onChange={(e) => setInstruction(e.target.value)}
            />
          </>
        )}
      {showDeleteModal &&
        renderModal(
          "Confirm Deletion",
          "Yes, Delete",
          confirmDeleteTask,
          () => setShowDeleteModal(false),
          <p>
            Are you sure you want to delete this task? This action cannot be
            undone.
          </p>
        )}
      {/* History Table */}
      <section className="text-black">
        <h3 className="text-xl font-bold underline mb-4 text-black-900">
          Task History
        </h3>
        <div className="overflow-auto">
          <table className="min-w-full border text-sm bg-white shadow rounded">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2">Report ID</th>
                <th className="border p-2">Issue Type</th>
                <th className="border p-2">Location</th>
                <th className="border p-2">Status</th>
                <th className="border p-2">Assigned To</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {taskHistory.map((task) => (
                <tr key={task.id}>
                  <td className="border p-2">{task.id}</td>
                  <td className="border p-2">{task.category}</td>
                  <td className="border p-2">{task.location}</td>
                  <td className="border p-2">{task.status}</td>
                  <td className="border p-2">{task.assigned_to}</td>
                  <td className="border p-2 space-x-2">
                    {task.status === "In Progress" ? (
                      <button
                        className="text-green-700 hover:underline"
                        onClick={() => handleMarkDone(task)}
                      >
                        Mark Done
                      </button>
                    ) : (
                      <span className="text-gray-500">Completed</span>
                    )}
                    <button
                      className="text-blue-600 hover:underline"
                      onClick={() => handleEditTask(task)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-400 hover:underline"
                      onClick={() => handleDeleteTask(task)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      {/* All Reports Table */}
      <section className="mt-10 text-black">
        <h3 className="text-xl font-bold underline mb-4 text-black-900">
          All Reports
        </h3>
        <div className="mb-4">
          <div className="flex items-center max-w-md mx-auto bg-white rounded-lg border shadow-sm">
            {" "}
            <input
              type="text"
              placeholder="Search by Report ID or Title..."
              value={allReportsSearchQuery}
              onChange={(e) => setAllReportsSearchQuery(e.target.value)}
              className="w-full px-4 py-2 rounded-lg text-gray-700 focus:outline-none"
            />
            <div className="px-4 py-2 bg-gray-100 border-l">
              <svg
                className="w-6 h-6 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        </div>
        <div className="overflow-auto">
          <table className="min-w-full border text-sm bg-white shadow rounded">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2">Report ID</th>
                <th className="border p-2">Reporter's Name</th>
                <th className="border p-2">Title</th>
                <th className="border p-2">Description</th>
                <th className="border p-2">Issue Type</th>
                <th className="border p-2">Status</th>
                <th className="border p-2">Date</th>
                <th className="border p-2">Location</th>
                <th className="border p-2">Assigned To</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="10" className="p-5 text-center">
                    <div className="flex justify-center items-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                      <span className="ml-2">Loading reports...</span>
                    </div>
                  </td>
                </tr>
              ) : currentReports.length === 0 ? (
                <tr>
                  <td colSpan="10" className="p-5 text-center">
                    No reports found
                  </td>
                </tr>
              ) : (
                currentReports.map((report, index) => (
                  <tr key={report.id} className="border-t hover:bg-gray-50">
                    <td className="border p-2">{report.id}</td>
                    <td className="border p-2">
                      {report.reporterName || "N/A"}
                    </td>
                    <td className="border p-2">
                      {report.title?.length > 30
                        ? `${report.title.substring(0, 30)}...`
                        : report.title || "No Title"}
                    </td>
                    <td className="border p-2">
                      {report.description?.length > 50
                        ? `${report.description.substring(0, 50)}...`
                        : report.description || "No Description"}
                    </td>
                    <td className="border p-2">{report.category}</td>
                    <td className="border p-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          report.status?.toLowerCase() === "solved"
                            ? "bg-green-100 text-green-800"
                            : report.status?.toLowerCase() === "in progress"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {report.status || "Unknown"}
                      </span>
                    </td>
                    <td className="border p-2">{report.date}</td>
                    <td className="border p-2">
                      {report.location ? (
                        <button
                          onClick={() => openInGoogleMaps(report.location)}
                          className="text-blue-600 hover:underline"
                        >
                          View Map
                        </button>
                      ) : (
                        "N/A"
                      )}
                    </td>
                    <td className="border p-2">{report.assigned_to || "-"}</td>
                    <td className="border p-2 space-x-2">
                      <button
                        onClick={() => openReportModal(report)}
                        className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-xs"
                      >
                        Details
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {/* Pagination for Reports Table */}
          {filteredReports.length > 0 ? (
            <div className="flex justify-center mt-6">
              <div className="flex items-center space-x-1">
                <button
                  onClick={() =>
                    reportsCurrentPage > 1 &&
                    paginateReports(reportsCurrentPage - 1)
                  }
                  disabled={reportsCurrentPage === 1}
                  className={`px-4 py-2 border rounded-l-md ${
                    reportsCurrentPage === 1
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-white text-gray-700 hover:bg-blue-50"
                  }`}
                >
                  Previous
                </button>

                {Array.from(
                  { length: Math.min(5, totalReportsPages) },
                  (_, i) => {
                    const pageNumber = i + 1;
                    return (
                      <button
                        key={i}
                        onClick={() => paginateReports(pageNumber)}
                        className={`px-4 py-2 border ${
                          reportsCurrentPage === pageNumber
                            ? "bg-blue-500 text-white"
                            : "bg-white text-gray-700 hover:bg-blue-50"
                        }`}
                      >
                        {pageNumber}
                      </button>
                    );
                  }
                )}

                <button
                  onClick={() =>
                    reportsCurrentPage < totalReportsPages &&
                    paginateReports(reportsCurrentPage + 1)
                  }
                  disabled={reportsCurrentPage === totalReportsPages}
                  className={`px-4 py-2 border rounded-r-md ${
                    reportsCurrentPage === totalReportsPages
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-white text-gray-700 hover:bg-blue-50"
                  }`}
                >
                  Next
                </button>
              </div>
            </div>
          ) : null}

          {/* Showing entries info for Reports */}
          <div className="text-sm text-gray-500 mt-3 text-center">
            Showing {indexOfFirstReport + 1} to{" "}
            {Math.min(indexOfLastReport, filteredReports.length)} of{" "}
            {filteredReports.length} entries
          </div>
        </div>
      </section>{" "}
      {/* Report Details Modal */}
      {showReportModal && selectedReportDetails && (
        <div className="fixed inset-0 text-black bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-semibold">
                {selectedReportDetails.title || "Report Details"}
              </h3>
              <button
                onClick={() => {
                  setShowReportModal(false);
                  setActiveImageIndex(0);
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            <hr className="my-4" />

            {selectedReportDetails.images?.length > 0 && (
              <div className="relative w-full h-64 mb-6">
                <img
                  src={selectedReportDetails.images[activeImageIndex]}
                  alt={`Report Image ${activeImageIndex + 1}`}
                  className="w-full h-full object-contain rounded-lg"
                />
                {selectedReportDetails.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-r"
                    >
                      ←
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-l"
                    >
                      →
                    </button>
                    <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
                      {selectedReportDetails.images.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setActiveImageIndex(index)}
                          className={`w-2 h-2 rounded-full ${
                            index === activeImageIndex
                              ? "bg-white"
                              : "bg-white bg-opacity-50"
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}

            <div className="mt-4 space-y-3">
              <p>
                <span className="font-semibold">Reporter:</span>{" "}
                {selectedReportDetails.reporterName || "N/A"}
              </p>
              <p>
                <span className="font-semibold">Status:</span>{" "}
                {selectedReportDetails.status}
              </p>
              <p>
                <span className="font-semibold">Issue Type:</span>{" "}
                {selectedReportDetails.category}
              </p>
              <p>
                <span className="font-semibold">Date:</span>{" "}
                {selectedReportDetails.date}
              </p>
              <p>
                <span className="font-semibold">Description:</span>{" "}
                {selectedReportDetails.description ||
                  "No description available"}
              </p>
              <p>
                <span className="font-semibold">Assigned To:</span>{" "}
                {selectedReportDetails.assigned_to || "Not assigned"}
              </p>

              {selectedReportDetails.location && (
                <div className="mt-4">
                  <p className="font-semibold mb-2">Location:</p>
                  <button
                    onClick={() =>
                      openInGoogleMaps(selectedReportDetails.location)
                    }
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    View on Google Maps
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {/* Footer */}
      <footer className="text-center text-sm text-gray-700 mt-8">
        © 2025 civicconect.com | Developed by Wasif & Laiba
      </footer>
    </main>
  );
}
