import { EditImages } from "@/components/EditImages";
import { Marker } from "@/context/MapContext";
import { Expenses, Transportation } from "@/context/SharePlanContext";
import useMap from "@/hooks/useMap";
import { useSharePlan } from "@/hooks/useSharePlan";
import type { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
export interface TripPlanDataProps {
  location: Marker[];
  days: number;
  expenses: Expenses;
  transportation: Transportation;
}

export default function Images({ apiKey, session }: any) {
  const { setSelectedImages, selectedImages } = useSharePlan();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [lastImage, setLastImage] = useState<File>();
  const { markers, setMarkers, isModalOpen, setIsModalOpen } = useMap();
  const router = useRouter();
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

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (selectedImages.length === 4) {
      toast.warning("You can upload a maximum of 4 images.");
      return;
    }
    const files = event.target.files;
    if (files && files.length > 0) {
      const newImages = Array.from(files).slice(0, 15); // Limit to max 15 images
      setSelectedImages((prevImages: any) => [...prevImages, ...newImages]);
      setLastImage(selectedImages[selectedImages.length - 1]);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  useEffect(() => {
    setLastImage(selectedImages[selectedImages.length - 1]);
  }, [selectedImages, fileInputRef]);

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
        <div className="mt-5 bg-gray-900 p-4 rounded-2xl flex gap-2 flex-col lg:flex-row w-full h-[300px] sm:h-[400px] md:h-[400px] justify-between overflow-hidden">
          <div className="relative bg-gray-200 w-full h-full rounded-2xl flex items-center justify-center">
            {lastImage && (
              <Image
                src={URL.createObjectURL(lastImage)}
                fill
                alt="trip image"
                className="z-0 absolute object-cover brightness-75 rounded-2xl"
              />
            )}
            <label
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              htmlFor="file_input"
            />
            <input
              className="relative z-20 block w-full max-w-[90%] md:max-w-[60%] text-sm text-gray-900 border border-gray-300 rounded-full cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              id="file_input"
              type="file"
              onChange={handleImageUpload}
              ref={fileInputRef}
              multiple
            />
          </div>
          <div className="lg:px-4 w-full h-20 sm:h-28 lg:max-w-[140px] lg:h-full flex flex-row justify-between gap-2 md:gap-4 lg:flex-col overflow-y-scroll scrollbar-thin scrollbar-track-gray-200 scrollbar-thumb-gray-900">
            {selectedImages &&
              selectedImages.length > 0 &&
              selectedImages.map((image: any, index: any) => (
                <div
                  key={index}
                  className="bg-gray-200 w-full h-[60px] sm:h-[80px] rounded-2xl"
                  style={{
                    backgroundImage: `url(${URL.createObjectURL(image)})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
              ))}
            {selectedImages.length < 4 &&
              Array(4 - selectedImages.length)
                .fill(null)
                .map((_, index) => (
                  <div
                    key={index}
                    className="bg-gray-200 w-full h-[60px] sm:h-[80px] rounded-2xl"
                  />
                ))}
          </div>
        </div>
      </div>
      <EditImages setImages={setSelectedImages} images={selectedImages} />
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
