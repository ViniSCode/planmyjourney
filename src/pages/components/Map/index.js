import { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from 'react-leaflet';

// interface ResultProps {
//   annotations: any;
//   bounds: any;
//   confidence: number;
//   formatted: string;1
//   geometry: {
//     lat: number,
//     lng: number;
//   };
//   components: {
//     "ISO_3166-1_alpha-2": string;
//     "ISO_3166-1_alpha-3": string;
//     city: string;
//     continent: string;
//     country: string;
//     country_code: string;
//     region: string;
//     state: string;
//     state_code: string;
//     _type: string;
//     _category: string;
//   }
// }

export default function Map() {
  const [results, setResults] = useState([])
  const [markers, setMarkers] = useState([]);

  function SearchBar() {
    const [query, setQuery] = useState('');

    const map = useMapEvents({
      click(e) {
        // Check if the target of the click event is an input element
        if (e.originalEvent.target.tagName.toLowerCase() !== 'input') {
          setMarkers([...markers, e.latlng]);
        }
      },
    });

    useEffect(() => {
      // Use a geocoding service to convert query to coordinates
      const endpoint = `https://api.opencagedata.com/geocode/v1/json?key=APIKEY&q=${encodeURIComponent(query)}`;

      // Use setTimeout to wait for user to stop typing
      const delayDebounceFn = setTimeout(() => {
        if (query.trim() !== '') {
          fetch(endpoint)
            .then(response => response.json())
            .then(data => {
              // Extract the coordinates from the API response
              const coordinates = data.results[0].geometry;
              setResults(data.results)
              // Add the coordinates to the markers state
              setMarkers([...markers, coordinates]);
            })
            .catch(error => {
              console.error(error);
            });
        }
      }, 1000);

      // Cancel the previous setTimeout on useEffect cleanup
      return () => clearTimeout(delayDebounceFn);
    }, [query]);

    return (
      <div className='absolute z-[9999] w-full max-w-[620px] bottom-0 right-0 left-0 mx-auto mb-4 bg-white rounded-full flex items-center justify-center'>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full py-4 px-12 rounded-full placeholder:text-[16px] placeholder:text-black"
          placeholder='Search a location'
        />
        {results && (
          results.map((result, index) => {
            console.log(result?.formatted)
          })
        )}
      </div>
    );
  }

  const handleMarkerClick = (index) => {
    // Remove the marker with the given index from the markers state
    const updatedMarkers = markers.filter((_, i) => i !== index);
    setMarkers(updatedMarkers);
  };

  useEffect(() => {
    // Update markers state when the markers array changes
    console.log(markers);
  }, [markers]);

  return (
    <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false} className="map-container">
      <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <SearchBar />
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
