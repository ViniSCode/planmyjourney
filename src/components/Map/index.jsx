import { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { SearchBar } from './SearchBar';

export default function Map({apiKey, markers, setMarkers}) {
  const [results, setResults] = useState([]);
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
  }, [markers]);
  
  return (
    <div className="w-full h-full">
      <MapContainer
        center={[-27.762680689038014, -54.48266029357911]}
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
              click: () => handleRemoveMarker(index),
              // mouseover: () => display tooltip
            }}>
            <Popup keepInView>{marker.formatted}</Popup>
          </Marker>
        ))}
      </MapContainer>
      
      {/* <div className="mt-10 flex flex-wrap gap-2">
          {markers && markers.map((place, index) => (
            <p key={index} className='text-sm flex gap-2 items-center justify-between shadow-lg px-4 py-2 rounded-md max-w-fit'>{index + 1}° Location: {place.formatted} <RiEdit2Fill className="text-red-500" size={15}/><RiDeleteBin5Fill className="text-red-500" size={15}/></p>
          ))}
      </div> */}
    </div>
  );
}
