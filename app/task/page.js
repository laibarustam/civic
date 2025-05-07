'use client';

import { useState, useEffect } from 'react';
import { db } from '/firebase';
import {
  collection,
  query,
  where,
  onSnapshot,
  doc,
  updateDoc,
  setDoc,
  deleteDoc,
} from 'firebase/firestore';

export default function TaskPage() {
  const [pendingReports, setPendingReports] = useState([]);
  const [taskHistory, setTaskHistory] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [department, setDepartment] = useState('');
  const [instruction, setInstruction] = useState('');
  const [loading, setLoading] = useState(true);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [allReports, setAllReports] = useState([]);

useEffect(() => {
  const q = query(collection(db, 'reports'));
  return onSnapshot(q, (snapshot) => {
    const all = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        date: data.timestamp ? data.timestamp.toDate().toLocaleDateString() : '',
      };
    });
    setAllReports(all);
  });
}, []);


  useEffect(() => {
    const q = query(collection(db, 'reports'), where('status', '==', 'pending'));
    return onSnapshot(q, (snapshot) => {
      const reports = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          date: data.timestamp ? data.timestamp.toDate().toLocaleDateString() : '',
        };
      });
      setPendingReports(reports);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    const q = query(collection(db, 'reports'), where('status', 'in', ['In Progress', 'Done']));
    return onSnapshot(q, (snapshot) => {
      const history = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          date: data.timestamp ? data.timestamp.toDate().toLocaleDateString() : '',
        };
      });
      setTaskHistory(history);
    });
  }, []);

  const handleAssign = async () => {
    if (!selectedReport || !department) return alert('Please select a report and department.');
    await updateDoc(doc(db, 'reports', selectedReport.id), {
      assigned_to: department,
      instruction,
      status: 'In Progress',
    });
    await setDoc(doc(db, 'assigned_reports', selectedReport.id), {
      ...selectedReport,
      assigned_to: department,
      instruction,
      status: 'In Progress',
      assignedAt: new Date(),
    });
    alert('Task assigned!');
    setShowAssignModal(false);
    setSelectedReport(null);
    setDepartment('');
    setInstruction('');
  };

  const handleMarkDone = async (task) => {
    await updateDoc(doc(db, 'reports', task.id), { status: 'Done' });
    await setDoc(doc(db, 'task_history', task.id), {
      ...task,
      status: 'Done',
      completedAt: new Date(),
      timestamp: new Date(),
    });
    alert('Task marked as Done!');
  };

  const handleEditTask = (task) => {
    setSelectedTask(task);
    setDepartment(task.assigned_to || '');
    setInstruction(task.instruction || '');
    setShowEditModal(true);
  };

  const handleDeleteTask = (task) => {
    setSelectedTask(task);
    setShowDeleteModal(true);
  };

  const confirmDeleteTask = async () => {
    if (selectedTask) {
      await deleteDoc(doc(db, 'reports', selectedTask.id));
      await deleteDoc(doc(db, 'task_history', selectedTask.id));
      alert('Task deleted!');
    }
    setShowDeleteModal(false);
  };

  const handleUpdateTask = async () => {
    if (!selectedTask || !department) return alert('Please select a department.');
    await updateDoc(doc(db, 'reports', selectedTask.id), {
      assigned_to: department,
      instruction,
      status: 'In Progress',
    });
    await setDoc(doc(db, 'task_history', selectedTask.id), {
      ...selectedTask,
      assigned_to: department,
      instruction,
      status: 'In Progress',
      updatedAt: new Date(),
    });
    alert('Task updated!');
    setShowEditModal(false);
    setSelectedTask(null);
    setDepartment('');
    setInstruction('');
  };

  const renderModal = (title, confirmText, onConfirm, onCancel, children) => (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg max-w-xl w-full">
        <h3 className="text-lg font-semibold mb-4">{title}</h3>
        <div className="space-y-4">{children}</div>
        <div className="flex justify-between items-center mt-4">
          <button className="bg-blue-600 text-white px-4 py-2 rounded w-full" onClick={onConfirm}>
            {confirmText}
          </button>
          <button className="bg-blue-100 text-blue-800 px-4 py-2 rounded w-24 ml-4" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <main className="bg-[#f5f7fb] min-h-screen p-8">
      <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">Civic Connect - Assign Task Panel</h2>

      {/* Reports Table */}
      <section className="mb-10">
        <h3 className="text-xl font-bold underline mb-4 text-black-900">Reports Overview</h3>
        {loading ? (
          <div className="text-center text-gray-600">Loading reports...</div>
        ) : pendingReports.length === 0 ? (
          <div className="text-center text-gray-600">No pending reports available.</div>
        ) : (
          <table className="min-w-full border text-sm bg-white shadow rounded">
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
            <tbody>
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
          'Assign Task',
          'Assign Task',
          handleAssign,
          () => setShowAssignModal(false),
          <>
            <input className="w-full border p-2 rounded" value={selectedReport.id} readOnly />
            <input className="w-full border p-2 rounded" value={selectedReport.category} readOnly />
            <input className="w-full border p-2 rounded" value={selectedReport.location} readOnly />
            <select className="w-full border p-2 rounded" value={department} onChange={(e) => setDepartment(e.target.value)}>
              <option value="">Select Department</option>
              <option>Municipal Corporation</option>
              <option>Police Department</option>
              <option>Fire & Emergency Services</option>
              <option>Electricity & Gas Departments</option>
              <option>Public Works Department (PWD)</option>
            </select>
            <input
              type="text"
              className="w-full border p-2 rounded"
              placeholder="Instruction"
              value={instruction}
              onChange={(e) => setInstruction(e.target.value)}
            />
          </>
        )}

      {showEditModal &&
        renderModal(
          'Edit Task',
          'Update Task',
          handleUpdateTask,
          () => setShowEditModal(false),
          <>
            <input className="w-full border p-2 rounded" value={selectedTask.id} readOnly />
            <input className="w-full border p-2 rounded" value={selectedTask.category} readOnly />
            <input className="w-full border p-2 rounded" value={selectedTask.location} readOnly />
            <select className="w-full border p-2 rounded" value={department} onChange={(e) => setDepartment(e.target.value)}>
              <option value="">Select Department</option>
              <option>Municipal Corporation</option>
              <option>Police Department</option>
              <option>Fire & Emergency Services</option>
              <option>Electricity & Gas Departments</option>
              <option>Public Works Department (PWD)</option>
            </select>
            <input
              type="text"
              className="w-full border p-2 rounded"
              placeholder="Instruction"
              value={instruction}
              onChange={(e) => setInstruction(e.target.value)}
            />
          </>
        )}

      {showDeleteModal &&
        renderModal(
          'Confirm Deletion',
          'Yes, Delete',
          confirmDeleteTask,
          () => setShowDeleteModal(false),
          <p>Are you sure you want to delete this task? This action cannot be undone.</p>
        )}

      {/* History Table */}
      <section>
        <h3 className="text-xl font-bold underline mb-4 text-black-900">Task History</h3>
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
                    {task.status === 'In Progress' ? (
                      <button className="text-blue-600 hover:underline" onClick={() => handleMarkDone(task)}>
                        Mark Done
                      </button>
                    ) : (
                      <span className="text-gray-500">Completed</span>
                    )}
                    <button className="text-blue-600 hover:underline" onClick={() => handleEditTask(task)}>
                      Edit
                    </button>
                    <button className="text-blue-400 hover:underline" onClick={() => handleDeleteTask(task)}>
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
            <section className="mt-10">
        <h3 className="text-xl font-bold underline mb-4 text-black-900">All Reports</h3>
        <div className="overflow-auto">
          <table className="min-w-full border text-sm bg-white shadow rounded">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2">Report ID</th>
                <th className="border p-2">Issue Type</th>
                <th className="border p-2">Location</th>
                <th className="border p-2">Status</th>
                <th className="border p-2">Assigned To</th>
                <th className="border p-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {allReports.map((report) => (
                <tr key={report.id}>
                  <td className="border p-2">{report.id}</td>
                  <td className="border p-2">{report.category}</td>
                  <td className="border p-2">{report.location}</td>
                  <td className="border p-2">{report.status}</td>
                  <td className="border p-2">{report.assigned_to || '-'}</td>
                  <td className="border p-2">{report.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>


{/* Footer */}
<footer className="text-center text-sm text-gray-700 mt-8">
          © 2025 civicconect.com | Developed by Wasif & Laiba
        </footer>    </main>
  );
}
