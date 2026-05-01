import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { supabase } from "@/lib/supabase";

export default async function DashboardPage() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  const { data: incidents } = await supabase
    .from("incidents")
    .select("*")
    .order("created_at", { ascending: false });

  const total = incidents?.length || 0;
  const critical =
    incidents?.filter(
      (i) => i.priority === "Critical"
    ).length || 0;

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f8fafc",
        padding: 24,
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
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
              fontSize: 38,
              fontWeight: 800,
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
            Real-time incident monitoring.
          </p>
        </div>

        {/* Stats */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(220px,1fr))",
            gap: 16,
            marginTop: 20,
          }}
        >
          {[
            [total, "Total Reports"],
            [critical, "Critical"],
            ["Live", "System"],
            ["91%", "AI Accuracy"],
          ].map(([n, t]) => (
            <div
              key={t}
              style={{
                background: "white",
                padding: 24,
                borderRadius: 24,
              }}
            >
              <div
                style={{
                  fontSize: 32,
                  fontWeight: 800,
                }}
              >
                {n}
              </div>

              <div
                style={{
                  color: "#64748b",
                  marginTop: 8,
                }}
              >
                {t}
              </div>
            </div>
          ))}
        </div>

        {/* Live Feed */}
        <div
          style={{
            marginTop: 20,
            background: "white",
            padding: 24,
            borderRadius: 28,
          }}
        >
          <h2
            style={{
              fontSize: 28,
              fontWeight: 800,
            }}
          >
            Incoming Incidents
          </h2>

          {incidents?.length === 0 && (
            <div
              style={{
                marginTop: 20,
                color: "#64748b",
              }}
            >
              No incidents yet.
            </div>
          )}

          {incidents?.map((item) => (
            <div
              key={item.id}
              style={{
                marginTop: 14,
                padding: 18,
                borderRadius: 18,
                background: "#f8fafc",
              }}
            >
              <div
                style={{
                  fontWeight: 800,
                }}
              >
                {item.description}
              </div>

              <div
                style={{
                  marginTop: 8,
                  display: "flex",
                  gap: 10,
                  flexWrap: "wrap",
                }}
              >
                <span
                  style={{
                    background: "#dcfce7",
                    padding:
                      "4px 10px",
                    borderRadius: 999,
                    fontSize: 13,
                  }}
                >
                  {item.source}
                </span>

                <span
                  style={{
                    background: "#fee2e2",
                    padding:
                      "4px 10px",
                    borderRadius: 999,
                    fontSize: 13,
                  }}
                >
                  {item.priority}
                </span>

                <span
                  style={{
                    background: "#e0e7ff",
                    padding:
                      "4px 10px",
                    borderRadius: 999,
                    fontSize: 13,
                  }}
                >
                  {item.department}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}