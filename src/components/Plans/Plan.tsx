import { motion } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { FiHeart } from "react-icons/fi";
import { RiStarFill } from "react-icons/ri";

export function Plan() {
  const popularTripPlan = [
    {
      url: "https://images.pexels.com/photos/4825701/pexels-photo-4825701.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      name: "Indonesia",
      expenses: {
        min: 1000,
        max: 5000,
      },
      location: "5 Stars Hotel",
    },
    {
      url: "https://images.pexels.com/photos/4825701/pexels-photo-4825701.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      name: "Indonesia",
      expenses: {
        min: 1000,
        max: 5000,
      },
      location: "5 Stars Hotel",
    },
    {
      url: "https://images.pexels.com/photos/4825701/pexels-photo-4825701.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      name: "Indonesia",
      expenses: {
        min: 1000,
        max: 5000,
      },
      location: "5 Stars Hotel",
    },
    {
      url: "https://images.pexels.com/photos/4825701/pexels-photo-4825701.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      name: "Indonesia",
      expenses: {
        min: 1000,
        max: 5000,
      },
      location: "5 Stars Hotel",
    },
    {
      url: "https://images.pexels.com/photos/4825701/pexels-photo-4825701.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      name: "Indonesia",
      expenses: {
        min: 1000,
        max: 5000,
      },
      location: "5 Stars Hotel",
    },
    {
      url: "https://images.pexels.com/photos/4825701/pexels-photo-4825701.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      name: "Indonesia",
      expenses: {
        min: 1000,
        max: 5000,
      },
      location: "5 Stars Hotel",
    },
    {
      url: "https://images.pexels.com/photos/4825701/pexels-photo-4825701.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      name: "Indonesia",
      expenses: {
        min: 1000,
        max: 5000,
      },
      location: "5 Stars Hotel",
    },
    {
      url: "https://images.pexels.com/photos/4825701/pexels-photo-4825701.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      name: "Indonesia",
      expenses: {
        min: 1000,
        max: 5000,
      },
      location: "5 Stars Hotel",
    },
    {
      url: "https://images.pexels.com/photos/4825701/pexels-photo-4825701.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      name: "Indonesia",
      expenses: {
        min: 1000,
        max: 5000,
      },
      location: "5 Stars Hotel",
    },
    {
      url: "https://images.pexels.com/photos/4825701/pexels-photo-4825701.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      name: "Indonesia",
      expenses: {
        min: 1000,
        max: 5000,
      },
      location: "5 Stars Hotel",
    },
  ];

  const slideRef = useRef<HTMLDivElement>(null);

  return (
    <section className="mt-3 w-full h-full">
      <motion.div className="mt-24 flex gap-10 md:gap-7 lg:gap-7 flex-col flex-nowrap ssm:flex-row ssm:flex-wrap justify-between">
        {popularTripPlan.map((plan, index) => (
          <div
            className="cursor-pointer w-full ssm:max-w-[46%] md:max-w-[30%] lg:max-w-[30%] h-full relative planCard"
            key={index}
          >
            <div className="w-full h-full">
              <Image
                src={plan.url}
                alt="location name"
                width={600}
                height={360}
                draggable={false}
                className="w-full h-full max-w-[600px] max-h-[360px] object-cover rounded-2xl"
              />
            </div>
            <div className="mt-4 w-full flex flex-row justify-between gap-2">
              <div className="w-full max-w-[70%] flex flex-col gap-[2px]">
                <span className="block font-semibold text-gray-900 text-sm truncate">
                  São Paulo, Brasil, São Paulo, Brasil
                </span>
                <span className="block text-gray-900 font-semibold text-sm">
                  ${plan.expenses.min} to ${plan.expenses.max}
                </span>
                <span className="block text-gray-900 text-sm">
                  {3} days trip plan
                </span>
              </div>
              <div className="flex gap-1 items-baseline">
                <div className="flex items-center gap-1">
                  <RiStarFill size={15} />
                  <span className="text-sm">{4.99}</span>
                </div>
              </div>
            </div>
            <div className="w-full max-w-fit shadow-lg rounded-xl absolute top-[10px] right-[10px]">
              <FiHeart size={25} className="text-white" />
            </div>
          </div>
        ))}
        <div className="flex-grow"></div>
      </motion.div>
    </section>
  );
}
