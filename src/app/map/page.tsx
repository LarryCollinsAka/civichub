"use client";

import { useEffect, useRef, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";

export default function MapPage() {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<any>(null);

  const [status, setStatus] = useState("Loading map...");
  const [satellite, setSatellite] = useState(false);

  useEffect(() => {
    let map: any;

    async function initMap() {
      try {
        const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

        if (!token) {
          setStatus("Missing token");
          return;
        }

        const mapboxgl = (await import("mapbox-gl")).default;

        mapboxgl.accessToken = token.trim();

        map = new mapboxgl.Map({
          container: mapContainer.current!,
          style: "mapbox://styles/mapbox/streets-v12",
          center: [11.5021, 3.848],
          zoom: 14,
          pitch: 65,
          bearing: -20,
          antialias: true,
        });

        mapRef.current = map;

        map.addControl(
          new mapboxgl.NavigationControl(),
          "top-right"
        );

        map.on("load", () => {
          setStatus("Live");

          const incidents = [
            [11.5021, 3.848],
            [11.508, 3.852],
            [11.495, 3.842],
          ];

          incidents.forEach((coords, i) => {
            new mapboxgl.Marker({
              color: i === 0 ? "#ef4444" : "#f59e0b",
            })
              .setLngLat(coords as [number, number])
              .addTo(map);
          });

          map.resize();
        });
      } catch (error) {
        console.error(error);
        setStatus("Failed");
      }
    }

    initMap();

    return () => {
      if (map) map.remove();
    };
  }, []);

  function toggleStyle() {
    if (!mapRef.current) return;

    const next = !satellite;
    setSatellite(next);

    mapRef.current.setStyle(
      next
        ? "mapbox://styles/mapbox/satellite-streets-v12"
        : "mapbox://styles/mapbox/streets-v12"
    );
  }

  return (
    <main
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      {/* HARD SIZE MAP CONTAINER */}
      <div
        ref={mapContainer}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
        }}
      />

      {/* Top Left Status */}
      <div
        style={{
          position: "absolute",
          top: 18,
          left: 18,
          zIndex: 60,
          padding: "12px 16px",
          borderRadius: 18,
          background: "rgba(255,255,255,.82)",
          backdropFilter: "blur(12px)",
          boxShadow: "0 10px 30px rgba(0,0,0,.08)",
          minWidth: 250,
        }}
      >
        <div
          style={{
            fontSize: 13,
            color: "#64748b",
            marginBottom: 4,
          }}
        >
          CIVIHUB COMMAND CENTER
        </div>

        <div
          style={{
            fontSize: 28,
            fontWeight: 800,
            color: "#0f172a",
          }}
        >
          Yaoundé Live Map
        </div>

        <div
          style={{
            marginTop: 10,
            display: "flex",
            gap: 8,
          }}
        >
          <span
            style={{
              background: "#dcfce7",
              color: "#166534",
              padding: "6px 10px",
              borderRadius: 999,
              fontSize: 12,
              fontWeight: 700,
            }}
          >
            {status}
          </span>

          <span
            style={{
              background: "#fee2e2",
              color: "#991b1b",
              padding: "6px 10px",
              borderRadius: 999,
              fontSize: 12,
              fontWeight: 700,
            }}
          >
            4 Urgent
          </span>
        </div>
      </div>

      {/* Top Right Controls */}
      <div
        style={{
          position: "absolute",
          top: 18,
          right: 18,
          zIndex: 60,
          display: "flex",
          gap: 10,
        }}
      >
        <button
          onClick={toggleStyle}
          style={{
            border: "none",
            borderRadius: 16,
            padding: "12px 16px",
            background: "rgba(255,255,255,.88)",
            backdropFilter: "blur(10px)",
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          {satellite ? "Street View" : "Satellite"}
        </button>
      </div>

      {/* Bottom Right Command Card */}
      <div
        style={{
          position: "absolute",
          right: 24,
          bottom: 24,
          zIndex: 60,
          width: 340,
          background: "rgba(255,255,255,.92)",
          backdropFilter: "blur(14px)",
          padding: 18,
          borderRadius: 28,
          boxShadow: "0 24px 60px rgba(0,0,0,.14)",
        }}
      >
        <div
          style={{
            fontWeight: 800,
            fontSize: 20,
            marginBottom: 14,
            color: "#0f172a",
          }}
        >
          Emergency Actions
        </div>

        <button
          style={{
            width: "100%",
            padding: "16px",
            borderRadius: 18,
            border: "none",
            background: "#22c55e",
            color: "white",
            fontWeight: 800,
            fontSize: 16,
            cursor: "pointer",
          }}
        >
          Share My Location
        </button>

        <button
          style={{
            width: "100%",
            padding: "16px",
            borderRadius: 18,
            border: "none",
            background: "#ef4444",
            color: "white",
            fontWeight: 800,
            fontSize: 16,
            marginTop: 12,
            cursor: "pointer",
          }}
        >
          🚨 Emergency SOS
        </button>

        <div
          style={{
            marginTop: 14,
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: 8,
          }}
        >
          {[
            ["12", "Reports"],
            ["3", "Nearby"],
            ["92%", "AI Score"],
          ].map(([n, t]) => (
            <div
              key={t}
              style={{
                background: "#f8fafc",
                padding: "12px",
                borderRadius: 18,
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontWeight: 800,
                  fontSize: 18,
                }}
              >
                {n}
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: "#64748b",
                }}
              >
                {t}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}