import {
  FiCalendar,
  FiDollarSign,
  FiHeart,
  FiMap,
  FiPlusSquare,
} from "react-icons/fi";

export function PlanFilter() {
  return (
    <div className="mt-10 flex gap-12 items-center justify-center border-b pb-8">
      <div className="flex flex-col items-center gap-2 cursor-pointer text-pink-500">
        <FiMap />
        <span className="text-xs font-medium">All</span>
      </div>

      <div className="flex flex-col items-center gap-2 cursor-pointer text-gray-700">
        <FiHeart />
        <span className="text-xs font-medium">Popular</span>
      </div>

      <div className="flex flex-col items-center gap-2 cursor-pointer text-gray-700">
        <FiDollarSign />
        <span className="text-xs font-medium">Expenses</span>
      </div>

      <div className="flex flex-col items-center gap-2 cursor-pointer text-gray-700">
        <FiPlusSquare />
        <span className="text-xs font-medium">New</span>
      </div>

      <div className="flex flex-col items-center gap-2 cursor-pointer text-gray-700">
        <FiCalendar />
        <span className="text-xs font-medium">Days</span>
      </div>
    </div>
  );
}
