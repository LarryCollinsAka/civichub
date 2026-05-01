"use client";

import { useState } from "react";

export default function ReportPage() {
  const [incident, setIncident] = useState("Robbery");
  const [details, setDetails] = useState("");
  const [location, setLocation] = useState("Not captured");
  const [loading, setLoading] = useState(false);

  function getLocation() {
    if (!navigator.geolocation) {
      setLocation("Geolocation not supported");
      return;
    }

    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation(
          `${pos.coords.latitude.toFixed(5)}, ${pos.coords.longitude.toFixed(5)}`
        );
        setLoading(false);
      },
      () => {
        setLocation("Unable to retrieve location");
        setLoading(false);
      }
    );
  }

  function submitReport() {
    const message =
      `🚨 CIVIHUB INCIDENT REPORT\n\n` +
      `Type: ${incident}\n` +
      `Location: ${location}\n` +
      `Details: ${details || "No extra details"}\n\n` +
      `Please respond urgently.`;

    const encoded = encodeURIComponent(message);

    window.open(
      `https://wa.me/?text=${encoded}`,
      "_blank"
    );
  }

  const types = [
    "Robbery",
    "Accident",
    "Flood",
    "Fire",
    "Medical",
    "Violence",
  ];

  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg,#f8fafc,#eef2ff)",
        padding: "20px",
      }}
    >
      <div
        style={{
          maxWidth: 700,
          margin: "0 auto",
        }}
      >
        {/* Header */}
        <div
          style={{
            background: "white",
            borderRadius: 28,
            padding: 24,
            boxShadow:
              "0 20px 40px rgba(0,0,0,.08)",
          }}
        >
          <div
            style={{
              fontSize: 13,
              color: "#64748b",
              fontWeight: 700,
            }}
          >
            CIVIHUB REPORT CENTER
          </div>

          <h1
            style={{
              fontSize: 36,
              fontWeight: 800,
              marginTop: 8,
              color: "#0f172a",
            }}
          >
            Report Incident
          </h1>

          <p
            style={{
              color: "#64748b",
              marginTop: 10,
              fontSize: 16,
            }}
          >
            Quickly notify responders with
            location and details.
          </p>
        </div>

        {/* Form */}
        <div
          style={{
            marginTop: 20,
            background: "white",
            borderRadius: 28,
            padding: 24,
            boxShadow:
              "0 20px 40px rgba(0,0,0,.08)",
          }}
        >
          {/* Incident Types */}
          <label
            style={{
              fontWeight: 700,
              color: "#0f172a",
              display: "block",
              marginBottom: 12,
            }}
          >
            Incident Type
          </label>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit,minmax(140px,1fr))",
              gap: 10,
            }}
          >
            {types.map((type) => (
              <button
                key={type}
                onClick={() => setIncident(type)}
                style={{
                  padding: "14px",
                  borderRadius: 18,
                  border:
                    incident === type
                      ? "2px solid #22c55e"
                      : "1px solid #e5e7eb",
                  background:
                    incident === type
                      ? "#dcfce7"
                      : "#fff",
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                {type}
              </button>
            ))}
          </div>

          {/* Description */}
          <div style={{ marginTop: 22 }}>
            <label
              style={{
                fontWeight: 700,
                display: "block",
                marginBottom: 10,
              }}
            >
              Description
            </label>

            <textarea
              rows={5}
              placeholder="What happened?"
              value={details}
              onChange={(e) =>
                setDetails(e.target.value)
              }
              style={{
                width: "100%",
                borderRadius: 20,
                border: "1px solid #e5e7eb",
                padding: 16,
                fontSize: 16,
                resize: "none",
              }}
            />
          </div>

          {/* Location */}
          <div style={{ marginTop: 22 }}>
            <label
              style={{
                fontWeight: 700,
                display: "block",
                marginBottom: 10,
              }}
            >
              Current Location
            </label>

            <div
              style={{
                padding: 16,
                borderRadius: 18,
                background: "#f8fafc",
                color: "#334155",
                fontWeight: 600,
              }}
            >
              {location}
            </div>

            <button
              onClick={getLocation}
              style={{
                marginTop: 12,
                width: "100%",
                padding: "16px",
                borderRadius: 18,
                border: "none",
                background: "#0f172a",
                color: "white",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              {loading
                ? "Capturing..."
                : "Use My GPS Location"}
            </button>
          </div>

          {/* Upload */}
          <div style={{ marginTop: 22 }}>
            <label
              style={{
                fontWeight: 700,
                display: "block",
                marginBottom: 10,
              }}
            >
              Evidence Photo (optional)
            </label>

            <input
              type="file"
              accept="image/*"
              style={{
                width: "100%",
                padding: 14,
                borderRadius: 18,
                border: "1px solid #e5e7eb",
              }}
            />
          </div>

          {/* Submit */}
          <button
            onClick={submitReport}
            style={{
              marginTop: 28,
              width: "100%",
              padding: "18px",
              borderRadius: 22,
              border: "none",
              background: "#22c55e",
              color: "white",
              fontSize: 18,
              fontWeight: 800,
              cursor: "pointer",
            }}
          >
            Send via WhatsApp
          </button>
        </div>
      </div>
    </main>
  );
}