import { CreatePageActions } from '@/components/CreatePageActions';

export default function Expenses () {
  return (
    <div className="grid lg:grid-cols-share-plan">
      <div className="h-[50vh] lg:h-screen w-full overflow-hidden">
        <img src="/assets/expenses-page-image.png" alt="girl image"  className="w-full h-full object-cover"/>
      </div>
      <div className="px-4 md:px-0 mt-20 mb-20 lg:mb-0 lg:mt-0 lg:h-screen w-full flex items-center lg:justify-center flex-col">
        <form className="w-full max-w-[360px] mx-auto">
          <h2 className="text-3xl font-medium text-center text-gray-900">Share your Plan</h2>
          <h3 className="mt-24 font-medium text-2xl text-gray-900">Estimated Travel Expenses</h3>
          <span className="mt-2 block text-gray-700 text-sm">including transportation, accommodations, activities, and other miscellaneous expenses.</span>
          <div className="flex items-center gap-4 mt-4">
            <input
              type="number" name="number" maxLength={3} min={1} id="number"
              className="numberOfDays text-base font-medium bg-gray-200 rounded-lg w-20 h-9 flex items-center text-center text-green-500 justify-center placeholder:text-center placeholder:text-gray-500"
              placeholder="$800"
            />
            <span className="text-lg block text-gray-700 font-medium">To</span>
            <input
              type="number" name="number" maxLength={3} min={1} id="number"
              className="numberOfDays text-base font-medium bg-gray-200 rounded-lg w-20 h-9 flex items-center text-center text-green-500 justify-center placeholder:text-center placeholder:text-gray-500"
              placeholder="$1500" 
            />
          </div>
          <CreatePageActions href={'/create/location'}/>
        </form>
      </div>
    </div>
  )
}
