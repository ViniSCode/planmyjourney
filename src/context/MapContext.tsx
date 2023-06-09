import { ReactNode, createContext, useEffect, useState } from "react";

interface MapContextProviderProps {
  children: ReactNode;
  apiKey: string;
}

export interface Marker {
  lat: number;
  lng: number;
  formatted: string;
  country: string;
  country_code: string;
  state: string;
  state_code: string;
}

interface MapContextPropsData {
  results: any;
  markers: Marker[];
  query: string;
  loading: boolean;
  isModalOpen: boolean;
  setLoading: any;
  setQuery: any;
  setMarkers: any;
  setIsModalOpen: any;
}

export const MapContext = createContext<MapContextPropsData>(
  {} as MapContextPropsData
);

export function MapContextProvider({
  children,
  apiKey,
}: MapContextProviderProps) {
  const [markers, setMarkers] = useState([]);
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // search location
  useEffect(() => {
    // convert query to coordinates
    const endpoint = `https://api.opencagedata.com/geocode/v1/json?key=${apiKey}&q=${encodeURIComponent(
      query
    )}&limit=5`;

    const delayDebounceFn = setTimeout(() => {
      if (query) {
        setLoading(true);
        fetch(endpoint)
          .then((response) => response.json())
          .then((data) => {
            // Extract the coordinates from the API response
            setResults(data.results);
          })
          .catch((error) => {
            console.error(error);
          })
          .finally(() => {
            setLoading(false);
          });
      } else {
        setResults([]);
      }
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  return (
    <MapContext.Provider
      value={{
        results,
        markers,
        query,
        setQuery,
        loading,
        setLoading,
        setMarkers,
        isModalOpen,
        setIsModalOpen,
      }}
    >
      {children}
    </MapContext.Provider>
  );
}
