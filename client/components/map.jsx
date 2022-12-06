import React from 'react';
import Container from 'react-bootstrap/Container';
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
  if (!data || !center || !isLoaded) return;
  const resultMarkers = Array.isArray(data) ? renderMarkers(data) : null;
  const iconColor = !Array.isArray(data) ? marker.orange : marker.blue;
  return (
    <Container className='shadow p-0 mb-3'>
      <GoogleMap
        zoom={12}
        center={center}
        mapContainerClassName='map'>
        <Marker
          position={center}
          icon={iconColor} />
        {resultMarkers}
      </GoogleMap>
    </Container>
  );
}

function renderMarkers(data) {
  return data.map(data => {
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
}
