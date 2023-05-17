import { Modal } from "@/components/Modal";
import { Marker } from "@/context/MapContext";
import { Expenses, Transportation } from "@/context/SharePlanContext";
import useMap from "@/hooks/useMap";
import { useSharePlan } from "@/hooks/useSharePlan";
import { motion } from "framer-motion";
import type { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";

export interface TripPlanDataProps {
  location: Marker[];
  days: number;
  expenses: Expenses;
  transportation: Transportation;
}

export default function Images({ apiKey, session }: any) {
  const router = useRouter();
  const { markers, setMarkers, isModalOpen, setIsModalOpen } = useMap();
  const {
    days,
    expenses,
    transportation,
    setDays,
    setExpenses,
    handleSetBus,
    handleSetSubway,
    handleSetWalking,
    handleSetCar,
  } = useSharePlan();

  return (
    <main className="grid lg:grid-cols-map-grid-lg xl:grid-cols-map-grid-xl select-none overflow-hidden">
      <div className="xl:flex xl:flex-col xl:justify-center mt-10 mb-20 lg:mb-0 w-full max-w-[80%] md:max-w-[70%] lg:max-w-[80%] xl:w-[80%] xl:max-w-[1280px] 2xl:max-w-[60%] mx-auto">
        <h1 className="text-3xl font-medium text-center">PlanMyJourney</h1>
        <h2 className="mt-10 xl:mt-20 text-2xl font-medium">
          Destination Planner
        </h2>
        <p className="xl:mt-4 text-sm font-medium mt-2 text-gray-700 xl:text-base">
          Uploading Images: Personalize your trip with photos. Share and
          showcase your favorite moments and inspirations for your upcoming
          adventure.
        </p>
        <div className="mt-5 xl:mt-5 w-full h-[55vh] bg-gray-900 px-16 rounded-2xl flex items-center justify-center">
          <input
            type="file"
            accept="image/*"
            className="px-3 py-3 rounded-full file:hidden file:bg-white cursor-pointer text-gray-900 bg-white w-full max-w-[380px] font-medium"
            // onChange={handleImageChange}
          />
        </div>
      </div>

      {isModalOpen && <Modal />}

      <div className="overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-500 flex justify-center flex-col gap-3 bg-gray-900 w-full h-screen text-gray-300 px-10">
        <h2 className="mb-4 text-center text-[24px] text-white">
          Uploaded Images
        </h2>
        <p className="mb-14 text-center text-gray-300 text-sm">
          Remove or edit your uploaded images
        </p>
        <div className="overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-500 w-full py-2 px-4 max-h-96 max-w-[90%] md:max-w-[80%] lg:max-w-[400px] mx-auto">
          {/* {images.length > 0 ? (
            images.map((place, index) => (
              <div
                className="flex items-center gap-3 mx-auto w-full md:max-w-full lg:max-w-[320px] mt-3"
                key={index}
              >
                <IoReorderTwo
                  size={20}
                  className="cursor-pointer reorder-handle"
                />
                <p className="truncate text-sm w-[90%]">{image.imageName}</p>
                <FiEdit2
                  className="text-red-500 cursor-pointer hover:text-red-300 transition-colors"
                  size={18}
                  onClick={setIsModalOpen}
                />
                <FiX
                  className="text-red-500 cursor-pointer hover:text-red-300 transition-colors"
                  size={20}
                  // onClick={() => handleRemoveImage(index)}
                />
              </div>
            ))
          ) : (
            <p className="mb-14 text-center text-gray-300 text-sm">
              No location selected yet. Please select at least two locations on
              the map to proceed.
            </p>
          )} */}
        </div>
        <div className="mt-20 flex items-center gap-4 mx-auto w-full max-w-xs">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-2 py-2 rounded-lg text-gray-600 bg-white w-full hover:brightness-75 transition-[filter]"
          >
            Previous
          </button>
          <Link href="/share/location" className="w-full">
            <motion.button
              type="button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="px-2 py-2 rounded-lg text-white bg-blue-500 w-full hover:brightness-75 transition-[filter]"
            >
              Next
            </motion.button>
          </Link>
        </div>
      </div>
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const url =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api/maps";

  try {
    const res = await fetch(url);
    const { apiKey } = await res.json();
    return {
      props: {
        apiKey,
        session,
      },
    };
  } catch (err) {
    console.error("Failed to fetch API key:", err);
    return {
      props: {
        apiKey: "",
        session,
      },
    };
  }
};
