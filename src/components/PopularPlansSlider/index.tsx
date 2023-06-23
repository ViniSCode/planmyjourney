import { GetPlansQuery } from "@/generated/graphql";
import { motion, useDragControls } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { FiMapPin } from "react-icons/fi";

interface PopularPlansSlideProps {
  data: GetPlansQuery | undefined;
}

export function PopularPlansSlide({ data }: PopularPlansSlideProps) {
  const [carouselWidth, setCarouselWidth] = useState(0);
  const [isGrabbing, setIsGrabbing] = useState(false);
  const router = useRouter();
  const slideRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (slideRef.current) {
      setCarouselWidth(
        slideRef.current.scrollWidth - slideRef.current.offsetWidth
      );
    }
  }, []);

  const controls = useDragControls();

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full h-full"
    >
      <h2 className="text-3xl text-white font-bold text-center">
        Popular Trip Plans
      </h2>
      <div
        className="mt-20 carousel w-full max-w-[370px] md:max-w-[660px] lg:max-w-full mx-auto overflow-x-hidden flex h-full relative"
        ref={slideRef}
      >
        <motion.div
          dragControls={controls}
          drag="x"
          dragConstraints={{ right: 0, left: -carouselWidth }}
          className={`rounded-2xl flex gap-10 justify-start h-full ${
            isGrabbing ? "cursor-grabbing" : "cursor-grab"
          }`}
          onMouseDown={() => setIsGrabbing(true)}
          onMouseUp={() => setIsGrabbing(false)}
        >
          {data?.plans.map((plan, index) => (
            <div
              className="w-56 h-fit relative"
              key={index}
              // onClick={() => router.push(`/plans/${plan.id}`)}
            >
              <div className="w-full h-[300px]">
                <Image
                  priority={true}
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
            </div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
