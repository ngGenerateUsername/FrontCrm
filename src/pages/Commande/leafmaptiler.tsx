import { environment } from './../../env';
import React, { useEffect, useState, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

mapboxgl.accessToken = environment.mapbox.accessToken;

function MyMapnew() {
  const mapContainerRef = useRef(null);
  const map = useRef(null);
  
  const [lng] = useState(-97.7431);
  const [lat] = useState(30.2672);
  const [zoom] = useState(2);

  useEffect(() => {
    // Initialize the map
    map.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom,
    });

    // Add navigation control (the +/- zoom buttons)
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Add geocoder control to the map
    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
    });
    map.current.addControl(geocoder, 'top-left');

    // Clean up on unmount
    return () => map.current.remove();
  }, [lat, lng, zoom]);

  // Return the map container ref
  return <div ref={mapContainerRef} style={{ width: '100%', height: '400px' }} />;
}

export default MyMapnew;
