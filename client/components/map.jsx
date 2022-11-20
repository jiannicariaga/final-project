import React from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';

const marker = {
  orange: 'http://maps.google.com/mapfiles/ms/icons/orange-dot.png',
  blue: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
};

export default function Map(props) {
  const { data, center } = props;
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.MAPS_API_KEY
  });
  if (!isLoaded) return;
  const resultMarkers = Array.isArray(data)
    ? renderMarkers(data)
    : null;
  const iconColor = !Array.isArray(data)
    ? marker.orange
    : marker.blue;
  return (
    <GoogleMap
      zoom={12}
      center={center}
      mapContainerClassName='map'>
      <Marker
        position={center}
        icon={iconColor} />
      {resultMarkers}
    </GoogleMap>
  );
}

function renderMarkers(data) {
  const markers = data.map(data => {
    const id = data.id;
    const lat = data.coordinates.latitude;
    const lng = data.coordinates.longitude;
    return (
      <Marker
        key={id}
        position={{ lat, lng }}
        icon={marker.orange} />
    );
  });
  return markers;
}
