import { FiDollarSign } from "react-icons/fi";

export function Expenses({ setIsModalOpen }: any) {
  return (
    <>
      <div
        className="w-full h-screen fixed inset-0 bg-[#00000075] z-30 flex items-center justify-center"
        onClick={() => setIsModalOpen(false)}
      ></div>
      <div className="fixed w-full max-w-[290px] sm:max-w-[500px] xs:max-w-[400px] md:max-w-[600px] lg:max-w-[800px] bg-white px-10 py-10 rounded-xl z-40 top-1/2 left-1/2 -translate-x-2/4 -translate-y-2/4">
        <div className="flex items-center relative">
          <button
            className="absolute right-0 bg-gray-100 text-gray-300 font-medium text-lg border border-gray-300 rounded-lg px-2 py-[2px] mb-2"
            onClick={() => setIsModalOpen(false)}
          >
            esc
          </button>
          <FiDollarSign size={30} className="text-pink-500 mb-2" />
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
