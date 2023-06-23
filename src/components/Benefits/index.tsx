import {
  FiClock,
  FiDollarSign,
  FiEdit,
  FiMap,
  FiStar,
  FiTag,
} from "react-icons/fi";
import { BenefitsCard } from "./BenefitsCard";

export function Benefits() {
  const cards = [
    {
      title: "Travel Planning",
      description:
        "Discover personalized itineraries. Share amazing travel plans with our community.",
      icon: <FiEdit size={25} className="text-orange-500" />,
    },
    {
      title: "Detailed Info",
      description:
        "Get all the information you need about each destination, including reviews, ratings, and more.",
      icon: <FiMap size={25} className="text-purple-500" />,
    },
    {
      title: "Ratings & Reviews",
      description:
        "Make informed decisions with user ratings and reviews for each destination.",
      icon: <FiStar size={25} className="text-green-500" />,
    },
    {
      title: "Save Time Planning",
      description:
        "Contribute to the community by sharing and accessing travel plans from other members.",
      icon: <FiClock size={25} className="text-purple-400" />,
    },
    {
      title: "No Cost to Use",
      description:
        "Plan your trip for free with our website, no need to hire a travel agent.",
      icon: <FiDollarSign size={25} className="text-blue-400" />,
    },
    {
      title: "Budget-friendly Plans",
      description:
        "Discover budget-friendly options for restaurants, activities, and more.",
      icon: <FiTag size={25} className="text-purple-300" />,
    },
  ];

  return (
    <section className="mt-80 md:max-w-[660px] lg:max-w-full">
      <h2 className="text-3xl font-bold text-center dark:text-white text-black">
        Our Benefits
      </h2>
      <div className="mt-40 flex flex-col md:flex-row md:flex-wrap gap-10 md:gap-5 justify-between lg:justify-center items-center lg:gap-8">
        {cards.map(({ title, icon, description }, index) => (
          <BenefitsCard
            key={index}
            title={title}
            description={description}
            icon={icon}
          />
        ))}
      </div>
    </section>
  );
}
