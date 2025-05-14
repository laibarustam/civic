"use client";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "/firebase"; // Make sure this path is correct

const COLORS = ["#3b82f6", "#9333ea", "#f97316"]; // Adjusted colors for standardized statuses

export default function AnalyticsChart() {
  const [chartData, setChartData] = useState([
    { name: "Solved", value: 0 },
    { name: "Pending", value: 0 },
    { name: "Rejected", value: 0 },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "reports"));
      let solved = 0;
      let pending = 0;
      let rejected = 0;

      querySnapshot.forEach((doc) => {
        const status = doc.data().status?.toLowerCase();

        if (status === "solved") {
          solved++;
        } else if (status === "pending") {
          pending++;
        } else if (status === "rejected") {
          rejected++;
        }
      });

      setChartData([
        { name: "Solved", value: solved },
        { name: "Pending", value: pending },
        { name: "Rejected", value: rejected },
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
