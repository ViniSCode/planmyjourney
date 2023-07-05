import { GetPlansQuery } from "@/generated/graphql";
import { motion, useDragControls } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

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

  const handleClick = (event: any) => {
    console.log(event.movementX + 20);
    // controls.start(event);
  };

  return (
    <motion.section
      id="popular-plans-section"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full h-full"
    >
      <h2 className="text-3xl dark:text-white text-black font-bold text-center">
        Popular Trip Plans
      </h2>
      <div
        className="mt-40 carousel w-full max-w-[370px] md:max-w-[660px] lg:max-w-full mx-auto overflow-x-hidden flex h-full relative"
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
              className="w-72 h-fit relative border-2 border-transparent bg-gray-260 dark:bg-transparent dark:border-blue-500 rounded-3xl p-4"
              key={index}
            >
              <div className="w-full h-[250px]">
                <Image
                  priority={true}
                  src={plan.images[0]}
                  alt="location name"
                  width={600}
                  height={900}
                  draggable={false}
                  className="w-full h-full max-w-[300px] max-h-[250px] object-cover rounded-3xl brightness-[0.8]"
                />
              </div>
              <div className="mt-4 flex gap-2 flex-col">
                <span className="dark:text-gray-450 text-gray-700 text-sm font-semibold">
                  {plan.days} days
                </span>
                <strong className="dark:text-white text-black text-xl max-w-[190px] truncate">
                  {plan.name ? plan.name : plan.location[0].country}
                </strong>
                <p className="max-w-[190px] dark:text-gray-450 text-gray-700 text-sm font-semibold">
                  the trip plan is estimated to cost around{" "}
                  {plan.expenses.max.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
      <Link
        href="/plans"
        className="w-full flex items-center justify-center mt-20"
      >
        <button className="button-blue-bg px-6 py-2 rounded-full text-white">
          All Plans
        </button>
      </Link>
    </motion.section>
  );
}
