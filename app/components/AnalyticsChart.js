"use client";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "/firebase"; // Make sure this path is correct

const COLORS = ["#3b82f6", "#9333ea", "#f97316", "#fbbf24"]; // Added yellow for "In Progress"

export default function AnalyticsChart() {
  const [chartData, setChartData] = useState([
    { name: "done", value: 0 },
    { name: "Pending", value: 0 },
    { name: "Total", value: 0 },
    { name: "In Progress", value: 0 },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "reports")); // Adjust collection name as per your Firestore setup
      let resolved = 0;
      let pending = 0;
      let total = 0;
      let inProgress = 0; // Added variable for inProgress

      querySnapshot.forEach((doc) => {
        total++;
        const status = doc.data().status?.toLowerCase(); // Convert to lowercase for consistency

        if (status === "solved") {
          resolved++; // Increment resolved for "done" status
        } else if (status === "pending") {
          pending++; // Increment pending for "pending" status
        } else if (status === "in progress") {
          inProgress++; // Increment inProgress for "in progress" status
        }
      });

      setChartData([
        { name: "done", value: resolved },
        { name: "Pending", value: pending },
        { name: "Total", value: total },
        { name: "In Progress", value: inProgress }, // Add In Progress status
      ]);
    };

    fetchData();
  }, []);

  return (
    <div className="w-full h-64">
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            label
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
