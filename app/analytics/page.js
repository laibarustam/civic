// app/analytics/page.js
import AnalyticsChart from '../components/AnalyticsChart';
import ReportsGraph from '../components/ReportsGraph';
import { FaChartBar, FaCheckCircle, FaExclamationTriangle, FaUsers } from 'react-icons/fa';

export default function Analytics() {
    return (
      <main className="min-h-screen bg-[#f5f7fb] p-8">
        <h2 className="text-2xl font-semibold text-center mb-8">Civic Connect - Analytics and Insights</h2>
  
        {/* Overview Boxes with Icons and Hover Effects */}
        <section className="grid grid-cols-4 gap-4 mb-8">
                <div className="bg-green-200 p-4 rounded text-center shadow hover:bg-green-300 hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                    <FaChartBar className="text-4xl mb-4 mx-auto" />
                    <p className="font-semibold text-lg">Total Reports</p>
                    <p className="text-xl font-bold">(25)</p>
                </div>
                <div className="bg-blue-200 p-4 rounded text-center shadow hover:bg-blue-300 hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                    <FaCheckCircle className="text-4xl mb-4 mx-auto" />
                    <p className="font-semibold text-lg">Resolved Reports</p>
                    <p className="text-xl font-bold">(08)</p>
                </div>
                <div className="bg-yellow-200 p-4 rounded text-center shadow hover:bg-yellow-300 hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                    <FaExclamationTriangle className="text-4xl mb-4 mx-auto" />
                    <p className="font-semibold text-lg">Pending Reports</p>
                    <p className="text-xl font-bold">(12)</p>
                </div>
                <div className="bg-purple-200 p-4 rounded text-center shadow hover:bg-purple-300 hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                    <FaUsers className="text-4xl mb-4 mx-auto" />
                    <p className="font-semibold text-lg">Active Users</p>
                    <p className="text-xl font-bold">(102)</p>
                </div>
            </section>

        {/* Graph Section */}
        <section className="bg-white p-6 mb-8 rounded shadow">
          <h3 className="text-lg font-semibold mb-4">Graphs</h3>
          <ReportsGraph />

        </section>
  
{/* Pie Chart Section */}
<section className="bg-white p-6 mb-8 rounded shadow">
  <h3 className="text-lg font-semibold mb-4">Charts</h3>
  <AnalyticsChart />
  <div className="flex justify-center mt-4 space-x-4 text-sm">
    <div className="flex items-center">
      <span className="w-3 h-3 bg-blue-500 rounded-full mr-2" /> Resolved
    </div>
    <div className="flex items-center">
      <span className="w-3 h-3 bg-purple-500 rounded-full mr-2" /> Pending
    </div>
    <div className="flex items-center">
      <span className="w-3 h-3 bg-orange-400 rounded-full mr-2" /> Total
    </div>
  </div>
</section>

  
        {/* User Engagement Table */}
        <section className="bg-white p-6 rounded shadow">
          <h3 className="text-lg font-semibold mb-4">User Engagement Table</h3>
          <div className="overflow-auto">
            <table className="min-w-full border">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="p-2 border">User</th>
                  <th className="p-2 border">Reports Filed</th>
                  <th className="p-2 border">Resolved Issues</th>
                  <th className="p-2 border">Last Active</th>
                  <th className="p-2 border">Role</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-2 border">John Doe</td>
                  <td className="p-2 border">12</td>
                  <td className="p-2 border">10</td>
                  <td className="p-2 border">Today</td>
                  <td className="p-2 border">Officer</td>
                </tr>
                <tr>
                  <td className="p-2 border">Jane Smith</td>
                  <td className="p-2 border">8</td>
                  <td className="p-2 border">6</td>
                  <td className="p-2 border">Yesterday</td>
                  <td className="p-2 border">Moderator</td>
                </tr>
                <tr>
                  <td className="p-2 border">Alex Brown</td>
                  <td className="p-2 border">20</td>
                  <td className="p-2 border">15</td>
                  <td className="p-2 border">3 Days Ago</td>
                  <td className="p-2 border">Admin</td>
                </tr>
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
  