"use client";

import Map, { Marker, NavigationControl } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

export default function MapPage() {
  const incidents = [
    {
      id: 1,
      lat: 3.848,
      lng: 11.502,
      type: "Accident",
    },
    {
      id: 2,
      lat: 3.872,
      lng: 11.517,
      type: "Robbery",
    },
    {
      id: 3,
      lat: 3.861,
      lng: 11.49,
      type: "Flood",
    },
  ];

  return (
    <main className="relative h-screen w-full">
      <Map
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        initialViewState={{
          longitude: 11.5021,
          latitude: 3.848,
          zoom: 12,
        }}
        mapStyle="mapbox://styles/mapbox/streets-v12"
      >
        <NavigationControl position="top-right" />

        {incidents.map((item) => (
          <Marker
            key={item.id}
            longitude={item.lng}
            latitude={item.lat}
            anchor="bottom"
          >
            <div className="text-2xl cursor-pointer">🚨</div>
          </Marker>
        ))}
      </Map>

      {/* Top Card */}
      <div className="absolute top-4 left-4 right-4 md:right-auto md:w-96 rounded-3xl bg-white shadow-xl p-4">
        <p className="text-sm text-slate-500">Live Monitoring</p>
        <h1 className="text-2xl font-bold mt-1">Yaoundé Incident Map</h1>

        <div className="mt-4 grid grid-cols-3 gap-3 text-center">
          <div className="rounded-2xl bg-slate-100 p-3">
            <p className="text-lg font-bold">12</p>
            <p className="text-xs text-slate-500">Reports</p>
          </div>

          <div className="rounded-2xl bg-slate-100 p-3">
            <p className="text-lg font-bold">4</p>
            <p className="text-xs text-slate-500">Urgent</p>
          </div>

          <div className="rounded-2xl bg-slate-100 p-3">
            <p className="text-lg font-bold">3</p>
            <p className="text-xs text-slate-500">Nearby</p>
          </div>
        </div>
      </div>

      {/* Bottom Mobile Actions */}
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