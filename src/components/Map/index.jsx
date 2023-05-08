import useMap from "@/hooks/useMap";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { SearchBar } from "./SearchBar";

export default function Map({ apiKey, markers, setMarkers }) {
  const { results, setResults, query, setQuery } = useMap();

  const maxBounds = [
    [-90, -180],
    [90, 180],
  ];

  const handleRemoveMarker = (index) => {
    // Remove the marker with the given index from the markers state
    const updatedMarkers = markers.filter((_, i) => i !== index);
    setMarkers(updatedMarkers);
  };

  return (
    <div className="w-full h-full">
      <MapContainer
        center={[-23.580240737140624, -46.678485074276736]}
        zoom={10}
        scrollWheelZoom={true}
        minZoom={2}
        maxBounds={maxBounds}
        className="map-container"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
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
          <Marker
            key={index}
            position={[marker.lat, marker.lng]}
            eventHandlers={{
              click: () => handleRemoveMarker(index),
              // mouseover: () => display tooltip
            }}
          >
            <Popup keepInView>{marker.formatted}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
