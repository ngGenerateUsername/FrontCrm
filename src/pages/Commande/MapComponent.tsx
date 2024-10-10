import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import { environment } from './../../env';
type MapComponentProps = {
    setAdressCommande: (address: any) => void;
  };
  const MapComponent: React.FC<MapComponentProps> = ({ setAdressCommande }) => {
    const mapContainer = useRef(null);


  useEffect(() => {
mapboxgl.accessToken = environment.mapbox.accessToken;
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-79.4512, 43.6568],
      zoom: 13
    });

    const coordinatesGeocoder = (query:any) => {
      const matches = query.match(
        /^[ ]*(?:Lat: )?(-?\d+\.?\d*)[, ]+(?:Lng: )?(-?\d+\.?\d*)[ ]*$/i
      );
      if (!matches) {
        return null;
      }

      const coordinateFeature = (lng:any, lat:any) => ({
        center: [lng, lat],
        geometry: {
          type: 'Point',
          coordinates: [lng, lat]
        },
        place_name: 'Lat: ' + lat + ' Lng: ' + lng,
        place_type: ['coordinate'],
        properties: {},
        type: 'Feature'
      });

      const coord1 = Number(matches[1]);
      const coord2 = Number(matches[2]);
      const geocodes = [];

      if (coord1 < -90 || coord1 > 90) {
        geocodes.push(coordinateFeature(coord1, coord2));
      }

      if (coord2 < -90 || coord2 > 90) {
        geocodes.push(coordinateFeature(coord2, coord1));
      }

      if (geocodes.length === 0) {
        geocodes.push(coordinateFeature(coord1, coord2));
        geocodes.push(coordinateFeature(coord2, coord1));
      }

      return geocodes;
    };

    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
   //   localGeocoder: coordinatesGeocoder,
      zoom: 13,
      placeholder: 'entrer une adress',
      
      mapboxgl: mapboxgl,
      reverseGeocode: true
    });
    geocoder.on('result', (e) => {
        const selectedAddress = e.result.place_name;
        setAdressCommande(selectedAddress);
      });
    map.addControl(geocoder);

    // Cleanup on unmount
    return () => map.remove();
  }, [setAdressCommande]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '400px' }}>
      <div 
        ref={mapContainer} 
        style={{ 
          position: 'absolute', 
          right: '0', 
          width: '50%', 
          height: '100%' 
        }} 
      />
    </div>
  );};

export default MapComponent;
