import React, { useEffect, useState, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.heat";
import { useTheme } from "@emotion/react";

const MapComponent = () => {
  const [mapData, setMapData] = useState(null);
  const [error, setError] = useState(null);
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const theme = useTheme();
  const [tile, setTile] = useState();

  useEffect(() => {
    try {
      const tileTheme =
        theme.palette.mode === "dark"
          ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          : "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png";
      theme && setTile(tileTheme);
    } catch (err) {
      console.error("Error setting tile theme:", err);
      setError("Failed to load the map theme.");
    }
  }, [theme]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/map")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => setMapData(data))
      .catch((err) => {
        console.error("Error fetching map data:", err);
        setError("Failed to load map data.");
      });
  }, []);

  useEffect(() => {
    if (mapData && mapContainerRef.current && tile) {
      try {
        if (!mapInstanceRef.current) {
          mapInstanceRef.current = L.map(mapContainerRef.current, {
            center: mapData.center,
            zoom: mapData.zoom,
            maxBounds: mapData.bounds,
            zoomControl: false,
            attributionControl: false,
          });

          L.tileLayer(tile, {
            maxZoom: 19,
            attribution: "© OpenStreetMap contributors & CartoDB",
          }).addTo(mapInstanceRef.current);
        }

        mapInstanceRef.current.eachLayer((layer) => {
          if (
            layer instanceof L.Marker ||
            layer instanceof L.CircleMarker ||
            layer instanceof L.LayerGroup
          ) {
            mapInstanceRef.current.removeLayer(layer);
          }
        });

        const heatData = mapData.locations.map((location) => {
          return [location.latitude, location.longitude, location.count];
        });

        L.heatLayer(heatData, {
          radius: 30, // Adjust the radius of heat points
          blur: 30, // Adjust the blur of heat points
          maxZoom: mapInstanceRef.current.getMaxZoom(), // Max zoom for heat intensity
        }).addTo(mapInstanceRef.current);

        mapData.locations.forEach((location) => {
          const customIcon = L.divIcon({
            className: "custom-car-icon",
            html: `<div class="bubble-content">
                                    ${location.count}
                               </div>`,
            iconSize: [30, 30],
            iconAnchor: [15, 30],
          });

          const marker = L.marker([location.latitude, location.longitude], {
            icon: customIcon,
          });

          marker.on("mouseover", function () {
            const bubble = this.getElement().querySelector(".bubble-content");
            bubble.style.padding = "10px 20px";
            bubble.innerHTML = `<div>${location.count}</div><div style="font-size: 12px;">${location.location}</div>`;
          });

          marker.on("mouseout", function () {
            const bubble = this.getElement().querySelector(".bubble-content");
            bubble.style.padding = "5px 10px";
            bubble.innerHTML = `${location.count}`;
          });

          marker.addTo(mapInstanceRef.current);
        });
      } catch (err) {
        console.error("Error initializing the map or adding layers:", err);
        setError("Failed to initialize the map.");
      }
    }
  }, [mapData, tile]);

  return (
    <div className="map-holder">
      {error ? (
        <p>{error}</p>
      ) : mapData ? (
        <div ref={mapContainerRef} className="map-container"></div>
      ) : (
        <p>Loading map...</p>
      )}
    </div>
  );
};

export default MapComponent;
