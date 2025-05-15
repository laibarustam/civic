"use client";
import React, { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  onSnapshot,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { db, auth } from "/firebase";

const OfficerTasksPage = () => {
  const [tasks, setTasks] = useState([]);
  const [officerDepartment, setOfficerDepartment] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleView = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTask(null);
  };

  useEffect(() => {
    const fetchDepartment = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          const docRef = doc(db, "user_admin", user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const department = docSnap.data().department;
            setOfficerDepartment(department);
          } else {
            console.error("User document not found");
            setLoading(false);
          }
        } catch (error) {
          console.error("Error fetching officer department: ", error);
          setLoading(false);
        }
      }
    };

    fetchDepartment();
  }, []);

  useEffect(() => {
    if (!officerDepartment) return;

    const q = query(
      collection(db, "reports"),
      where("assigned_to", "==", officerDepartment)
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const tasksData = [];
        snapshot.forEach((doc) => {
          tasksData.push({ id: doc.id, ...doc.data() });
        });
        setTasks(tasksData);
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching tasks: ", error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [officerDepartment]);

  const markAsSolved = async (taskId) => {
    try {
      await updateDoc(doc(db, "reports", taskId), { status: "solved" });
      alert("Task marked as solved");
    } catch (error) {
      alert("Error updating task status: " + error.message);
    }
  };

  const rejectTask = async (taskId) => {
    try {
      await updateDoc(doc(db, "reports", taskId), { status: "rejected" });
      alert("Task rejected");
    } catch (error) {
      alert("Error updating task status: " + error.message);
    }
  };

  if (loading) return <p className="p-4">Loading tasks...</p>;
  if (!officerDepartment)
    return <p className="p-4">No department assigned to your account.</p>;
  if (tasks.length === 0)
    return <p className="p-4">No tasks assigned to {officerDepartment} yet.</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">
       
      </h2>
      <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">
         Assigned Tasks for {officerDepartment}
      </h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border p-2">Report ID</th>
            <th className="border p-2">Reporter's Name</th>
            <th className="border p-2">Title</th>
            <th className="border p-2">Description</th>
            <th className="border p-2">Location</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id} className="border hover:bg-gray-50">
              <td className="border p-2">{task.id}</td>
              <td className="border p-2">{task.reporterName || "N/A"}</td>
              <td className="border p-2">
                {task.title?.length > 30
                  ? `${task.title.substring(0, 30)}...`
                  : task.title || "No Title"}
              </td>
              <td className="border p-2">
                {task.description?.length > 50
                  ? `${task.description.substring(0, 50)}...`
                  : task.description || "No Description"}
              </td>
              <td className="border p-2">
                {task.location ? (
                  <button
                    onClick={() =>
                      window.open(
                        `https://www.google.com/maps?q=${task.location}`,
                        "_blank"
                      )
                    }
                    className="text-blue-600 hover:underline"
                  >
                    View Map
                  </button>
                ) : (
                  "N/A"
                )}
              </td>
              <td className="border p-2 capitalize">{task.status}</td>
              <td className="border p-2 space-x-2">
                <button
                  onClick={() => handleView(task)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded"
                >
                  View
                </button>
                {task.status !== "solved" && task.status !== "rejected" ? (
                  <>
                    <button
                      className="text-green-600 hover:underline"
                      onClick={() => markAsSolved(task.id)}
                    >
                      Mark as Solved
                    </button>
                    <button
                      className="text-red-600 hover:underline"
                      onClick={() => rejectTask(task.id)}
                    >
                      Reject
                    </button>
                  </>
                ) : (
                  <span className="italic text-gray-500">
                    {task.status === "solved" ? "Solved" : "Rejected"}
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && selectedTask && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Task Details</h2>
            <p><strong>Report ID:</strong> {selectedTask.id}</p>
            <p><strong>Reporter Name:</strong> {selectedTask.reporterName || "N/A"}</p>
            <p><strong>Title:</strong> {selectedTask.title}</p>
            <p><strong>Description:</strong> {selectedTask.description}</p>
            <p><strong>Location:</strong> {selectedTask.location}</p>
            <p><strong>Status:</strong> {selectedTask.status}</p>

            <div className="mt-6 flex justify-end">
              <button
                onClick={closeModal}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OfficerTasksPage;
