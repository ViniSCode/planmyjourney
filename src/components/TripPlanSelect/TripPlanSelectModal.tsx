import { useEffect } from "react";
import { FiCalendar, FiDollarSign, FiMapPin } from "react-icons/fi";

interface ModalProps {
  selected: string;
  setIsModalOpen: any;
}

export function TripPlanSelectModal({ setIsModalOpen, selected }: ModalProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsModalOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [setIsModalOpen]);

  return selected === "location" ? (
    <>
      <div
        className="w-full h-screen fixed inset-0 bg-[#00000075] z-30 flex items-center justify-center"
        onClick={() => setIsModalOpen(false)}
      ></div>
      <div className="fixed w-full max-w-[290px] sm:max-w-[500px] xs:max-w-[400px] md:max-w-[600px] lg:max-w-[800px] bg-white px-5 py-5 rounded-xl z-40 top-1/2 left-1/2 -translate-x-2/4 -translate-y-2/4">
        <div className="flex items-center relative">
          <button className="absolute right-0 bg-gray-100 text-gray-300 font-medium text-lg border border-gray-300 rounded-lg px-2 py-[2px] mb-2">
            esc
          </button>
          <FiMapPin size={25} className="text-gray-900 mb-2" />
          <input
            type="text"
            placeholder="Enter your destination"
            className="w-full h-full pt-4 pb-6 border-0 focus:ring-0 focus:outline-none font-medium text-lg placeholder:text-gray-300"
          />
        </div>
        <div className="bg-gray-200 w-full h-[2px]"></div>
      </div>
    </>
  ) : selected === "duration" ? (
    <>
      <div
        className="w-full h-screen fixed inset-0 bg-[#00000075] z-30 flex items-center justify-center"
        onClick={() => setIsModalOpen(false)}
      ></div>
      <div className="fixed w-full max-w-[290px] sm:max-w-[500px] xs:max-w-[400px] md:max-w-[600px] lg:max-w-[800px] bg-white px-5 py-5 rounded-xl z-40 top-1/2 left-1/2 -translate-x-2/4 -translate-y-2/4">
        <div className="flex items-center relative">
          <button className="absolute right-0 bg-gray-100 text-gray-300 font-medium text-lg border border-gray-300 rounded-lg px-2 py-[2px] mb-2">
            esc
          </button>
          <FiCalendar size={25} className="text-gray-900 mb-2" />
          <input
            type="text"
            placeholder="Choose Trip Duration (in days)"
            className="w-full h-full pt-4 pb-6 border-0 focus:ring-0 focus:outline-none font-medium text-lg placeholder:text-gray-300"
          />
        </div>
        <div className="bg-gray-200 w-full h-[2px]"></div>
      </div>
    </>
  ) : (
    <>
      <div
        className="w-full h-screen fixed inset-0 bg-[#00000075] z-30 flex items-center justify-center"
        onClick={() => setIsModalOpen(false)}
      ></div>
      <div className="fixed w-full max-w-[290px] sm:max-w-[500px] xs:max-w-[400px] md:max-w-[600px] lg:max-w-[800px] bg-white px-5 py-5 rounded-xl z-40 top-1/2 left-1/2 -translate-x-2/4 -translate-y-2/4">
        <div className="flex items-center relative">
          <button className="absolute right-0 bg-gray-100 text-gray-300 font-medium text-lg border border-gray-300 rounded-lg px-2 py-[2px] mb-2">
            esc
          </button>
          <FiDollarSign size={25} className="text-gray-900 mb-2" />
          <input
            type="text"
            placeholder="Set trip plan Budget (in USD)"
            className="w-full h-full pt-4 pb-6 border-0 focus:ring-0 focus:outline-none font-medium text-lg placeholder:text-gray-300"
          />
        </div>
        <div className="bg-gray-200 w-full h-[2px]"></div>
      </div>
    </>
  );
}
