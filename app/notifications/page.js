export default function NotificationPage() {
    return (
      <main className="bg-[#f5f7fb] min-h-screen p-8">
        <h2 className="text-2xl font-semibold text-center mb-6">Civic Connect - Notification Panel</h2>
  
        {/* Search & Filter */}
        <div className="flex flex-col md:flex-row items-center gap-4 justify-center mb-6">
          <input
            type="text"
            placeholder="Search Here..."
            className="border p-2 rounded w-full md:w-1/2"
          />
          <button className="bg-blue-600 text-white px-4 py-2 rounded">🔍</button>
        </div>
  
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          <button className="bg-[#d7d5fa] px-4 py-2 rounded">Unread</button>
          <button className="bg-[#f9d4d3] px-4 py-2 rounded">Urgent</button>
          <button className="bg-[#d4f9e3] px-4 py-2 rounded">Updates</button>
          <button className="bg-[#f5fbd4] px-4 py-2 rounded">All Notifications</button>
        </div>
  
        {/* Notification List */}
        <section className="mb-10 max-w-3xl mx-auto">
          <h3 className="text-xl font-semibold mb-4">Notification</h3>
          {[
            { icon: '🔄', title: 'Theft and Crimes', status: 'Report is in Review', date: '21/3/2025' },
            { icon: '💡', title: 'Street Light Broker', status: 'Issue was resolved', date: '21/3/2025' },
            { icon: '🚰', title: 'Water Supply', status: 'Issue was declined', date: '21/3/2025' },
            { icon: '🔄', title: 'Theft and Crimes', status: 'Report is in Review', date: '21/3/2025' },
          ].map((item, index) => (
            <div key={index} className="bg-white border flex justify-between items-center p-4 rounded mb-3 shadow">
              <div className="flex items-start gap-4">
                <div className="text-3xl">{item.icon}</div>
                <div>
                  <p className="font-bold">{item.title}</p>
                  <p className="text-sm">{item.status}</p>
                  <p className="text-xs text-gray-500">{item.date}</p>
                </div>
              </div>
              <button className="text-red-600 text-lg">🗑️</button>
            </div>
          ))}
          <div className="text-right mt-2 text-blue-600 cursor-pointer hover:underline">Learn more →</div>
        </section>
  
        {/* Live Updates */}
        <section className="max-w-3xl mx-auto">
          <h3 className="text-xl font-semibold mb-4">Live Updates</h3>
          {[
            {
              icon: '🚧',
              location: 'Main Street & 5th Avenue',
              time: '10:30 AM',
              status: 'Traffic Delays Expected',
            },
            {
              icon: '🌡️',
              location: '[Your City]',
              time: 'March 25, 2025 | 9:00 AM',
              status: 'Current Temperature: 28°C',
            },
            {
              icon: '🚧',
              location: 'Main Street & 5th Avenue',
              time: '10:30 AM',
              status: 'Traffic Delays Expected',
            },
          ].map((item, index) => (
            <div key={index} className="bg-white border p-4 rounded mb-3 shadow flex items-start gap-4">
              <div className="text-2xl">{item.icon}</div>
              <div>
                <p className="text-sm">📍 Location: {item.location}</p>
                <p className="text-sm">🕒 Time: {item.time}</p>
                <p className="text-sm">📌 Status: {item.status}</p>
              </div>
              <div className="ml-auto text-blue-600 cursor-pointer hover:underline text-sm">Learn more →</div>
            </div>
          ))}
  
          {/* Pagination */}
          <div className="flex justify-center items-center mt-6 gap-4 text-blue-600">
            <button>1</button>
            <button className="underline">2</button>
            <button>3</button>
            <span className="cursor-pointer hover:underline">Learn more →</span>
          </div>
        </section>
  
        {/* Footer */}
        <footer className="text-center text-sm text-gray-600 mt-10">
          © 2025 civicconect.com | Powered by civicconect.com
        </footer>
      </main>
    );
  }
  