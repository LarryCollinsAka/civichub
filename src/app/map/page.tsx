"use client";

import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

// Ensure your .env.local has NEXT_PUBLIC_MAPBOX_TOKEN defined
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

    // Add navigation controls
    map.addControl(new mapboxgl.NavigationControl(), "top-right");

    // Force resize to ensure map fills container correctly on mount
    map.on("load", () => {
      map.resize();

      const incidents = [
        { lng: 11.502, lat: 3.848, title: "Road Accident" },
        { lng: 11.517, lat: 3.872, title: "Robbery Alert" },
        { lng: 11.49, lat: 3.861, title: "Flood Warning" },
      ];

      incidents.forEach((item) => {
        // Create custom element for the marker
        const markerEl = document.createElement("div");
        markerEl.innerHTML = "🚨";
        markerEl.style.fontSize = "28px";
        markerEl.style.cursor = "pointer";

        new mapboxgl.Marker(markerEl)
          .setLngLat([item.lng, item.lat])
          .setPopup(
            new mapboxgl.Popup({ offset: 25 }).setHTML(
              `<strong>${item.title}</strong>`
            )
          )
          .addTo(map);
      });
    });

    mapInstance.current = map;

    return () => {
      map.remove();
      mapInstance.current = null;
    };
  }, []);

  return (
    <main className="relative h-screen w-full overflow-hidden bg-slate-50">
      {/* 
        Map Container 
        Added 'z-0' to ensure it sits at the bottom of the stack
      */}
      <div ref={mapRef} className="absolute inset-0 z-0" />

      {/* 
        Top Card 
        Added 'z-10' to pull it above the map 
      */}
      <div className="absolute z-10 top-4 left-4 right-4 md:right-auto md:w-96 rounded-3xl bg-white/90 backdrop-blur-sm shadow-xl p-5 border border-slate-100">
        <p className="text-sm text-slate-500 font-medium">Live Monitoring</p>
        <h1 className="text-2xl font-bold mt-1 text-slate-900">Yaoundé Incident Map</h1>

        <div className="grid grid-cols-3 gap-3 mt-4 text-center">
          <div className="rounded-2xl bg-slate-100/80 p-3">
            <p className="text-xl font-bold text-slate-800">12</p>
            <p className="text-xs text-slate-500">Reports</p>
          </div>
          <div className="rounded-2xl bg-red-50 p-3">
            <p className="text-xl font-bold text-red-600">4</p>
            <p className="text-xs text-red-500">Urgent</p>
          </div>
          <div className="rounded-2xl bg-blue-50 p-3">
            <p className="text-xl font-bold text-blue-600">3</p>
            <p className="text-xs text-blue-500">Nearby</p>
          </div>
        </div>
      </div>

      {/* 
        Bottom Actions 
        Added 'z-10' here too
      */}
      <div className="absolute z-10 bottom-8 left-4 right-4 md:left-auto md:w-80 rounded-3xl bg-white shadow-2xl p-4 border border-slate-100">
        <button className="w-full rounded-2xl bg-green-500 text-white py-4 font-bold hover:bg-green-600 transition-colors shadow-lg shadow-green-200">
          Share My Location
        </button>

        <button className="w-full mt-3 rounded-2xl bg-red-500 text-white py-4 font-bold hover:bg-red-600 transition-colors shadow-lg shadow-red-200">
          🚨 Emergency SOS
        </button>
      </div>
    </main>
  );
}