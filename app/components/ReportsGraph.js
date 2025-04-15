'use client';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', Reports: 4 },
  { name: 'Feb', Reports: 6 },
  { name: 'Mar', Reports: 3 },
  { name: 'Apr', Reports: 8 },
  { name: 'May', Reports: 5 },
];

export default function ReportsGraph() {
  return (
    <div className="w-full h-64">
      <ResponsiveContainer>
        <BarChart data={data}>
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
