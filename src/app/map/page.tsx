"use client";

import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "";

export default function MapPage() {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;

    const map = new mapboxgl.Map({
      container: mapRef.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [11.5021, 3.848], // Yaounde
      zoom: 12,
    });

    map.addControl(new mapboxgl.NavigationControl(), "top-right");

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
      const marker = document.createElement("div");
      marker.innerHTML = "🚨";
      marker.style.fontSize = "28px";
      marker.style.cursor = "pointer";

      new mapboxgl.Marker(marker)
        .setLngLat([item.lng, item.lat])
        .setPopup(
          new mapboxgl.Popup({ offset: 25 }).setHTML(
            `<strong>${item.title}</strong>`,
          ),
        )
        .addTo(map);
    });

    mapInstance.current = map;

    return () => {
      map.remove();
      mapInstance.current = null;
    };
  }, []);

  return (
    <main className="relative h-screen w-full overflow-hidden">
      {/* Map */}
      <div ref={mapRef} className="absolute inset-0" />

      {/* Top Card */}
      <div className="absolute top-4 left-4 right-4 md:right-auto md:w-96 rounded-3xl bg-white shadow-xl p-5">
        <p className="text-sm text-slate-500">Live Monitoring</p>

        <h1 className="text-2xl font-bold mt-1">Yaoundé Incident Map</h1>

        <div className="grid grid-cols-3 gap-3 mt-4 text-center">
          <div className="rounded-2xl bg-slate-100 p-3">
            <p className="text-xl font-bold">12</p>
            <p className="text-xs text-slate-500">Reports</p>
          </div>

          <div className="rounded-2xl bg-slate-100 p-3">
            <p className="text-xl font-bold">4</p>
            <p className="text-xs text-slate-500">Urgent</p>
          </div>

          <div className="rounded-2xl bg-slate-100 p-3">
            <p className="text-xl font-bold">3</p>
            <p className="text-xs text-slate-500">Nearby</p>
          </div>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="absolute bottom-5 left-4 right-4 md:left-auto md:w-80 rounded-3xl bg-white shadow-xl p-4">
        <button className="w-full rounded-2xl bg-green-500 text-white py-4 font-bold hover:bg-green-600 transition">
          Share My Location
        </button>

        <button className="w-full mt-3 rounded-2xl bg-red-500 text-white py-4 font-bold hover:bg-red-600 transition">
          🚨 Emergency SOS
        </button>
      </div>
    </main>
  );
}
