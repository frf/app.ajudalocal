import React from 'react';
import { MapContainer, MapContainerProps, TileLayer } from 'react-leaflet'


interface MapProps extends MapContainerProps {
  interactive?: boolean
  children: React.ReactNode
}

export default function Map({ children, interactive = true, ...props }: MapProps) {
  return (
    <MapContainer
      center={[-27.2092052,-49.6401092]} 
      zoom={15} 
      style={{ width: '100%', height: '100%' }}
      dragging={interactive}
      touchZoom={interactive}
      zoomControl={interactive}
      scrollWheelZoom={interactive}
      doubleClickZoom={interactive}
      {...props}
    >
    
      <TileLayer 
        url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
      />
      {children}
    </MapContainer>
  );
}

