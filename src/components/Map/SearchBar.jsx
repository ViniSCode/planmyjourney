import { FiX } from "react-icons/fi";
import { RiSearch2Line } from "react-icons/ri";
import { useMap, useMapEvents } from "react-leaflet";
import { PulseLoader } from "react-spinners";
import { toast } from "react-toastify";

export function SearchBar({
  apiKey,
  markers,
  setMarkers,
  setResults,
  results,
  query,
  setQuery,
}) {
  const { loading, setLoading } = useMap();

  // Add marker
  const map = useMapEvents({
    click(e) {
      // Check if the target of the click event isn't the map
      if (
        !document.querySelector(".searchbar").contains(e.originalEvent.target)
      ) {
        if (markers.length === 15) {
          toast.warn("Oops! Maximum of 15 locations allowed.");
          return;
        }

        fetch(
          `https://api.opencagedata.com/geocode/v1/json?q=${e.latlng.lat}+${e.latlng.lng}&key=${apiKey}`
        )
          .then((response) => response.json())
          .then((data) => {
            if (data.results[0]) {
              data.results[0].components.country;
              setMarkers([
                ...markers,
                {
                  lat: e.latlng.lat,
                  lng: e.latlng.lng,
                  formatted: data.results[0].formatted,
                  country: data.results[0].components.country,
                  country_code:
                    data.results[0].components["ISO_3166-1_alpha-2"],
                  state: data.results[0].components.state,
                  state_code: data.results[0].components.state_code,
                },
              ]);
            }
          });
      }
    },
  });

  // go to location
  const handleResultClick = (result) => {
    setQuery("");
    const coordinates = result.geometry;
    // Move the map to the clicked result
    map.flyTo(coordinates, 15);

    // Add a marker to the clicked result
    setMarkers([
      ...markers,
      {
        lat: coordinates.lat,
        lng: coordinates.lng,
        formatted: result.formatted,
        country: result.components.country,
        country_code: result.components["ISO_3166-1_alpha-2"],
        state: result.components.state,
        state_code: result.components.state_code,
      },
    ]);
  };

  return (
    <div className="text-[#B6B6B6] searchbar cursor-default absolute z-[9999] h-fit max-w-[620px] top-3 right-0 left-10 mx-auto mb-4 w-[70%] font-poppins">
      <div className="searchbar relative">
        <RiSearch2Line
          size={22}
          className="searchbar absolute text-[#B6B6B6] top-[12px] left-3"
        />
        <div className="searchbar cursor-pointer absolute text-[#B6B6B6] top-[15px] right-3">
          {query && (
            <FiX size={22} className="searchbar" onClick={() => setQuery("")} />
          )}
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="searchbar w-full py-3 px-11 rounded-lg text-[16px] placeholder:text-[16px] placeholder:text-[#B6B6B6] bg-[#222222]"
          placeholder="Search a location"
        />
      </div>
      <div className="searchbar flex flex-col gap-4 bg-[#222222] mt-2 rounded-lg">
        {!loading ? (
          results.map((result, index) => (
            <div
              className="searchbar text-[#B6B6B6] px-8 py-4 cursor-pointer hover:bg-gray-600 transition-colors"
              key={index}
              onClick={() => handleResultClick(result)}
            >
              <p
                className="searchbar"
                onClick={() => handleResultClick(result)}
              >
                {result?.formatted}
              </p>
            </div>
          ))
        ) : (
          <div className="searchbar text-[#B6B6B6] px-8 py-4 cursor-pointer hover:bg-gray-600 transition-colors flex items-center justify-center">
            <PulseLoader className="searchbar" color="#aaa" size={10} />
          </div>
        )}
      </div>
    </div>
  );
}
