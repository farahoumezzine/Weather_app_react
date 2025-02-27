import { useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const API_KEY = "1813084324f0d44c81050f0d28cc0d69";

function WeatherMap({ lat, lon, layers = ['temp', 'clouds'] }) {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    if (!mapInstanceRef.current) {
      mapInstanceRef.current = L.map(mapRef.current).setView([lat, lon], 10);
      
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(mapInstanceRef.current);

      // Add weather layers
      layers.forEach(layer => {
        L.tileLayer(`https://tile.openweathermap.org/map/${layer}/{z}/{x}/{y}.png?appid=${API_KEY}`)
          .addTo(mapInstanceRef.current);
      });
    }

    // Update map center when coordinates change
    mapInstanceRef.current.setView([lat, lon]);

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [lat, lon, layers]);

  return <div ref={mapRef} style={{ height: '400px', width: '100%' }} />;
}

export default WeatherMap; 