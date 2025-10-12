import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Card } from "./ui/card";

// Define polygon zones with coordinates
const zones = [
  {
    name: "Zone A3 - Northern Sector",
    coords: [
      [[3.2, 6.7], [3.6, 6.7], [3.6, 6.4], [3.2, 6.4], [3.2, 6.7]]
    ],
    risk: "high",
    color: "#FF3B3B",
    data: {
      area: "245 hectares",
      ndvi: "0.32",
      soilHealth: "38/100",
      erosionRate: "12.5 tons/ha/year",
      issue: "Severe topsoil loss detected",
      recommendation: "Implement contour plowing and plant cover crops immediately"
    }
  },
  {
    name: "Zone B7 - Eastern Area",
    coords: [
      [[8.3, 12.1], [8.7, 12.1], [8.7, 11.8], [8.3, 11.8], [8.3, 12.1]]
    ],
    risk: "moderate",
    color: "#FF8C00",
    data: {
      area: "180 hectares",
      ndvi: "0.54",
      soilHealth: "62/100",
      erosionRate: "6.2 tons/ha/year",
      issue: "Moderate vegetation decline",
      recommendation: "Increase irrigation and apply organic fertilizer"
    }
  },
  {
    name: "Zone C2 - Southern Area",
    coords: [
      [[5.8, 5.3], [6.2, 5.3], [6.2, 5.0], [5.8, 5.0], [5.8, 5.3]]
    ],
    risk: "healthy",
    color: "#00E676",
    data: {
      area: "320 hectares",
      ndvi: "0.78",
      soilHealth: "84/100",
      erosionRate: "1.8 tons/ha/year",
      issue: "Excellent recovery progress",
      recommendation: "Continue current restoration practices"
    }
  },
  {
    name: "Zone D5 - Western Area",
    coords: [
      [[7.2, 10.8], [7.6, 10.8], [7.6, 10.5], [7.2, 10.5], [7.2, 10.8]]
    ],
    risk: "moderate",
    color: "#FF8C00",
    data: {
      area: "195 hectares",
      ndvi: "0.48",
      soilHealth: "58/100",
      erosionRate: "7.5 tons/ha/year",
      issue: "Water stress affecting vegetation",
      recommendation: "Improve water retention through mulching"
    }
  }
];

const EnhancedMapComponent = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [stats, setStats] = useState({
    totalArea: 940,
    avgNdvi: 0.53,
    highRisk: 1,
    healthy: 1
  });

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    mapboxgl.accessToken = "pk.eyJ1IjoibG92YWJsZS1kZXYiLCJhIjoiY20zcnp6N2N3MGN5bzJtczl6N2N4MjRpZyJ9.7pCIJWxvFHWLNMl-KnUHfQ";

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/dark-v11",
      center: [7.0, 9.0],
      zoom: 5.5,
    });

    map.current.addControl(new mapboxgl.NavigationControl(), "top-right");

    map.current.on('load', () => {
      if (!map.current) return;

      // Add polygon zones
      zones.forEach((zone, index) => {
        const sourceId = `zone-${index}`;
        const layerId = `zone-layer-${index}`;

        map.current!.addSource(sourceId, {
          type: 'geojson',
          data: {
            type: 'Feature',
            geometry: {
              type: 'Polygon',
              coordinates: zone.coords
            },
            properties: zone.data
          }
        });

        map.current!.addLayer({
          id: layerId,
          type: 'fill',
          source: sourceId,
          paint: {
            'fill-color': zone.color,
            'fill-opacity': 0.3
          }
        });

        map.current!.addLayer({
          id: `${layerId}-outline`,
          type: 'line',
          source: sourceId,
          paint: {
            'line-color': zone.color,
            'line-width': 2
          }
        });

        // Add popup on click
        map.current!.on('click', layerId, (e) => {
          if (!e.features || !e.features[0].properties) return;
          
          const props = e.features[0].properties;
          new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML(`
              <div style="padding: 16px; background: #0F1419; border: 2px solid #00FF41; border-radius: 8px; min-width: 280px; color: white;">
                <h3 style="font-weight: bold; margin-bottom: 12px; color: #00FF41; font-size: 16px;">${zone.name}</h3>
                <div style="space-y: 8px;">
                  <div style="display: flex; justify-between; margin-bottom: 8px;">
                    <span style="color: #A1A1AA; font-size: 13px;">Area:</span>
                    <span style="font-weight: 600; font-size: 13px;">${props.area}</span>
                  </div>
                  <div style="display: flex; justify-between; margin-bottom: 8px;">
                    <span style="color: #A1A1AA; font-size: 13px;">NDVI:</span>
                    <span style="font-weight: 600; font-size: 13px;">${props.ndvi}</span>
                  </div>
                  <div style="display: flex; justify-between; margin-bottom: 8px;">
                    <span style="color: #A1A1AA; font-size: 13px;">Soil Health:</span>
                    <span style="font-weight: 600; font-size: 13px;">${props.soilHealth}</span>
                  </div>
                  <div style="display: flex; justify-between; margin-bottom: 8px;">
                    <span style="color: #A1A1AA; font-size: 13px;">Erosion Rate:</span>
                    <span style="font-weight: 600; font-size: 13px;">${props.erosionRate}</span>
                  </div>
                  <div style="border-top: 1px solid #00FF4130; padding-top: 8px; margin-top: 8px;">
                    <p style="color: #A1A1AA; font-size: 12px; margin-bottom: 4px;">Issue Detected:</p>
                    <p style="font-size: 13px; margin-bottom: 8px;">${props.issue}</p>
                  </div>
                  <div style="border-top: 1px solid #00FF4130; padding-top: 8px;">
                    <p style="color: #A1A1AA; font-size: 12px; margin-bottom: 4px;">Recommended Action:</p>
                    <p style="font-size: 13px; margin-bottom: 12px;">${props.recommendation}</p>
                  </div>
                  <div style="display: flex; gap: 8px;">
                    <button style="flex: 1; background: #00FF41; color: #000000; font-weight: 600; padding: 8px; border-radius: 6px; border: none; cursor: pointer; font-size: 13px;">
                      View Details
                    </button>
                    <button style="flex: 1; background: transparent; color: #00FF41; font-weight: 600; padding: 8px; border-radius: 6px; border: 1px solid #00FF41; cursor: pointer; font-size: 13px;">
                      Get Help
                    </button>
                  </div>
                </div>
              </div>
            `)
            .addTo(map.current!);
        });

        // Change cursor on hover
        map.current!.on('mouseenter', layerId, () => {
          if (map.current) map.current.getCanvas().style.cursor = 'pointer';
        });
        map.current!.on('mouseleave', layerId, () => {
          if (map.current) map.current.getCanvas().style.cursor = '';
        });
      });
    });

    return () => {
      map.current?.remove();
    };
  }, []);

  return (
    <div className="space-y-4 relative">
      {/* Live Data Indicator */}
      <div className="absolute top-4 right-4 z-10 bg-[#0F1419]/90 backdrop-blur-sm border border-primary/30 rounded-lg px-3 py-2 flex items-center gap-2">
        <div className="w-2 h-2 bg-primary rounded-full animate-pulse shadow-[0_0_10px_rgba(0,255,65,0.8)]" />
        <span className="text-xs font-semibold text-primary">LIVE DATA</span>
      </div>

      {/* Stats Overlay */}
      <div className="absolute top-4 left-4 z-10 bg-[#0F1419]/90 backdrop-blur-sm border border-primary/30 rounded-lg p-3 space-y-2">
        <div className="flex justify-between gap-8">
          <span className="text-xs text-muted-foreground">Total Area:</span>
          <span className="text-xs font-semibold">{stats.totalArea} ha</span>
        </div>
        <div className="flex justify-between gap-8">
          <span className="text-xs text-muted-foreground">Avg NDVI:</span>
          <span className="text-xs font-semibold">{stats.avgNdvi}</span>
        </div>
        <div className="flex justify-between gap-8">
          <span className="text-xs text-muted-foreground">High Risk:</span>
          <span className="text-xs font-semibold text-status-risk">{stats.highRisk}</span>
        </div>
        <div className="flex justify-between gap-8">
          <span className="text-xs text-muted-foreground">Healthy:</span>
          <span className="text-xs font-semibold text-status-healthy">{stats.healthy}</span>
        </div>
      </div>

      <div
        ref={mapContainer}
        className="w-full h-64 rounded-lg overflow-hidden border border-border"
      />
      
      {/* Legend */}
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
          <span className="text-muted-foreground">Healthy</span>
        </div>
      </div>
    </div>
  );
};

export default EnhancedMapComponent;