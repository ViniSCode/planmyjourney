import { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { GetDirections } from "./GetDirections";
export default function LocationMap({ markers, goToLocation }) {
  const [coords, setCoords] = useState([0, 0]);

  useEffect(() => {
    if (goToLocation) {
      setCoords([goToLocation.lat, goToLocation.lng]);
    }
  }, [goToLocation]);

  const maxBounds = [
    [-90, -180],
    [90, 180],
  ];

  return (
    <div className="w-full h-full">
      <MapContainer
        center={[markers[0].lat, markers[0].lng]}
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
        <GetDirections coords={coords} location={markers} />
        {markers.map((marker, index) => (
          <Marker key={index} position={[marker.lat, marker.lng]}>
            <Popup keepInView>{marker.formatted}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
