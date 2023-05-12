import { Loading } from "@/components/Loading";
import { Modal } from "@/components/Modal";
import { Marker } from "@/context/MapContext";
import { Expenses, Transportation } from "@/context/SharePlanContext";
import useMap from "@/hooks/useMap";
import { useSharePlan } from "@/hooks/useSharePlan";
import { motion } from "framer-motion";
import type { GetServerSideProps } from "next";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import { FiEdit2, FiX } from "react-icons/fi";
import { IoReorderTwo } from "react-icons/io5";
import { toast } from "react-toastify";

export interface TripPlanDataProps {
  location: Marker[];
  days: number;
  expenses: Expenses;
  transportation: Transportation;
  session: Session;
}

const DynamicMap = dynamic(() => import("../../components/Map/index"), {
  ssr: false,
  loading: () => <Loading />,
});

export default function Location({ apiKey, session }: any) {
  const [tripPlanData, setTripPlanData] = useState<TripPlanDataProps>();
  const router = useRouter();
  const { markers, setMarkers, isModalOpen, setIsModalOpen } = useMap();
  const { days, expenses, transportation } = useSharePlan();

  function handleRemoveLocation(index: number) {
    const updatedMarkersLocation = [...markers];
    updatedMarkersLocation.splice(index, 1);
    setMarkers(updatedMarkersLocation);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const isTransportationDefined = Object.values(transportation).some(
      (value) => value === true
    );

    if (!session) {
      return;
    }

    if (!isTransportationDefined) {
      toast.error(
        "Oops! You forgot to select a mode of transportation. Please go back to the previous page and select at least one option."
      );
      return;
    }

    if (!days) {
      toast.error(
        "Hold on! You haven't entered the number of days for your trip. Please go back to the previous page and fill in this field."
      );
      return;
    }

    if (!expenses.min || !expenses.max) {
      toast.error(
        "Oops! You forgot to enter your estimated expenses. Please go back to the previous page and make sure you've entered both the minimum and maximum values."
      );
      return;
    }

    if (markers.length < 2) {
      toast.error(
        "Please select at least two locations on the map to proceed."
      );
      return;
    }

    setTripPlanData({
      session,
      days,
      expenses,
      transportation,
      location: markers,
    });

    try {
      const reqData = await fetch("/api/share", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          session,
          tripPlanData,
        }),
      }).then((res) => res.json());

      console.log(reqData);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <main className="grid lg:grid-cols-map-grid-lg xl:grid-cols-map-grid-xl select-none overflow-hidden">
      <div className="xl:flex xl:flex-col xl:justify-center mt-10 mb-20 lg:mb-0 w-full max-w-[80%] md:max-w-[70%] lg:max-w-[80%] xl:w-[80%] xl:max-w-[1280px] 2xl:max-w-[60%] mx-auto">
        <h1 className="text-3xl font-medium text-center">PlanMyJourney</h1>
        <h2 className="mt-10 xl:mt-20 text-2xl font-medium">
          Destination Planner
        </h2>
        <p className="xl:mt-4 text-sm font-medium mt-2 text-gray-700 xl:text-base">
          Select Locations for Your Trip Plan: Use the interactive map to choose
          the places you have visited. Simply click on the map to select and
          organize the locations, and share your trip plan with others.
        </p>
        <div className="mt-5 xl:mt-5">
          <DynamicMap
            apiKey={apiKey}
            markers={markers}
            setMarkers={setMarkers}
          />
        </div>
      </div>

      {isModalOpen && <Modal />}

      <div className="overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-500 flex justify-center flex-col gap-3 bg-gray-900 w-full h-screen text-gray-300 px-10">
        <h2 className="mb-4 text-center text-[24px] text-white">
          Reorder your locations
        </h2>
        <p className="mb-14 text-center text-gray-300 text-sm">
          Create a Logical Sequence for Your Trip Plan
        </p>
        <div className="overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-500 w-full py-2 px-4 max-h-96 max-w-[90%] md:max-w-[80%] lg:max-w-[400px] mx-auto">
          {markers.length > 0 ? (
            markers.map((place, index) => (
              <div
                className="flex items-center gap-3 mx-auto w-full md:max-w-full lg:max-w-[320px] mt-3"
                key={index}
              >
                <IoReorderTwo
                  size={20}
                  className="cursor-pointer reorder-handle"
                />
                <p className="truncate text-sm w-[90%]">{place.formatted}</p>
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
            ))
          ) : (
            <p className="mb-14 text-center text-gray-300 text-sm">
              No location selected yet. Please select at least two locations on
              the map to proceed.
            </p>
          )}
        </div>
        <form
          onSubmit={handleSubmit}
          className="mt-20 flex items-center gap-4 mx-auto w-full max-w-xs"
        >
          <button
            type="button"
            onClick={() => router.back()}
            className="px-2 py-2 rounded-lg text-gray-600 bg-white w-full"
          >
            Previous
          </button>
          <motion.button
            type="submit"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="px-2 py-2 rounded-lg text-white bg-blue-500 w-full"
          >
            Next
          </motion.button>
        </form>
      </div>
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: "/share",
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
