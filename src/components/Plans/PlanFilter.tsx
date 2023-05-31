import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  FiCalendar,
  FiDollarSign,
  FiHeart,
  FiMap,
  FiPlusSquare,
} from "react-icons/fi";

export function PlanFilter() {
  const [carouselWidth, setCarouselWidth] = useState(0);

  const slideRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (slideRef.current) {
      setCarouselWidth(
        slideRef.current.scrollWidth - slideRef.current.offsetWidth
      );
    }
  }, []);

  return (
    <motion.div
      drag="x"
      dragConstraints={{ right: 0, left: -carouselWidth }}
      className="mt-10 flex gap-8 carousel:justify-center md:gap-12 items-center md:justify-center select-none"
      ref={slideRef}
    >
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
    </motion.div>
  );
}