export default function DashboardPage() {
  const incidents = [
    {
      id: "#CH-104",
      type: "Road Accident",
      area: "Melen",
      status: "Urgent",
      time: "2 min ago",
    },
    {
      id: "#CH-105",
      type: "Flood Alert",
      area: "Mvog-Ada",
      status: "Active",
      time: "8 min ago",
    },
    {
      id: "#CH-106",
      type: "Suspicious Activity",
      area: "Bastos",
      status: "Review",
      time: "14 min ago",
    },
    {
      id: "#CH-107",
      type: "Fire Incident",
      area: "Essos",
      status: "Urgent",
      time: "21 min ago",
    },
  ];

  const priorities = [
    "Cluster of robbery reports near Central Market",
    "Flood risk increasing in lowland zones",
    "Repeat false alerts detected in Bastos",
    "Accident hotspot forming around Melen Junction",
  ];

  return (
    <main className="min-h-screen bg-slate-100 p-5 md:p-8">
      {/* Header */}
      <section className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm text-slate-500">Admin Console</p>
          <h1 className="text-3xl font-bold">Civihub Dashboard</h1>
        </div>

        <button className="rounded-2xl bg-green-500 px-6 py-3 text-white font-semibold hover:bg-green-600 transition">
          Export Reports
        </button>
      </section>

      {/* Stats */}
      <section className="mt-8 grid gap-4 md:grid-cols-4">
        {[
          ["124", "Total Reports"],
          ["18", "Urgent Cases"],
          ["42", "Resolved Today"],
          ["93%", "Response Rate"],
        ].map(([value, label]) => (
          <div
            key={label}
            className="rounded-3xl bg-white p-5 shadow-sm"
          >
            <p className="text-3xl font-bold">{value}</p>
            <p className="mt-2 text-sm text-slate-500">{label}</p>
          </div>
        ))}
      </section>

      {/* Main Grid */}
      <section className="mt-8 grid gap-6 lg:grid-cols-3">
        {/* Table */}
        <div className="lg:col-span-2 rounded-3xl bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Recent Incidents</h2>
            <button className="text-sm text-green-600 font-medium">
              View all
            </button>
          </div>

          <div className="mt-5 overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-sm text-slate-500 border-b">
                  <th className="pb-3">ID</th>
                  <th className="pb-3">Type</th>
                  <th className="pb-3">Area</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3">Time</th>
                </tr>
              </thead>

              <tbody>
                {incidents.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b last:border-0"
                  >
                    <td className="py-4 font-medium">{item.id}</td>
                    <td className="py-4">{item.type}</td>
                    <td className="py-4">{item.area}</td>
                    <td className="py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          item.status === "Urgent"
                            ? "bg-red-100 text-red-600"
                            : item.status === "Active"
                            ? "bg-green-100 text-green-600"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="py-4 text-sm text-slate-500">
                      {item.time}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* AI Panel */}
        <div className="rounded-3xl bg-slate-900 text-white p-5 shadow-sm">
          <p className="text-sm text-green-400">
            NVIDIA NIM Intelligence
          </p>
          <h2 className="text-2xl font-bold mt-2">
            AI Priority Queue
          </h2>

          <div className="mt-5 space-y-3">
            {priorities.map((item, i) => (
              <div
                key={i}
                className="rounded-2xl bg-white/10 p-4 text-sm"
              >
                {item}
              </div>
            ))}
          </div>

          <button className="mt-5 w-full rounded-2xl bg-green-500 py-3 font-semibold hover:bg-green-600 transition">
            Run Analysis
          </button>
        </div>
      </section>
    </main>
  );
}