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
          antialias: true,
        });

        map.addControl(new mapboxgl.NavigationControl(), "top-right");

        map.on("load", () => {
          setStatus("Map loaded");

          // SIMPLE MARKER FIRST
          new mapboxgl.Marker({ color: "#ef4444" })
            .setLngLat([11.5021, 3.848])
            .addTo(map);

          // SAFE 3D BUILDINGS
          try {
            map.addLayer({
              id: "buildings-3d",
              source: "composite",
              "source-layer": "building",
              filter: ["==", "extrude", "true"],
              type: "fill-extrusion",
              minzoom: 12,
              paint: {
                "fill-extrusion-color": "#cbd5e1",
                "fill-extrusion-height": ["get", "height"],
                "fill-extrusion-base": ["get", "min_height"],
                "fill-extrusion-opacity": 0.8
              }
            });
          } catch (e) {
            console.log("3D skipped");
          }

          map.resize();
        });

        map.on("error", () => {
          setStatus("Map error");
        });

      } catch (err) {
        console.error(err);
        setStatus("Init failed");
      }
    }

    initMap();

    return () => {
      if (map) map.remove();
    };
  }, []);

  return (
    <main className="relative h-screen w-screen overflow-hidden">
      <div ref={mapContainer} className="absolute inset-0" />

      <div className="absolute z-50 top-4 left-4 rounded-xl bg-white px-4 py-2 shadow">
        {status}
      </div>

      <div className="absolute z-40 bottom-6 right-6 w-80 rounded-3xl bg-white p-4 shadow-2xl">
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