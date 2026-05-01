"use client";

import { useEffect, useRef, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";

export default function MapPage() {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const [status, setStatus] = useState("Loading map...");

  useEffect(() => {
    let map: any;

    async function init() {
      try {
        const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

        if (!token) {
          setStatus("Missing NEXT_PUBLIC_MAPBOX_TOKEN");
          return;
        }

        const mapboxgl = (await import("mapbox-gl")).default;

        mapboxgl.accessToken = token.trim();

        map = new mapboxgl.Map({
          container: mapContainer.current!,
          style: "mapbox://styles/mapbox/streets-v12",
          center: [11.5021, 3.848],
          zoom: 12,
        });

        map.addControl(new mapboxgl.NavigationControl(), "top-right");

        map.on("load", () => {
          setStatus("Map loaded");
          map.resize();

          new mapboxgl.Marker()
            .setLngLat([11.5021, 3.848])
            .addTo(map);
        });

        map.on("error", (e: any) => {
          console.error(e);
          setStatus("Mapbox error");
        });
      } catch (err) {
        console.error(err);
        setStatus("Initialization failed");
      }
    }

    init();

    return () => {
      if (map) map.remove();
    };
  }, []);

  return (
    <main className="relative h-screen w-screen overflow-hidden">
      {/* Force exact size */}
      <div
        ref={mapContainer}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
        }}
      />

      {/* Debug status */}
      <div className="absolute z-50 top-4 left-4 rounded-xl bg-white px-4 py-2 shadow">
        {status}
      </div>

      {/* Bottom buttons */}
      <div className="absolute z-50 bottom-6 right-6 w-72 rounded-3xl bg-white p-4 shadow-2xl">
        <button className="w-full rounded-2xl bg-green-500 py-4 text-white font-bold">
          Share My Location
        </button>

        <button className="mt-3 w-full rounded-2xl bg-red-500 py-4 text-white font-bold">
          🚨 Emergency SOS
        </button>
      </div>
    </main>
  );
}