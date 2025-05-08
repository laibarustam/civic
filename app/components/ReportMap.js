import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, HeatmapLayer } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px',
};

const defaultCenter = {
  lat: 33.6844, // Default center: Pakistan example
  lng: 73.0479,
};

const ReportMap = ({ selectedLocation }) => {
  const [heatmapData, setHeatmapData] = useState([]);

  useEffect(() => {
    if (typeof window.google !== 'undefined' && selectedLocation?.length) {
      const points = selectedLocation.map((loc) =>
        new window.google.maps.LatLng(loc.latitude, loc.longitude)
      );
      setHeatmapData(points);
    }
  }, [selectedLocation]);

  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY} libraries={['visualization']}>
      <GoogleMap mapContainerStyle={containerStyle} center={defaultCenter} zoom={10}>
        {heatmapData.length > 0 && (
          <HeatmapLayer
            data={heatmapData}
            options={{
              radius: 20,
              opacity: 0.6,
            }}
          />
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default ReportMap;
