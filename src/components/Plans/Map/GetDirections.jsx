import { useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { useMap } from "react-leaflet";

export function GetDirections({ coords, location }) {
  const map = useMap();

  const handleFlyTo = (loc) => {
    const [lat, lng] = loc;
    if (lat && lng) {
      map.flyTo(loc, 15);
    }
  };

  useEffect(() => {
    if (coords && coords.length > 1) {
      handleFlyTo(coords);
    }
  }, [coords]);

  return (
    <>
      <div className="bg-[#262626] shadow-lg cursor-pointer absolute z-[9999] h-fit max-w-fit bottom-3 right-0 left-10 mx-auto mb-4 w-[70%] font-poppins px-4 py-3 rounded-md">
        <div className="flex items-center gap-2">
          <FcGoogle size={25} />
          <span className="text-white font-medium text-base">
            Get Directions on Google Maps
          </span>
        </div>
      </div>
    </>
  );
}
