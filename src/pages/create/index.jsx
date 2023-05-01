import { BiBus } from 'react-icons/bi';
import { BsCarFrontFill } from 'react-icons/bs';
import { FaSubway } from 'react-icons/fa';

export default function Create() {
  return (
    <div className="grid lg:grid-cols-share-plan">
      <div className="h-screen w-full overflow-hidden">
        <img src="/assets/share-page-image.png" alt="girl image"  className="w-full h-full object-cover"/>
      </div>
      <div className="h-screen w-full flex items-center justify-center flex-col">
        <form className="w-full max-w-[360px] mx-auto">
          <h2 className="text-3xl font-medium text-center text-gray-900">Share your Plan</h2>
          <h3 className="mt-24 font-medium text-2xl text-gray-900">Duration</h3>
          <span className="mt-2 block text-gray-700 text-sm">Inform the duration of your trip plan</span>
          <div className="flex items-center gap-4 mt-4">
            <input
              type="number"
              name="number"
              maxLength={3}
              min={1}
              id="number"
              className="numberOfDays text-[20px] font-medium bg-gray-200 rounded-lg w-12 h-12 flex items-center text-center text-gray-900 justify-center placeholder:text-center placeholder:text-gray-500"
              placeholder="1" 
            />
            <span className="block text-gray-700 font-medium">days</span>
          </div>
          <div className="mt-6 border-b-2 bg-gray-500"></div>
          <h3 className="mt-6 font-medium text-2xl text-gray-900">Duration</h3>
          <span className="mt-2 block text-gray-700 text-sm">Specify the type of transportation used for your travel plan</span>
          <div className="mt-4 flex items-center gap-2">
            <button className="bg-gray-200 rounded-lg w-12 h-12 flex items-center justify-center">
              <BiBus size={25} className="text-gray-700"/>
            </button>
            <button className="bg-gray-200 rounded-lg w-12 h-12 flex items-center justify-center">
              <BsCarFrontFill size={25} className="text-gray-700"/>
            </button>
            <button className="bg-gray-200 rounded-lg w-12 h-12 flex items-center justify-center">
              <FaSubway size={24} className="text-gray-700"/>
            </button>
          </div>
          <div className="mt-12 flex items-center gap-4 mx-auto w-full max-w-[400px]">
            <button className="px-2 py-3 rounded-lg text-white bg-gray-900 w-full">Cancel</button>
            <button className="px-2 py-3 rounded-lg text-white bg-blue-500 w-full">Next</button>
          </div>
        </form>
      </div>
    </div>
  )
}
