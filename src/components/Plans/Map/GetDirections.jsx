import { useRouter } from "next/router";
import { useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { useMap } from "react-leaflet";

export function GetDirections({ coords, location }) {
  const map = useMap();
  const router = useRouter();

  function generateGoogleMapsURL(loc) {
    const origin = loc[0];
    const destination = loc[loc.length - 1];
    const waypoints = loc.slice(1, -1);

    const baseUrl = "https://www.google.com/maps/dir/?api=1";
    const originParam = `&origin=${origin.lat},${origin.lng}`;
    const destinationParam = `&destination=${destination.lat},${destination.lng}`;
    let waypointsParam = "";

    if (waypoints.length > 0) {
      waypointsParam = "&waypoints=";
      for (let i = 0; i < waypoints.length; i++) {
        waypointsParam += `${waypoints[i].lat},${waypoints[i].lng}`;
        if (i !== waypoints.length - 1) {
          waypointsParam += "|";
        }
      }
    }

    const travelModeParam = "&travelmode=driving";

    const googleMapsURL = `${baseUrl}${originParam}${destinationParam}${waypointsParam}${travelModeParam}`;

    window.open(googleMapsURL, "_blank");
  }

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
      <div
        className="bg-black shadow-lg cursor-pointer absolute z-[9999] h-fit max-w-fit bottom-3 right-0 left-0 mx-auto mb-4 w-[90%] ssm:w-[70%] font-poppins px-4 py-3 rounded-md hover:bg-gray-700 transition-colors"
        onClick={() => generateGoogleMapsURL(location)}
      >
        <div className="flex items-center gap-2">
          <FcGoogle size={20} />
          <span className="hidden ssm:block text-white font-medium text-xs ssm:text-base">
            Get Directions on Google Maps
          </span>
          <span className="block ssm:hidden text-white font-medium text-xs ssm:text-base">
            Directions on Google Maps
          </span>
        </div>
      </div>
    </>
  );
}
