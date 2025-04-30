'use client';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '/firebase'; // Make sure this path is correct

export default function ReportsGraph() {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "reports")); // Adjust collection name as per your Firestore setup
      const monthlyData = {};

      querySnapshot.forEach((doc) => {
        const reportDate = new Date(doc.data().timestamp.toDate());
        const month = reportDate.getMonth(); // Get month number (0-11)

        if (!monthlyData[month]) {
          monthlyData[month] = 0;
        }
        monthlyData[month]++;
      });

      // Prepare data for the chart
      const data = Object.keys(monthlyData).map((month) => ({
        name: new Date(2025, month).toLocaleString('default', { month: 'short' }), // Convert month number to name
        Reports: monthlyData[month],
      }));

      setChartData(data);
    };

    fetchData();
  }, []);

  return (
    <div className="w-full h-64">
      <ResponsiveContainer>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="Reports" fill="#4f46e5" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
