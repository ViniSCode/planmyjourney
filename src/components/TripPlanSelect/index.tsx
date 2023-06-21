import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { TripPlanSelectModal } from "./TripPlanSelectModal";

export function TripPlanSelect() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {isModalOpen && <TripPlanSelectModal setIsModalOpen={setIsModalOpen} />}
      <div className="max-w-[370px] absolute left-1/2 right-1/2 -translate-x-1/2 bottom-[200px] carousel:bottom-[240px] md:bottom-40 w-[95%] md:max-w-[530px] mx-auto bg-white rounded-full shadow-lg">
        <div
          className="flex justify-center mx-auto w-full"
          onClick={() => {
            setIsModalOpen(true);
          }}
        >
          <label htmlFor="search" className="w-full max-w-full relative">
            <div className="bg-pink-500 rounded-full max-w-fit p-[5px] text-white absolute top-[7px] left-[8px] max-h-fit cursor-text">
              <FiSearch size={25} className="md:block hidden" />
              <FiSearch size={16} className="md:hidden block" />
            </div>
            <input
              type="text"
              id="search"
              name="search"
              placeholder="Country, City, Place..."
              className="rounded-full w-full mx-auto pr-4 pl-14 py-2 md:py-3 text-base cursor-pointer"
              value=""
              disabled={true}
            />
          </label>
        </div>
      </div>
    </>
  );
}
