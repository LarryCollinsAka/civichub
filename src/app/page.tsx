export default function Page() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <section className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-green-500 text-white grid place-items-center font-bold">C</div>
            <div>
              <p className="text-xl font-bold">CiviHub</p>
              <p className="text-xs text-slate-500">Smart Civic Safety</p>
            </div>
          </div>
          <div className="hidden md:flex gap-3">
            <a className="rounded-full border px-5 py-2 hover:bg-slate-50" href="#features">Features</a>
            <a className="rounded-full bg-green-500 px-5 py-2 text-white hover:bg-green-600" href="/dashboard">Dashboard</a>
          </div>
        </nav>

        <div className="grid items-center gap-12 pt-16 md:grid-cols-2">
          <div>
            <span className="inline-flex rounded-full bg-green-50 px-4 py-2 text-sm font-medium text-green-700">Real-time Safety Reporting</span>
            <h1 className="mt-6 text-5xl font-black leading-tight md:text-7xl">Protect Communities <span className="text-green-500">Faster</span></h1>
            <p className="mt-6 max-w-xl text-lg text-slate-600">Report incidents instantly, share live location, trigger WhatsApp SOS alerts, and help authorities respond faster with intelligent dashboards.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="/mobile" className="rounded-2xl bg-green-500 px-7 py-4 text-center font-semibold text-white shadow-lg shadow-green-200 hover:bg-green-600">Open Mobile App</a>
              <a href="/map" className="rounded-2xl border px-7 py-4 text-center font-semibold hover:bg-slate-50">View Live Map</a>
            </div>
            <div className="mt-8 flex gap-8 text-sm text-slate-500">
              <div><span className="block text-2xl font-bold text-slate-900">24/7</span>Availability</div>
              <div><span className="block text-2xl font-bold text-slate-900">AI</span>Insights</div>
              <div><span className="block text-2xl font-bold text-slate-900">GPS</span>Location</div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-6 -top-6 h-24 w-24 rounded-full bg-green-100 blur-2xl" />
            <div className="absolute -bottom-8 -right-8 h-32 w-32 rounded-full bg-green-200 blur-3xl" />
            <div className="relative rounded-[2rem] border border-slate-100 bg-white p-5 shadow-2xl">
              <div className="rounded-[2rem] bg-slate-900 p-4 text-white">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-sm opacity-80">Citizen App</span>
                  <span className="rounded-full bg-green-500 px-3 py-1 text-xs">Online</span>
                </div>
                <div className="space-y-3">
                  <div className="rounded-2xl bg-white/10 p-4">🚨 Robbery reported near Central Market</div>
                  <div className="rounded-2xl bg-white/10 p-4">📍 Live location shared successfully</div>
                  <div className="rounded-2xl bg-green-500 p-5 text-center text-lg font-bold">SOS via WhatsApp</div>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-3 text-center text-sm">
                <div className="rounded-2xl bg-slate-50 p-3">Home</div>
                <div className="rounded-2xl bg-slate-50 p-3">Report</div>
                <div className="rounded-2xl bg-slate-50 p-3">Profile</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-center text-4xl font-black">Why Users Love CiviHub</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-4">
            {[
              ['WhatsApp Alerts','Instant emergency notifications to trusted contacts.'],
              ['Live Map','Track incidents and hotspots in real time.'],
              ['AI Priority','Smart urgency scoring for faster response.'],
              ['Simple Reporting','Clean mobile-first forms anyone can use.'],
            ].map(([title,desc]) => (
              <div key={title} className="rounded-3xl bg-white p-6 shadow-sm">
                <div className="mb-4 h-12 w-12 rounded-2xl bg-green-100" />
                <h3 className="font-bold">{title}</h3>
                <p className="mt-2 text-sm text-slate-600">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
