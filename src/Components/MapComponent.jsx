import React, { useEffect, useState, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.heat'; // Import the Leaflet heatmap plugin
import { useTheme } from '@emotion/react';

const MapComponent = () => {
    const [mapData, setMapData] = useState(null);
    const mapContainerRef = useRef(null);
    const mapInstanceRef = useRef(null);
    const theme = useTheme();
    const [tile, setTile] = useState();

    useEffect(() => {
      console.log("theme: ",theme.palette.mode)
      const tileTheme = theme.palette.mode === "dark" ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png' : 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png';
      theme && setTile(tileTheme)
    }, [theme])


    useEffect(() => {
        fetch('http://127.0.0.1:5000/map')
            .then(response => response.json())
            .then(data => setMapData(data));
    }, []);

    useEffect(() => {
        if (mapData && mapContainerRef.current && tile) {
            if (!mapInstanceRef.current) {
                // Initialize the Leaflet map inside the container
                mapInstanceRef.current = L.map(mapContainerRef.current, {
                    center: mapData.center,
                    zoom: mapData.zoom,
                    maxBounds: mapData.bounds,
                    zoomControl: false,
                    attributionControl: false,
                });
                
                L.tileLayer(tile, {
                  maxZoom: 19,
                  attribution: '© OpenStreetMap contributors & CartoDB',
              }).addTo(mapInstanceRef.current);
              
                            
            }

            // Clear existing markers and layers before adding new ones
            mapInstanceRef.current.eachLayer(layer => {
                if (layer instanceof L.Marker || layer instanceof L.CircleMarker || layer instanceof L.LayerGroup) {
                    mapInstanceRef.current.removeLayer(layer);
                }
            });

            // Prepare heatmap data
            const heatData = mapData.locations.map(location => {
                return [location.latitude, location.longitude, location.count];
            });

            // Add the heatmap layer
            const heat = L.heatLayer(heatData, { 
                radius: 30, // Adjust the radius of heat points
                blur: 30,   // Adjust the blur of heat points
                maxZoom: mapInstanceRef.current.getMaxZoom(), // Max zoom for heat intensity
            }).addTo(mapInstanceRef.current);

            // Add markers to the map
            mapData.locations.forEach(location => {
                const customIcon = L.divIcon({
                    className: 'custom-car-icon',
                    html: `<div class="bubble-content">
                                ${location.count}
                           </div>`,
                    iconSize: [30, 30],
                    iconAnchor: [15, 30],
                });

                // Create marker with the custom icon
                const marker = L.marker([location.latitude, location.longitude], { icon: customIcon });

                // Add event listeners for hover to expand the bubble and show the city name
                marker.on('mouseover', function() {
                    const bubble = this.getElement().querySelector('.bubble-content');
                    bubble.style.padding = '10px 20px';
                    bubble.innerHTML = `<div>${location.count}</div><div style="font-size: 12px;">${location.location}</div>`;
                });

                marker.on('mouseout', function() {
                    const bubble = this.getElement().querySelector('.bubble-content');
                    bubble.style.padding = '5px 10px';
                    bubble.innerHTML = `${location.count}`;
                });

                marker.addTo(mapInstanceRef.current);
            });
        }
    }, [mapData]);

    return (
        <div className='map-holder'>
            {mapData ? (
                <div ref={mapContainerRef} className="map-container"></div>
            ) : (
                <p>Loading map...</p>
            )}
        </div>
    );
};

export default MapComponent;
