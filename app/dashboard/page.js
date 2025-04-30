import ReportsGraph from '../components/ReportsGraph';
import { FaChartBar, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';

export default function Home() {
  return (
    <div className="flex min-h-screen">
      {/* Main Content */}
      <main className="flex-1 bg-[#f9fafb] p-10 overflow-y-auto">
        {/* Header */}
        <h2 className="text-2xl font-semibold mb-2">Civic Connect - Admin Panel</h2>
        <div className="flex items-center gap-4 mb-10">
          {/* Image Section */}
          <img 
            src="/image1.jpg" 
            alt="User Profile"
            className="w-16 h-16 rounded-full object-cover" 
          />
          <div>
            <p className="text-lg font-semibold">Welcome, Laiba Rustam</p>
            <p className="text-sm text-gray-600">Chief Municipal Office</p>
            <p className="text-sm text-gray-600">Wah Cantt</p>
          </div>
        </div>

{/* Overview Cards */}
<div className="grid grid-cols-3 gap-6 mb-10">
          <div className="bg-green-200 p-6 rounded text-black flex items-center justify-center flex-col hover:bg-green-300 hover:shadow-xl transform hover:scale-105 transition-all duration-300">
            <FaChartBar className="text-4xl mb-4" /> {/* Icon in the center */}
            <h3 className="text-lg font-bold">Total Reports</h3>
            <p className="text-3xl font-semibold mt-2">25</p>
          </div>
          <div className="bg-blue-200 p-6 rounded text-black flex items-center justify-center flex-col hover:bg-blue-300 hover:shadow-xl transform hover:scale-105 transition-all duration-300">
            <FaCheckCircle className="text-4xl mb-4" /> {/* Icon in the center */}
            <h3 className="text-lg font-bold">Resolved Reports</h3>
            <p className="text-3xl font-semibold mt-2">08</p>
          </div>
          <div className="bg-yellow-200 p-6 rounded text-black flex items-center justify-center flex-col hover:bg-yellow-300 hover:shadow-xl transform hover:scale-105 transition-all duration-300">
            <FaExclamationTriangle className="text-4xl mb-4" /> {/* Icon in the center */}
            <h3 className="text-lg font-bold">Pending Reports</h3>
            <p className="text-3xl font-semibold mt-2">12</p>
          </div>
        </div>

        {/* Graph Section */}
        <div className="bg-white p-6 rounded shadow mb-10">
          <h3 className="text-lg font-semibold mb-4">Graphs</h3>
          <ReportsGraph />
        </div>

        {/* Report Table */}
        <div className="bg-white p-6 rounded shadow mb-10">
          <h3 className="text-lg font-semibold mb-4">Report Table</h3>
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-100">
              <tr>
                {["Report ID", "Issue Type", "Location", "Status", "Assigned To", "Actions"].map(header => (
                  <th key={header} className="px-4 py-2 border">{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="px-4 py-2 border">1021</td>
                <td className="px-4 py-2 border">Road & traffic light repairs</td>
                <td className="px-4 py-2 border">Main Street</td>
                <td className="px-4 py-2 border">Pending</td>
                <td className="px-4 py-2 border">Municipal Corporation</td>
                <td className="px-4 py-2 border text-blue-600 hover:underline cursor-pointer">Assign</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2 border">1021</td>
                <td className="px-4 py-2 border">Road & traffic light repairs</td>
                <td className="px-4 py-2 border">Main Street</td>
                <td className="px-4 py-2 border">Pending</td>
                <td className="px-4 py-2 border">Municipal Corporation</td>
                <td className="px-4 py-2 border text-blue-600 hover:underline cursor-pointer">Assign</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2 border">1021</td>
                <td className="px-4 py-2 border">Road & traffic light repairs</td>
                <td className="px-4 py-2 border">Main Street</td>
                <td className="px-4 py-2 border">Pending</td>
                <td className="px-4 py-2 border">Municipal Corporation</td>
                <td className="px-4 py-2 border text-blue-600 hover:underline cursor-pointer">Mark Done</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* User Engagement Table */}
        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-lg font-semibold mb-4">User Engagement Table</h3>
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-100">
              <tr>
                {["User", "Reports Filed", "Resolved Issues", "Last Active", "Role"].map(header => (
                  <th key={header} className="px-4 py-2 border">{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="px-4 py-2 border">John Doe</td>
                <td className="px-4 py-2 border">12</td>
                <td className="px-4 py-2 border">10</td>
                <td className="px-4 py-2 border">Today</td>
                <td className="px-4 py-2 border">Officer</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2 border">John Doe</td>
                <td className="px-4 py-2 border">12</td>
                <td className="px-4 py-2 border">10</td>
                <td className="px-4 py-2 border">Today</td>
                <td className="px-4 py-2 border">Officer</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2 border">John Doe</td>
                <td className="px-4 py-2 border">12</td>
                <td className="px-4 py-2 border">10</td>
                <td className="px-4 py-2 border">Today</td>
                <td className="px-4 py-2 border">Officer</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <footer className="text-center text-sm text-gray-600 mt-8">
          © 2025 civicconect.com | Powered by civicconect.com
        </footer>
      </main>
    </div>
  );
}