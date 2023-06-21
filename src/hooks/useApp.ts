import { AppContext } from "@/context/AppContext";
import { useContext } from "react";

export default function useApp() {
  const { setQuerySearch, querySearch } = useContext(AppContext);

  return {
    setQuerySearch,
    querySearch,
  };
}
