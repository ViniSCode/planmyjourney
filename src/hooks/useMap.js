import { MapContext } from "@/context/MapContext";
import { useContext } from "react";

export default function useMap() {
  const {
    results,
    markers,
    query,
    setQuery,
    loading,
    setLoading,
    setMarkers,
    isModalOpen,
    setIsModalOpen,
  } = useContext(MapContext);

  return {
    results,
    markers,
    query,
    setQuery,
    loading,
    setLoading,
    setMarkers,
    isModalOpen,
    setIsModalOpen,
  };
}
