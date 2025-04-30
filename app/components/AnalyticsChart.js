'use client';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '/firebase'; // Make sure this path is correct

const COLORS = ['#3b82f6', '#9333ea', '#f97316'];

export default function AnalyticsChart() {
  const [chartData, setChartData] = useState([
    { name: 'Resolved', value: 0 },
    { name: 'Pending', value: 0 },
    { name: 'Total', value: 0 },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "reports")); // Adjust collection name as per your Firestore setup
      let resolved = 0;
      let pending = 0;
      let total = 0;

      querySnapshot.forEach((doc) => {
        total++;
        if (doc.data().status === 'resolved') {
          resolved++;
        } else if (doc.data().status === 'pending') {
          pending++;
        }
      });

      setChartData([
        { name: 'Resolved', value: resolved },
        { name: 'Pending', value: pending },
        { name: 'Total', value: total },
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
