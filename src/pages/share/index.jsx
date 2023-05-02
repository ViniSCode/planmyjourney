import { TransportationButton } from '@/components/SharePlan/TransportationButton';
import { useSharePlan } from '@/hooks/useSharePlan';
import { BiBus } from 'react-icons/bi';
import { BsCarFrontFill } from 'react-icons/bs';
import { FaSubway, FaWalking } from 'react-icons/fa';
import { SharePageActions } from '../../components/SharePlan/SharePageActions';
export default function Share() {
  const {
    handleDecreaseDays, 
    handleIncreaseDays, 
    days,
    handleSetBus, 
    handleSetSubway, 
    handleSetWalking, 
    handleSetCar, 
    transportation
  } = useSharePlan();

  return (
    <div className="grid lg:grid-cols-share-plan select-none">
      <div className="h-[50vh] lg:h-screen w-full overflow-hidden">
        <img src="/assets/share-page-image.png" alt="girl image"  className="w-full h-full object-cover"/>
      </div>
      <div className="px-4 md:px-0 mt-20 mb-20 lg:mb-0 lg:mt-0 lg:h-screen w-full flex items-center lg:justify-center flex-col">
        <div className="w-full max-w-[360px] mx-auto">
          <h2 className="text-3xl font-medium text-center text-gray-900">Share your Plan</h2>
          <h3 className="mt-24 font-medium text-2xl text-gray-900">Duration</h3>
          <span className="mt-2 block text-gray-700 text-sm">Inform the duration of your trip plan</span>
          <div className="flex items-center gap-2 mt-4">
            <span className="cursor-pointer w-12 h-12 flex items-center justify-center text-xl font-medium bg-gray-200 rounded-lg" onClick={handleDecreaseDays}> - </span>
            <input
              type="number" name="number" maxLength={3} min={1} id="number"
              className="numberOfDays text-xl font-medium bg-gray-200 rounded-lg w-12 h-12 flex items-center text-center text-gray-900 justify-center placeholder:text-center placeholder:text-gray-500"
              placeholder="1"
              value={days}
            />
            <span className="cursor-pointer w-12 h-12 flex items-center justify-center text-xl font-medium bg-gray-200 rounded-lg" onClick={handleIncreaseDays}>+</span>
            <span className="ml-2 text-lg block text-gray-700 font-medium">days</span>
          </div>
          <div className="mt-6 border-b-2 bg-gray-500"></div>
          <h3 className="mt-6 font-medium text-2xl text-gray-900">Transportation</h3>
          <span className="mt-2 block text-gray-700 text-sm">Specify the type of transportation used for your travel plan</span>
          <div className="mt-4 flex items-center gap-2">
            <TransportationButton onClick={handleSetBus} transportation={transportation.bus}>
              <BiBus size={25}/>
            </TransportationButton>

            <TransportationButton onClick={handleSetCar} transportation={transportation.car}>
              <BsCarFrontFill size={25}/>
            </TransportationButton>

            <TransportationButton onClick={handleSetSubway} transportation={transportation.subway}>
              <FaSubway size={24}/>
            </TransportationButton>

            <TransportationButton onClick={handleSetWalking} transportation={transportation.walking}>
              <FaWalking size={24}/>
            </TransportationButton>
          </div>

          <SharePageActions href={'/share/expenses'}/>
        </div>
      </div>
    </div>
  )
}
