import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";
import"./map.css"
import L from "leaflet"
import LeafttFeocoder from './LeafttGeocoder';
const MyMap = () => {
  const position = [36.8065, 10.1518]

  return (
    <div className='mpp'>
<MapContainer center={[37.189, 10.1946]} zoom={13} scrollWheelZoom={false}>
  <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />


 <LeafttFeocoder/> 

</MapContainer>
</div>
  )
}
let defaulticon = L.icon({
  iconUrl:"https://unpkg.com/leaflet@1.6/dist/images/marker-icon.png"
});
L.Marker.prototype.options.icon=defaulticon;
export default MyMap;
