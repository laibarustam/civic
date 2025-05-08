import { LoadScript, GoogleMap } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px',
};

const center = {
  lat: 33.6844,
  lng: 73.0479,
};

export default function ReportMap() {
  return (
    <div className="max-w-4xl mx-auto mb-10">
      <h3 className="text-xl font-semibold mb-4">Google Map - Issue Locations</h3>
      <div className="rounded shadow overflow-hidden">
        <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={13}
          >
            {/* We'll add markers or heatmap later */}
          </GoogleMap>
        </LoadScript>
      </div>
    </div>
  );
}
