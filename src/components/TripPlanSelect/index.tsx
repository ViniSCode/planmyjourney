import { useState } from "react";
import { FiCalendar, FiDollarSign, FiMapPin } from "react-icons/fi";
import { RiArrowDownSLine } from "react-icons/ri";
import { TripPlanSelectModal } from "./TripPlanSelectModal";

export function TripPlanSelect() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selected, setSelected] = useState("location");

  return (
    <>
      {isModalOpen && (
        <TripPlanSelectModal
          setIsModalOpen={setIsModalOpen}
          selected={selected}
        />
      )}
      <div className="flex flex-col max-w-[270px] md:flex-row md:flex absolute left-1/2 right-1/2 -translate-x-1/2 bottom-[-200px] md:bottom-[-50px] w-[95%] md:max-w-[730px] mx-auto bg-white gap-4 md:gap-10 rounded-2xl px-4 py-6 md:px-4 md:py-4 shadow-lg items-center justify-center">
        <div className="gap-8 items-baseline flex-col justify-center flex md:items-center md:gap-8 md:flex-row">
          <div
            className="cursor-pointer"
            onClick={() => {
              setSelected("location");
              setIsModalOpen(true);
            }}
          >
            <div className="flex items-center gap-2 md:gap-2 text-gray-900">
              <FiMapPin size={16} />
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold">Location</span>
                  <RiArrowDownSLine size={18} className="mt-1 text-gray-700" />
                </div>
              </div>
            </div>
            <span className="md:ml-6 text-xs font-medium text-gray-500">
              Enter destination
            </span>
          </div>

          <div
            className="cursor-pointer"
            onClick={() => {
              setSelected("duration");
              setIsModalOpen(true);
            }}
          >
            <div className="flex items-center gap-2 text-gray-900">
              <FiCalendar size={18} />
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold">Duration</span>
                  <RiArrowDownSLine size={18} className="mt-1 text-gray-700" />
                </div>
              </div>
            </div>
            <span className="md:ml-6 text-xs font-medium text-gray-500">
              Trip duration
            </span>
          </div>

          <div
            className="cursor-pointer"
            onClick={() => {
              setSelected("expenses");
              setIsModalOpen(true);
            }}
          >
            <div className="flex items-center gap-2 text-gray-900">
              <FiDollarSign size={18} />
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold">Expenses</span>
                  <RiArrowDownSLine size={18} className="mt-1 text-gray-700" />
                </div>
              </div>
            </div>
            <span className="md:ml-6 text-xs font-medium text-gray-500">
              Set budget
            </span>
          </div>
        </div>

        <button className="w-full md:w-fit px-8 py-4 bg-pink-500 text-white rounded-2xl flex items-center justify-center flex-col hover:brightness-90 transition-[filter]">
          <FiCalendar size={22} />
          Find Plan
        </button>
      </div>
    </>
  );
}
