import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

// Mock locations with risk levels
const mockLocations = [
  { name: "Lagos Region", coords: [3.3792, 6.5244], risk: "high" },
  { name: "Kano Plains", coords: [8.5167, 11.9667], risk: "moderate" },
  { name: "Niger Delta", coords: [6.0, 5.5], risk: "high" },
  { name: "Abuja Zone", coords: [7.4951, 9.0579], risk: "low" },
  { name: "Kaduna Area", coords: [7.4383, 10.5225], risk: "moderate" },
];

const MapComponent = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    // Note: Using a public token for demo purposes
    mapboxgl.accessToken = "pk.eyJ1IjoibG92YWJsZS1kZXYiLCJhIjoiY20zcnp6N2N3MGN5bzJtczl6N2N4MjRpZyJ9.7pCIJWxvFHWLNMl-KnUHfQ";

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/dark-v11",
      center: [7.0, 9.0], // Nigeria center
      zoom: 5.5,
    });

    map.current.addControl(new mapboxgl.NavigationControl(), "top-right");

    // Add markers
    mockLocations.forEach((location) => {
      const color =
        location.risk === "high"
          ? "#EF4444"
          : location.risk === "moderate"
          ? "#EAB308"
          : "#10B981";

      const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
        <div style="padding: 12px; background: #0F1419; border: 2px solid #00FF41; border-radius: 8px; min-width: 200px;">
          <h3 style="font-weight: bold; margin-bottom: 8px; color: #FFFFFF; font-size: 16px;">${location.name}</h3>
          <div style="display: flex; justify-between; align-items: center; margin-bottom: 8px;">
            <span style="color: #A1A1AA; font-size: 12px;">Risk Level:</span>
            <span style="color: ${color}; font-weight: 600; text-transform: uppercase; font-size: 14px;">
              ${location.risk}
            </span>
          </div>
          <button style="width: 100%; background: #00FF41; color: #000000; font-weight: 600; padding: 8px; border-radius: 6px; border: none; cursor: pointer; margin-top: 8px;">
            View Details →
          </button>
        </div>
      `);

      new mapboxgl.Marker({ color })
        .setLngLat(location.coords as [number, number])
        .setPopup(popup)
        .addTo(map.current!);
    });

    return () => {
      map.current?.remove();
    };
  }, []);

  return (
    <div className="space-y-4">
      <div
        ref={mapContainer}
        className="w-full h-64 rounded-lg overflow-hidden border border-border"
      />
      <div className="flex gap-4 text-xs">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-status-risk" />
          <span className="text-muted-foreground">High Risk</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-status-moderate" />
          <span className="text-muted-foreground">Moderate</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-status-healthy" />
          <span className="text-muted-foreground">Low Risk</span>
        </div>
      </div>
    </div>
  );
};

export default MapComponent;
