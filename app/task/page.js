'use client'; // This line marks the component as a client component

import { useState, useEffect } from 'react';
import { db } from '/firebase';
import {
  collection,
  query,
  where,
  onSnapshot,
  doc,
  updateDoc,
} from 'firebase/firestore';

export default function TaskPage() {
  const [pendingReports, setPendingReports] = useState([]);
  const [taskHistory, setTaskHistory] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [department, setDepartment] = useState('');
  const [instruction, setInstruction] = useState('');

  // Fetch pending reports
  useEffect(() => {
    const q = query(collection(db, 'reports'), where('status', '==', 'pending'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const reports = snapshot.docs.map((doc) => {
        const data = doc.data();
        const timestamp = data.timestamp ? data.timestamp.toDate() : null; // convert timestamp to Date
        return {
          id: doc.id,
          ...data,
          date: timestamp ? timestamp.toLocaleDateString() : '', // Format the date
        };
      });
      setPendingReports(reports);
    });
    return () => unsubscribe();
  }, []);

  // Fetch task history (assigned reports)
  useEffect(() => {
    const q = query(
      collection(db, 'reports'),
      where('status', 'in', ['In Progress', 'Done'])
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const history = snapshot.docs.map((doc) => {
        const data = doc.data();
        const timestamp = data.timestamp ? data.timestamp.toDate() : null; // convert timestamp to Date
        return {
          id: doc.id,
          ...data,
          date: timestamp ? timestamp.toLocaleDateString() : '', // Format the date
        };
      });
      setTaskHistory(history);
    });
    return () => unsubscribe();
  }, []);

  // Assign task
  const handleAssign = async () => {
    if (!selectedReport || !department) {
      alert('Please select a report and department.');
      return;
    }

    const reportRef = doc(db, 'reports', selectedReport.id);
    await updateDoc(reportRef, {
      assigned_to: department,
      instruction: instruction,
      status: 'In Progress',
    });

    alert('Task assigned successfully!');
    setSelectedReport(null);
    setDepartment('');
    setInstruction('');
  };

  return (
    <main className="bg-[#f5f7fb] min-h-screen p-8">
      <h2 className="text-2xl font-semibold text-center mb-6">Civic Connect - Assign Task Panel</h2>

      {/* Reports Overview */}
      <section className="mb-10">
        <h3 className="text-lg font-bold underline mb-4 text-blue-900">Reports Overview</h3>
        <table className="min-w-full border text-sm bg-white shadow rounded">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Report ID</th>
              <th className="border p-2">Issue Type</th>
              <th className="border p-2">Location</th>
              <th className="border p-2">Submitted Date</th>
              <th className="border p-2">Current Status</th>
              <th className="border p-2">Assign Button</th>
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
            className="bg-blue-500 text-white px-3 py-1 rounded"
            onClick={() => setSelectedReport(report)}
          >
          Assign
          </button>
          </td>
          </tr>
          ))}
          </tbody>

        </table>
      </section>

      {/* Assign Task */}
      {selectedReport && (
        <section className="mb-10">
          <h3 className="text-lg font-semibold mb-4">Assign Task</h3>
          <div className="bg-white p-6 rounded shadow max-w-xl">
            <div className="space-y-4">
              <input
                type="text"
                className="w-full border p-2 rounded"
                value={selectedReport.id}
                readOnly
              />
              <input
                type="text"
                className="w-full border p-2 rounded"
                value={selectedReport.category}
                readOnly
              />
              <input
                type="text"
                className="w-full border p-2 rounded"
                value={selectedReport.location}
                readOnly
              />
              <select
                className="w-full border p-2 rounded"
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
              <input
                type="text"
                className="w-full border p-2 rounded"
                placeholder="Instruction"
                value={instruction}
                onChange={(e) => setInstruction(e.target.value)}
              />
              <button
                className="w-full bg-blue-600 text-white py-2 rounded"
                onClick={handleAssign}
              >
                Assign
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Task History */}
      <section>
        <h3 className="text-lg font-semibold mb-4">Task History</h3>
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
              {taskHistory.map((task, index) => (
                <tr key={index}>
                  <td className="border p-2">{task.id}</td>
                  <td className="border p-2">{task.category}</td>
                  <td className="border p-2">{task.location}</td>
                  <td className="border p-2">{task.status}</td>
                  <td className="border p-2">{task.assigned_to}</td>
                  <td className="border p-2">
                    {task.status === 'In Progress' ? (
                      <button
                        className="bg-green-500 text-white px-3 py-1 rounded"
                        onClick={async () => {
                          const reportRef = doc(db, 'reports', task.id);
                          await updateDoc(reportRef, { status: 'Done' });
                          alert('Task marked as Done!');
                        }}
                      >
                        Mark Done
                      </button>
                    ) : (
                      <span className="text-gray-500">Completed</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center text-sm text-gray-600 mt-8">
        © 2025 civicconect.com | Powered by civicconect.com
      </footer>
    </main>
  );
}
