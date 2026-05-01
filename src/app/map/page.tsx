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
          setStatus("Missing Mapbox token");
          return;
        }

        const mapboxgl = (await import("mapbox-gl")).default;

        mapboxgl.accessToken = token.trim();

        map = new mapboxgl.Map({
          container: mapContainer.current!,
          style: "mapbox://styles/mapbox/light-v11",
          center: [11.5021, 3.848], // Yaoundé
          zoom: 13,
          pitch: 55,
          bearing: -20,
          antialias: true,
        });

        map.addControl(
          new mapboxgl.NavigationControl(),
          "top-right"
        );

        map.on("load", () => {
          setStatus("Map loaded");

          map.resize();

          map.easeTo({
            center: [11.5021, 3.848],
            zoom: 14.5,
            pitch: 65,
            bearing: -25,
            duration: 2500,
          });

          const layers = map.getStyle().layers;

          const labelLayerId = layers.find(
            (layer: any) =>
              layer.type === "symbol" &&
              layer.layout &&
              layer.layout["text-field"]
          )?.id;

          map.addLayer(
            {
              id: "3d-buildings",
              source: "composite",
              "source-layer": "building",
              filter: ["==", "extrude", "true"],
              type: "fill-extrusion",
              minzoom: 13,
              paint: {
                "fill-extrusion-color": "#dbeafe",
                "fill-extrusion-height": [
                  "interpolate",
                  ["linear"],
                  ["zoom"],
                  13,
                  0,
                  15,
                  ["get", "height"],
                ],
                "fill-extrusion-base": [
                  "interpolate",
                  ["linear"],
                  ["zoom"],
                  13,
                  0,
                  15,
                  ["get", "min_height"],
                ],
                "fill-extrusion-opacity": 0.9,
              },
            },
            labelLayerId
          );

          // Incident Marker
          new mapboxgl.Marker({
            color: "#ef4444",
          })
            .setLngLat([11.5021, 3.848])
            .setPopup(
              new mapboxgl.Popup().setHTML(
                "<strong>Emergency Incident</strong>"
              )
            )
            .addTo(map);
        });

        map.on("error", () => {
          setStatus("Map error");
        });
      } catch (error) {
        console.error(error);
        setStatus("Failed to initialize");
      }
    }

    initMap();

    return () => {
      if (map) map.remove();
    };
  }, []);

  return (
    <main className="relative h-screen w-screen overflow-hidden bg-slate-100">
      {/* Map */}
      <div
        ref={mapContainer}
        className="absolute inset-0"
      />

      {/* Status */}
      <div className="absolute z-50 top-4 left-4 rounded-2xl bg-white px-4 py-2 shadow-lg font-medium">
        {status}
      </div>

      {/* Top Stats */}
      <div className="absolute z-40 top-20 left-4 right-4 md:right-auto md:w-96 rounded-3xl bg-white/95 backdrop-blur p-5 shadow-2xl">
        <p className="text-sm text-slate-500">
          Live Monitoring
        </p>

        <h1 className="text-2xl font-bold mt-1">
          Yaoundé 3D Incident Map
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
      <div className="absolute z-40 bottom-6 left-4 right-4 md:left-auto md:w-80 rounded-3xl bg-white p-4 shadow-2xl">
        <button className="w-full rounded-2xl bg-green-500 py-4 text-white font-bold hover:bg-green-600 transition">
          Share My Location
        </button>

        <button className="mt-3 w-full rounded-2xl bg-red-500 py-4 text-white font-bold hover:bg-red-600 transition">
          🚨 Emergency SOS
        </button>
      </div>
    </main>
  );
}