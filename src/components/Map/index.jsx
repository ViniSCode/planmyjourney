import { useEffect, useState } from 'react';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import { SearchBar } from './SearchBar';

export default function Map({apiKey}) {
  const [locationInfo, setLocationInfo] = useState({})
  const [results, setResults] = useState([]);
  const [markers, setMarkers] = useState([]);
  const [query, setQuery] = useState('');
  const maxBounds = [
    [-90, -180],
    [90, 180],
  ];

  const handleRemoveMarker = (index) => {
    // Remove the marker with the given index from the markers state
    const updatedMarkers = markers.filter((_, i) => i !== index);
    setMarkers(updatedMarkers);
  };

  useEffect(() => {
    // console.log('markers', markers)
  }, [markers, locationInfo]);
  
  return (
    <div className="w-full h-full">
      <MapContainer
        center={[51.505, -0.09]}
        zoom={10}
        scrollWheelZoom={true}
        minZoom={2}
        maxBounds={maxBounds}
        className="map-container"
      >
        <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <SearchBar
            apiKey={apiKey}
            markers={markers}
            setMarkers={setMarkers}
            setResults={setResults} 
            results={results}
            query={query}
            setQuery={setQuery}
            setLocationInfo={setLocationInfo}
            locationInfo={locationInfo}
          />
        {markers.map((marker, index) => (
          <Marker key={index} position={[marker.lat, marker.lng]} eventHandlers={{
              click: () => handleRemoveMarker(index)
            }}>
          </Marker>
        ))}
      </MapContainer>

      <div className="mt-10">
          {markers && markers.map((place, index) => (
            <p key={index}>1° Location: {place.formatted}</p>
          ))}
      </div>
    </div>
  );
}
