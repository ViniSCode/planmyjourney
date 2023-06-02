import { GetPlansQuery } from "@/generated/graphql";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { FiHeart, FiMapPin } from "react-icons/fi";

interface PopularPlansSlideProps {
  data: GetPlansQuery | undefined;
}

export function PopularPlansSlide({ data }: PopularPlansSlideProps) {
  const [carouselWidth, setCarouselWidth] = useState(0);
  const router = useRouter();
  const slideRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (slideRef.current) {
      setCarouselWidth(
        slideRef.current.scrollWidth - slideRef.current.offsetWidth
      );
    }
  }, []);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full h-full"
    >
      <h2 className="text-3xl font-bold text-center">Popular Trip Plans</h2>
      <div
        className="mt-20 carousel w-full max-w-[370px] md:max-w-[660px] lg:max-w-full mx-auto overflow-x-hidden flex h-full relative"
        ref={slideRef}
      >
        <motion.div
          drag="x"
          dragConstraints={{ right: 0, left: -carouselWidth }}
          className="rounded-2xl flex gap-10 justify-start h-full"
        >
          {data?.plans.map((plan, index) => (
            <div
              className="w-56 h-fit relative cursor-pointer"
              key={index}
              onClick={() => router.push(`/plans/${plan.id}`)}
            >
              <div className="w-full h-[300px]">
                <Image
                  src={plan.images[0]}
                  alt="location name"
                  width={600}
                  height={900}
                  draggable={false}
                  className="w-full h-full max-w-[300px] max-h-[300px] object-cover rounded-2xl brightness-[0.8]"
                />
              </div>
              <div className="w-full max-w-[150px] flex items-center justify-center gap-2 shadow-lg bg-white rounded-xl absolute top-0 right-[-25px] px-4 py-2">
                <FiMapPin size={16} />
                <span className="block text-gray-900 font-bold truncate">
                  {plan.location[0].country}
                </span>
              </div>
              <div className="flex items-center text-shadow-like gap-1 font-medium text-white absolute bottom-3 left-3">
                <FiHeart size={18} />
                <span className="text-xs">
                  {plan?.likesCount ? plan?.likesCount : 0}
                </span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
