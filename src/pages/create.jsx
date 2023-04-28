import useMap from "@/hooks/useMap";
import { Reorder, useDragControls } from "framer-motion";
import dynamic from "next/dynamic";
import { FiEdit2, FiX } from "react-icons/fi";
import { IoReorderTwo } from "react-icons/io5";

const DynamicMap = dynamic(() => import("../components/Map/index"), { ssr:false, loading: () => <div>Loading Map...</div> })

export default function Create ({ apiKey }) {
  const controls = useDragControls()

  const {markers, setMarkers} = useMap();

  function handleRemoveLocation(index) {
    const updatedMarkersLocation = [...markers];
    updatedMarkersLocation.splice(index, 1);
    setMarkers(updatedMarkersLocation);
  }

  return (
    <main className="grid grid-cols-map-grid items-baseline select-none">
      <div className="px-4 py-10 w-full h-full">
        <DynamicMap apiKey={apiKey} markers={markers} setMarkers={setMarkers}/>
      </div>
      
      <div className="flex justify-center flex-col gap-3 bg-gray-900 w-full h-screen text-gray-300 px-10">
        <h2 className="mb-4 text-center text-[24px] text-white">Reorder your locations</h2>
        <p className="mb-14 text-center text-gray-300 text-sm">Create a Logical Sequence for Your Trip Plan</p>
        <div className="scrollbar-thin scrollbar-thumb-gray-500 w-full py-2">
          <Reorder.Group 
            axis="y" 
            values={markers} 
            onReorder={setMarkers}
            dragListener={false}
            dragControls={controls}
          >
              {markers.length > 0 ? markers.map((place, index) => (
                <Reorder.Item key={index} value={place}>
                  <div className="flex items-center gap-3 mx-auto w-full max-w-[320px] mt-3">
                    <IoReorderTwo size={20} className="cursor-pointer reorder-handle"
                     onPointerDown={(e) => controls.start(e)}
                    />
                    <p 
                      className='truncate text-sm w-[90%]'>
                        {place.formatted} 
                    </p>
                    <FiEdit2 className="text-red-500 cursor-pointer hover:text-red-300 transition-colors" size={18}/>
                    <FiX
                      className="text-red-500 cursor-pointer hover:text-red-300 transition-colors"
                      size={20}
                      onClick={() => handleRemoveLocation(index)} 
                    />
                  </div>
                </Reorder.Item>
              )) : (
                  <p className="mb-14 text-center text-gray-300 text-sm">No location selected yet.</p>              
                )
              }
          </Reorder.Group>
        </div>
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
