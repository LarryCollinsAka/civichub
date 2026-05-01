import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";

export default async function DashboardPage() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

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
        <div
          style={{
            background: "white",
            borderRadius: 28,
            padding: 24,
            boxShadow:
              "0 20px 50px rgba(0,0,0,.06)",
          }}
        >
          <div
            style={{
              fontSize: 13,
              color: "#64748b",
              fontWeight: 700,
            }}
          >
            CIVIHUB CONTROL CENTER
          </div>

          <h1
            style={{
              fontSize: 38,
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
            Role: {session.role}
          </p>
        </div>

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
            ["14", "New Reports"],
            ["4", "Critical"],
            ["8", "Assigned"],
            ["91%", "AI Accuracy"],
          ].map(([n, t]) => (
            <div
              key={t}
              style={{
                background: "white",
                padding: 24,
                borderRadius: 24,
                boxShadow:
                  "0 20px 50px rgba(0,0,0,.05)",
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

        <div
          style={{
            marginTop: 20,
            background: "white",
            padding: 24,
            borderRadius: 28,
            boxShadow:
              "0 20px 50px rgba(0,0,0,.05)",
          }}
        >
          <h2
            style={{
              fontSize: 24,
              fontWeight: 800,
            }}
          >
            Incoming Incidents
          </h2>

          {[
            "Robbery near Melen Junction",
            "Accident at Ngoa Ekelle",
            "Flood alert at Mokolo",
          ].map((item) => (
            <div
              key={item}
              style={{
                padding: 16,
                marginTop: 12,
                borderRadius: 18,
                background: "#f8fafc",
                fontWeight: 600,
              }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}