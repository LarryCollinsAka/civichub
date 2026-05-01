"use client";

import { useEffect, useRef, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";

export default function MapPage() {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const [status, setStatus] = useState("Loading map...");

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
          antialias: true
        });

        map.addControl(
          new mapboxgl.NavigationControl(),
          "top-right"
        );

        map.on("load", () => {
          setStatus("Map loaded");

          new mapboxgl.Marker({ color: "#ef4444" })
            .setLngLat([11.5021, 3.848])
            .addTo(map);

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

  return (
    <main
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        overflow: "hidden"
      }}
    >
      {/* IMPORTANT HARD SIZE */}
      <div
        ref={mapContainer}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%"
        }}
      />

      <div
        style={{
          position: "absolute",
          top: 16,
          left: 16,
          zIndex: 50,
          background: "white",
          padding: "10px 14px",
          borderRadius: "14px",
          boxShadow: "0 8px 20px rgba(0,0,0,.08)"
        }}
      >
        {status}
      </div>

      <div
        style={{
          position: "absolute",
          right: 24,
          bottom: 24,
          zIndex: 50,
          width: 320,
          background: "white",
          padding: 16,
          borderRadius: 24,
          boxShadow: "0 20px 40px rgba(0,0,0,.12)"
        }}
      >
        <button
          style={{
            width: "100%",
            padding: "16px",
            borderRadius: "18px",
            border: "none",
            background: "#22c55e",
            color: "white",
            fontWeight: 700
          }}
        >
          Share My Location
        </button>

        <button
          style={{
            width: "100%",
            padding: "16px",
            borderRadius: "18px",
            border: "none",
            background: "#ef4444",
            color: "white",
            fontWeight: 700,
            marginTop: 12
          }}
        >
          🚨 Emergency SOS
        </button>
      </div>
    </main>
  );
}