export default function MobilePage() {
  const alerts = [
    {
      title: "Road accident reported",
      location: "Melen Junction",
      time: "2 min ago",
    },
    {
      title: "Suspicious activity reported",
      location: "Bastos Avenue",
      time: "10 min ago",
    },
    {
      title: "Flood warning",
      location: "Mvog-Ada",
      time: "18 min ago",
    },
  ];

  const quickActions = [
    { title: "Report", icon: "📝" },
    { title: "Nearby", icon: "📍" },
    { title: "Map", icon: "🗺️" },
    { title: "Contacts", icon: "👥" },
  ];

  return (
    <main className="min-h-screen bg-slate-100 flex justify-center">
      <div className="w-full max-w-sm min-h-screen bg-white shadow-xl relative pb-24">
        {/* Header */}
        <section className="bg-green-500 px-5 pt-8 pb-6 text-white rounded-b-[2rem]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Welcome back</p>
              <h1 className="text-2xl font-bold">Larry</h1>
            </div>

            <div className="h-12 w-12 rounded-2xl bg-white/20 flex items-center justify-center text-xl">
              🔔
            </div>
          </div>

          <div className="mt-6 rounded-3xl bg-white text-slate-900 p-4 shadow-lg">
            <p className="text-sm text-slate-500">Your Location</p>
            <p className="font-semibold mt-1">Yaoundé, Cameroon</p>
          </div>
        </section>

        {/* SOS */}
        <section className="px-5 mt-6">
          <button className="w-full rounded-3xl bg-red-500 text-white py-5 text-xl font-bold shadow-lg hover:bg-red-600 transition">
            🚨 SOS via WhatsApp
          </button>
        </section>

        {/* Quick Actions */}
        <section className="px-5 mt-6">
          <h2 className="font-bold text-lg mb-4">Quick Actions</h2>

          <div className="grid grid-cols-4 gap-3">
            {quickActions.map((item) => (
              <button
                key={item.title}
                className="rounded-2xl bg-slate-100 p-4 flex flex-col items-center gap-2 hover:bg-slate-200 transition"
              >
                <span className="text-2xl">{item.icon}</span>
                <span className="text-xs font-medium">{item.title}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Alerts */}
        <section className="px-5 mt-8">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-lg">Recent Alerts</h2>
            <button className="text-sm text-green-600 font-medium">
              View all
            </button>
          </div>

          <div className="mt-4 space-y-3">
            {alerts.map((alert, i) => (
              <div
                key={i}
                className="rounded-3xl border border-slate-100 p-4 shadow-sm"
              >
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-2xl bg-red-100 flex items-center justify-center">
                    🚨
                  </div>

                  <div className="flex-1">
                    <p className="font-semibold">{alert.title}</p>
                    <p className="text-sm text-slate-500 mt-1">
                      {alert.location}
                    </p>
                  </div>

                  <span className="text-xs text-slate-400">
                    {alert.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom Nav */}
        <nav className="absolute bottom-0 left-0 right-0 border-t bg-white px-4 py-3">
          <div className="grid grid-cols-4 gap-2 text-center">
            <button className="text-green-600 font-semibold">
              🏠
              <p className="text-xs mt-1">Home</p>
            </button>

            <button className="text-slate-500">
              📍
              <p className="text-xs mt-1">Map</p>
            </button>

            <button className="text-slate-500">
              📝
              <p className="text-xs mt-1">Report</p>
            </button>

            <button className="text-slate-500">
              👤
              <p className="text-xs mt-1">Profile</p>
            </button>
          </div>
        </nav>
      </div>
    </main>
  );
}