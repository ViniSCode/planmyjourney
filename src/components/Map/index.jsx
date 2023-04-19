import { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { SearchBar } from './SearchBar';

export default function Map({apiKey}) {
  const [results, setResults] = useState([]);
  const [markers, setMarkers] = useState([]);
  const [query, setQuery] = useState('');
  const maxBounds = [
    [-90, -180],
    [90, 180],
  ];

  const handleMarkerClick = (index) => {
    // Remove the marker with the given index from the markers state
    const updatedMarkers = markers.filter((_, i) => i !== index);
    setMarkers(updatedMarkers);
  };

  useEffect(() => {
    // Update markers state when the markers array changes
  }, [markers]);


  return (
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
        />
      {markers.map((marker, index) => (
        <Marker key={index} position={[marker.lat, marker.lng]} eventHandlers={{
            click: () => handleMarkerClick(index)
          }}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
