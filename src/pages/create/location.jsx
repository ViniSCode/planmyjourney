import { Modal } from "@/components/Modal";
import useMap from "@/hooks/useMap";
import { motion, useDragControls } from "framer-motion";
import dynamic from "next/dynamic";
import { FiEdit2, FiX } from "react-icons/fi";
import { IoReorderTwo } from "react-icons/io5";

const DynamicMap = dynamic(() => import("../../components/Map/index"), { ssr:false, loading: () => <div>Loading Map...</div> })

export default function Location ({ apiKey }) {
  const controls = useDragControls()

  const {markers, setMarkers, isModalOpen, setIsModalOpen} = useMap();

  function handleRemoveLocation(index) {
    const updatedMarkersLocation = [...markers];
    updatedMarkersLocation.splice(index, 1);
    setMarkers(updatedMarkersLocation);
  }
  
  return (
    <main className="grid lg:grid-cols-map-grid-lg xl:grid-cols-map-grid select-none overflow-hidden">
      <div className="mt-10 mb-20 w-full max-w-[80%] md:max-w-[70%] lg:max-w-[80%] xl:w-[80%] xl:max-w-[1280px] mx-auto">
        <h1 className="text-3xl font-medium text-center">PlanMyJourney</h1>
        <h2 className="mt-20 xl:mt-10 text-2xl font-medium">Destination Planner</h2>
        <p className="text-sm font-medium mt-2 text-gray-700 xl:text-base">Select Locations for Your Trip Plan: Use the interactive map to choose the places you have visited. Simply click on the map to select and organize the locations, and share your trip plan with others.</p>
        <div className="mt-10">
          <DynamicMap apiKey={apiKey} markers={markers} setMarkers={setMarkers}/>
        </div>
      </div>

      {isModalOpen && <Modal />}
      
      <div className="overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-500 flex justify-center flex-col gap-3 bg-gray-900 w-full h-screen text-gray-300 px-10">
        <h2 className="mb-4 text-center text-[24px] text-white">Reorder your locations</h2>
        <p className="mb-14 text-center text-gray-300 text-sm">Create a Logical Sequence for Your Trip Plan</p>
        <div className="overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-500 w-full py-2 px-4 max-h-96 max-w-[90%] md:max-w-[80%] lg:max-w-[400px] mx-auto">
          {markers.length > 0 ? markers.map((place, index) => (
            <div className="flex items-center gap-3 mx-auto w-full md:max-w-full lg:max-w-[320px] mt-3" key={index}>
              <IoReorderTwo size={20} className="cursor-pointer reorder-handle"
                onPointerDown={(e) => controls.start(e)}
              />
              <p 
                className='truncate text-sm w-[90%]'>
                  {place.formatted} 
              </p>
              <FiEdit2
                className="text-red-500 cursor-pointer hover:text-red-300 transition-colors"
                size={18} 
                onClick={setIsModalOpen}
              />
              <FiX
                className="text-red-500 cursor-pointer hover:text-red-300 transition-colors"
                size={20}
                onClick={() => handleRemoveLocation(index)} 
              />
            </div>
          )) : (
              <p className="mb-14 text-center text-gray-300 text-sm">No location selected yet.</p>              
            )
          }
        </div>
          <div className="mt-20 flex items-center gap-4 mx-auto w-full max-w-xs">
            <button className="px-2 py-2 rounded-lg text-gray-600 bg-white w-full">Cancel</button>
            {markers.length > 0 && (<motion.button initial={{opacity: 0}} animate={{opacity: 1}} className="px-2 py-2 rounded-lg text-white bg-blue-500 w-full">Next</motion.button>)}
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
