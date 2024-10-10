import React, { useEffect } from "react";
import L from "leaflet";
import { useMap } from "react-leaflet";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";

const LeafletGeocoder: React.FC = () => {
  const map = useMap();

  useEffect(() => {
    const geocoder = (L.Control as any).geocoder({
      defaultMarkGeocode: false
    })
    .on('markgeocode', function(e:any) {
      const bbox = e.geocode.bbox;
      if (bbox) {
        const bounds = L.latLngBounds([bbox[0], bbox[1]], [bbox[2], bbox[3]]);
        map.fitBounds(bounds);
      } else {
        console.error('Bounding box not found in geocode result:', e.geocode);
        
      }
    })
    
    
      .addTo(map);
      
    return () => {
     geocoder.removeFrom(map);
    };
  }, [map]);
  
  return null;
};

export default LeafletGeocoder;
