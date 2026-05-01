import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";

export default async function DashboardPage() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  const stats = [
    ["14", "New Reports"],
    ["4", "Critical"],
    ["8", "Assigned"],
    ["91%", "AI Accuracy"],
  ];

  const incidents = [
    {
      title: "Robbery near Melen Junction",
      level: "Critical",
      dept: "Police",
    },
    {
      title: "Accident at Ngoa Ekelle",
      level: "Medium",
      dept: "Medical",
    },
    {
      title: "Flood alert at Mokolo",
      level: "High",
      dept: "Municipal",
    },
  ];

  const staff = [
    "Police Unit Alpha",
    "Fire Team Bravo",
    "Medical Unit One",
  ];

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f8fafc",
        display: "grid",
        gridTemplateColumns: "260px 1fr",
      }}
    >
      {/* Sidebar */}
      <aside
        style={{
          background: "#0f172a",
          color: "white",
          padding: 24,
        }}
      >
        <div
          style={{
            fontSize: 28,
            fontWeight: 800,
          }}
        >
          CiviHub
        </div>

        <div
          style={{
            marginTop: 6,
            color: "#94a3b8",
            fontSize: 14,
          }}
        >
          Command Center
        </div>

        <nav
          style={{
            marginTop: 36,
            display: "grid",
            gap: 10,
          }}
        >
          {[
            "Dashboard",
            "Incidents",
            "Live Map",
            "Staff",
            "Analytics",
            "Settings",
          ].map((item, i) => (
            <div
              key={item}
              style={{
                padding: "14px 16px",
                borderRadius: 16,
                background:
                  i === 0
                    ? "#22c55e"
                    : "rgba(255,255,255,.04)",
                fontWeight: 700,
              }}
            >
              {item}
            </div>
          ))}
        </nav>

        <div
          style={{
            marginTop: 40,
            padding: 18,
            borderRadius: 22,
            background: "rgba(255,255,255,.06)",
          }}
        >
          <div
            style={{
              fontSize: 13,
              color: "#94a3b8",
            }}
          >
            Logged in as
          </div>

          <div
            style={{
              fontWeight: 800,
              marginTop: 6,
            }}
          >
            {session.user}
          </div>

          <div
            style={{
              marginTop: 4,
              color: "#cbd5e1",
              fontSize: 14,
            }}
          >
            {session.role}
          </div>
        </div>
      </aside>

      {/* Main */}
      <section
        style={{
          padding: 24,
        }}
      >
        {/* Header */}
        <div
          style={{
            background: "white",
            padding: 24,
            borderRadius: 28,
            boxShadow:
              "0 20px 50px rgba(0,0,0,.05)",
          }}
        >
          <div
            style={{
              fontSize: 13,
              color: "#64748b",
              fontWeight: 700,
            }}
          >
            LIVE OPERATIONS
          </div>

          <h1
            style={{
              fontSize: 40,
              fontWeight: 800,
              color: "#0f172a",
              marginTop: 8,
            }}
          >
            Welcome {session.user}
          </h1>

          <p
            style={{
              color: "#64748b",
              marginTop: 8,
            }}
          >
            Monitoring city incidents in real-time.
          </p>
        </div>

        {/* KPI */}
        <div
          style={{
            marginTop: 20,
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(220px,1fr))",
            gap: 16,
          }}
        >
          {stats.map(([n, t]) => (
            <div
              key={t}
              style={{
                background: "white",
                padding: 24,
                borderRadius: 24,
                boxShadow:
                  "0 20px 40px rgba(0,0,0,.04)",
              }}
            >
              <div
                style={{
                  fontSize: 34,
                  fontWeight: 800,
                  color: "#0f172a",
                }}
              >
                {n}
              </div>

              <div
                style={{
                  marginTop: 8,
                  color: "#64748b",
                }}
              >
                {t}
              </div>
            </div>
          ))}
        </div>

        {/* Lower Grid */}
        <div
          style={{
            marginTop: 20,
            display: "grid",
            gridTemplateColumns:
              "2fr 1fr",
            gap: 18,
          }}
        >
          {/* Incident Feed */}
          <div
            style={{
              background: "white",
              padding: 24,
              borderRadius: 28,
              boxShadow:
                "0 20px 40px rgba(0,0,0,.04)",
            }}
          >
            <h2
              style={{
                fontSize: 28,
                fontWeight: 800,
                color: "#0f172a",
              }}
            >
              Incoming Incidents
            </h2>

            {incidents.map((item) => (
              <div
                key={item.title}
                style={{
                  marginTop: 14,
                  padding: 18,
                  borderRadius: 18,
                  background: "#f8fafc",
                  display: "grid",
                  gap: 8,
                }}
              >
                <div
                  style={{
                    fontWeight: 800,
                  }}
                >
                  {item.title}
                </div>

                <div
                  style={{
                    display: "flex",
                    gap: 10,
                    fontSize: 14,
                  }}
                >
                  <span
                    style={{
                      background: "#fee2e2",
                      color: "#991b1b",
                      padding:
                        "4px 10px",
                      borderRadius: 999,
                      fontWeight: 700,
                    }}
                  >
                    {item.level}
                  </span>

                  <span
                    style={{
                      background: "#dcfce7",
                      color: "#166534",
                      padding:
                        "4px 10px",
                      borderRadius: 999,
                      fontWeight: 700,
                    }}
                  >
                    {item.dept}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column */}
          <div
            style={{
              display: "grid",
              gap: 18,
            }}
          >
            {/* AI Routing */}
            <div
              style={{
                background: "white",
                padding: 24,
                borderRadius: 28,
                boxShadow:
                  "0 20px 40px rgba(0,0,0,.04)",
              }}
            >
              <h3
                style={{
                  fontSize: 24,
                  fontWeight: 800,
                }}
              >
                AI Routing
              </h3>

              <div
                style={{
                  marginTop: 14,
                  padding: 16,
                  borderRadius: 18,
                  background: "#f8fafc",
                }}
              >
                Robbery near Melen
                <br />
                → Police Unit Alpha
              </div>
            </div>

            {/* Staff */}
            <div
              style={{
                background: "white",
                padding: 24,
                borderRadius: 28,
                boxShadow:
                  "0 20px 40px rgba(0,0,0,.04)",
              }}
            >
              <h3
                style={{
                  fontSize: 24,
                  fontWeight: 800,
                }}
              >
                Staff Online
              </h3>

              {staff.map((name) => (
                <div
                  key={name}
                  style={{
                    marginTop: 12,
                    padding: 14,
                    borderRadius: 16,
                    background: "#f8fafc",
                    fontWeight: 700,
                  }}
                >
                  🟢 {name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}