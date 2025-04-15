export default function TaskPage() {
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
              {[
                { id: '1021', type: 'Road & traffic light repairs', location: 'Main Street', date: '21/3/2025' },
                { id: '1022', type: 'Repairing gas pipelines', location: 'Park Avenue', date: '22/3/2025' },
                { id: '1023', type: 'Investigating suspicious activities', location: 'Main Street', date: '23/3/2025' },
              ].map((item) => (
                <tr key={item.id}>
                  <td className="border p-2 font-bold">{item.id}</td>
                  <td className="border p-2">{item.type}</td>
                  <td className="border p-2">{item.location}</td>
                  <td className="border p-2">{item.date}</td>
                  <td className="border p-2">Pending</td>
                  <td className="border p-2">
                    <button className="bg-blue-500 text-white px-3 py-1 rounded">Assign</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
  
        {/* Assign Task */}
        <section className="mb-10">
          <h3 className="text-lg font-semibold mb-4">Assign Task</h3>
          <div className="bg-white p-6 rounded shadow max-w-xl">
            <div className="space-y-4">
              <input type="text" className="w-full border p-2 rounded" placeholder="Report ID (Read-only)" readOnly />
              <input type="text" className="w-full border p-2 rounded" placeholder="Issue Type (Read-only)" readOnly />
              <input type="text" className="w-full border p-2 rounded" placeholder="Location (Read-only)" readOnly />
              <select className="w-full border p-2 rounded">
                <option>Selecting a Department</option>
                <option>Municipal Corporation</option>
                <option>Police Department</option>
                <option>Fire & Emergency Services</option>
                <option>Electricity & Gas Departments</option>
                <option>Public Works Department (PWD)</option>
              </select>
              <input type="text" className="w-full border p-2 rounded" placeholder="Instruction" />
              <button className="w-full bg-blue-600 text-white py-2 rounded">Assign</button>
            </div>
          </div>
        </section>
  
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
                {[
                  ['1021', 'Road & traffic light repairs', 'Main Street', 'Pending', 'Municipal Corporation'],
                  ['1022', 'Investigating suspicious activities', 'Park Avenue', 'In Progress', 'Police Department'],
                  ['1023', 'Rescue operations', 'Main Street', 'In Progress', 'Fire & Emergency Services'],
                  ['1024', 'Repairing gas pipelines', 'Park Avenue', 'Pending', 'Electricity & Gas Departments'],
                  ['1025', 'Drainage & water supply', 'Main Street', 'Pending', 'Public Works Department (PWD)'],
                ].map(([id, type, loc, status, assigned], index) => (
                  <tr key={index}>
                    <td className="border p-2">{id}</td>
                    <td className="border p-2">{type}</td>
                    <td className="border p-2">{loc}</td>
                    <td className="border p-2">{status}</td>
                    <td className="border p-2">{assigned}</td>
                    <td className="border p-2">
                      <button className={`px-3 py-1 rounded ${status === 'In Progress' ? 'bg-green-500 text-white' : 'bg-blue-500 text-white'}`}>
                        {status === 'In Progress' ? 'Mark Done' : 'Assign'}
                      </button>
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
  