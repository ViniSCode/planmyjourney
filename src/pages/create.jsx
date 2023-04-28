import useMap from "@/hooks/useMap";
import dynamic from "next/dynamic";
import { FiEdit2, FiX } from "react-icons/fi";

const DynamicMap = dynamic(() => import("../components/Map/index"), { ssr:false, loading: () => <div>Loading Map...</div> })

export default function Create ({ apiKey }) {
  const {markers, setMarkers} = useMap();

  function handleRemoveLocation(index) {
    const updatedMarkersLocation = [...markers];
    updatedMarkersLocation.splice(index, 1);
    setMarkers(updatedMarkersLocation);
  }

  return (
    <main className="grid grid-cols-map-grid gap-10 items-baseline">
      <div className="px-10 py-10 w-full h-full">
        <DynamicMap apiKey={apiKey} markers={markers} setMarkers={setMarkers}/>
      </div>
      
      <div className="flex justify-center flex-col gap-3 bg-gray-900 w-full h-screen text-gray-300 px-10 py-10">
        <h2 className="mb-4 text-center text-[24px] text-white">Reorder your locations</h2>
        <p className="mb-14 text-center text-gray-300 text-sm">Create a Logical Sequence for Your Trip Plan</p>
          {markers && markers.map((place, index) => (
            <div className="flex items-center mx-auto gap-3 w-full max-w-[320px]" key={index}>
              <img src='./assets/reorder.svg'/>
              <p 
                className='truncate text-sm w-[90%]'>
                  {index + 1}° Location: {place.formatted} 
              </p>
              <FiEdit2 className="text-red-500 cursor-pointer hover:text-red-300 transition-colors" size={18}/>
              <FiX
                className="text-red-500 cursor-pointer hover:text-red-300 transition-colors"
                size={20}
                onClick={() => handleRemoveLocation(index)} 
              />
            </div>
          ))}
      </div>
    </main>
  )
}

export async function getServerSideProps(context) {
  const url = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api/maps';

  try {
    const res = await fetch(url);
    const { apiKey } = await res.json();
    return {
      props: {
        apiKey,
      },
    };
  } catch (err) {
    console.error('Failed to fetch API key:', err);
    return {
      props: {
        apiKey: '',
      },
    };
  }
}
