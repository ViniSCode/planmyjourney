import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import 'node_modules/leaflet-geosearch/dist/geosearch.css';
import { useEffect } from 'react';
// import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';

const Search = (props: any) => {
  const map = useMap();
  const { provider } = props;

  // @ts-ignore
  useEffect(() => {
    // @ts-ignore
    const searchControl = new GeoSearchControl({
      provider,
      style: 'bar',
      notFoundMessage: 'Sorry, that location could not be found.',
    });

    map.addControl(searchControl);
    console.log(searchControl.markers);
    return () => map.removeControl(searchControl);
  }, [props, map]);

  return null;
};

export default function Map() {
  return (
    <MapContainer center={[0, 0]} zoom={3} style={{ height: '100%', width: '100%' }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {/* <Marker position={[0, 0]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker> */}
      <Search provider={new OpenStreetMapProvider()} onMarkerAdd={() => console.log('wtf')}/>
    </MapContainer>
  );
}
