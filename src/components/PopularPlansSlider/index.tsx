import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { FiMapPin } from "react-icons/fi";

export function PopularPlansSlide() {
  const [carouselWidth, setCarouselWidth] = useState(0);

  const popularTripPlan = [
    {
      url: "https://images.pexels.com/photos/4825701/pexels-photo-4825701.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      name: "Indonesia",
      description:
        "Planning your trip is crucial for a stress-free and enjoyable experience. It saves time and money by finding the best deals and creating.",
      location: "5 Stars Hotel",
    },
    {
      url: "https://images.pexels.com/photos/4825701/pexels-photo-4825701.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      name: "Indonesia",
      description:
        "Planning your trip is crucial for a stress-free and enjoyable experience. It saves time and money by finding the best deals and creating.",
      location: "5 Stars Hotel",
    },
    {
      url: "https://images.pexels.com/photos/4825701/pexels-photo-4825701.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      name: "Indonesia",
      description:
        "Planning your trip is crucial for a stress-free and enjoyable experience. It saves time and money by finding the best deals and creating.",
      location: "5 Stars Hotel",
    },
    {
      url: "https://images.pexels.com/photos/4825701/pexels-photo-4825701.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      name: "Indonesia",
      description:
        "Planning your trip is crucial for a stress-free and enjoyable experience. It saves time and money by finding the best deals and creating.",
      location: "5 Stars Hotel",
    },
    {
      url: "https://images.pexels.com/photos/4825701/pexels-photo-4825701.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      name: "Indonesia",
      description:
        "Planning your trip is crucial for a stress-free and enjoyable experience. It saves time and money by finding the best deals and creating.",
      location: "5 Stars Hotel",
    },
  ];

  const slideRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (slideRef.current) {
      setCarouselWidth(
        slideRef.current.scrollWidth - slideRef.current.offsetWidth
      );
    }
  }, []);

  return (
    <section className="w-full h-full">
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
          {popularTripPlan.map((plan, index) => (
            <div className="w-56 h-fit relative" key={index}>
              <div className="w-full h-[300px]">
                <Image
                  src={plan.url}
                  alt="location name"
                  width={600}
                  height={900}
                  draggable={false}
                  className="w-full h-full max-w-[300px] max-h-[300px] object-cover rounded-2xl"
                />
              </div>
              <div className="mt-6 w-full">
                <span className="block font-bold text-xl">{plan.name}</span>
                <span className="mt-2 block text-xs text-gray-500 font-semibold">
                  {plan.description}
                </span>
              </div>
              <div className="w-full max-w-[150px] flex items-center justify-center gap-2 shadow-lg bg-white rounded-xl absolute top-0 right-[-25px] px-4 py-2">
                <FiMapPin size={16} />
                <span className="block text-gray-900 font-bold truncate">
                  {plan.location}
                </span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
