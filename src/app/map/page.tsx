"use client";

import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

export default function MapPage() {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

    if (!token) {
      setError("Missing NEXT_PUBLIC_MAPBOX_TOKEN");
      setLoading(false);
      return;
    }

    mapboxgl.accessToken = token.trim();

    try {
      const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/mapbox/streets-v12",
        center: [11.5021, 3.848], // Yaoundé
        zoom: 12,
        attributionControl: false,
      });

      mapRef.current = map;

      map.addControl(
        new mapboxgl.NavigationControl(),
        "top-right"
      );

      map.on("load", () => {
        setLoading(false);
        map.resize();

        const incidents = [
          {
            lng: 11.502,
            lat: 3.848,
            title: "Road Accident",
          },
          {
            lng: 11.517,
            lat: 3.872,
            title: "Robbery Alert",
          },
          {
            lng: 11.49,
            lat: 3.861,
            title: "Flood Warning",
          },
        ];

        incidents.forEach((item) => {
          const el = document.createElement("div");
          el.innerHTML = "🚨";
          el.style.fontSize = "28px";
          el.style.cursor = "pointer";

          new mapboxgl.Marker(el)
            .setLngLat([item.lng, item.lat])
            .setPopup(
              new mapboxgl.Popup({
                offset: 25,
              }).setHTML(
                `<div style="font-weight:700;">${item.title}</div>`
              )
            )
            .addTo(map);
        });
      });

      map.on("error", () => {
        setError("Failed to load Mapbox map.");
        setLoading(false);
      });
    } catch (err) {
      console.error(err);
      setError("Map initialization failed.");
      setLoading(false);
    }

    return () => {
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  return (
    <main className="relative h-screen w-full overflow-hidden bg-slate-100">
      {/* MAP */}
      <div
        ref={mapContainerRef}
        className="absolute inset-0"
      />

      {/* Loading */}
      {loading && !error && (
        <div className="absolute inset-0 z-40 flex items-center justify-center bg-white/70 backdrop-blur-sm">
          <div className="rounded-2xl bg-white px-6 py-4 shadow-xl font-semibold">
            Loading map...
          </div>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="absolute inset-0 z-50 flex items-center justify-center px-6">
          <div className="max-w-md rounded-3xl bg-white p-8 shadow-2xl text-center">
            <p className="text-red-500 text-lg font-bold">
              Map Error
            </p>

            <p className="mt-3 text-slate-600">
              {error}
            </p>

            <p className="mt-4 text-sm text-slate-400">
              Check your Mapbox token in Vercel or
              .env.local
            </p>
          </div>
        </div>
      )}

      {/* Top Card */}
      <div className="absolute z-20 top-4 left-4 right-4 md:right-auto md:w-96 rounded-3xl bg-white/95 backdrop-blur shadow-xl p-5">
        <p className="text-sm text-slate-500">
          Live Monitoring
        </p>

        <h1 className="text-2xl font-bold mt-1">
          Yaoundé Incident Map
        </h1>

        <div className="grid grid-cols-3 gap-3 mt-4 text-center">
          <div className="rounded-2xl bg-slate-100 p-3">
            <p className="text-xl font-bold">12</p>
            <p className="text-xs text-slate-500">
              Reports
            </p>
          </div>

          <div className="rounded-2xl bg-red-50 p-3">
            <p className="text-xl font-bold text-red-600">
              4
            </p>
            <p className="text-xs text-red-500">
              Urgent
            </p>
          </div>

          <div className="rounded-2xl bg-blue-50 p-3">
            <p className="text-xl font-bold text-blue-600">
              3
            </p>
            <p className="text-xs text-blue-500">
              Nearby
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="absolute z-20 bottom-6 left-4 right-4 md:left-auto md:w-80 rounded-3xl bg-white p-4 shadow-2xl">
        <button className="w-full rounded-2xl bg-green-500 py-4 text-white font-bold hover:bg-green-600 transition">
          Share My Location
        </button>

        <button className="w-full mt-3 rounded-2xl bg-red-500 py-4 text-white font-bold hover:bg-red-600 transition">
          🚨 Emergency SOS
        </button>
      </div>
    </main>
  );
}