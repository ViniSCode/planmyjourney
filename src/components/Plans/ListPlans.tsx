import { Plan } from "@/pages/plans";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { FiBookmark } from "react-icons/fi";
import { toast } from "react-toastify";

interface ListPlansProps {
  plans: Plan[];
}

export function ListPlans({ plans }: ListPlansProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { data: session } = useSession();
  const itemsPerPage = plans.length % 3 !== 0;
  const router = useRouter();
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

  async function handleLike(planId: string) {
    if (!session) {
      return;
    }
    if (!planId) {
      return;
    }

    setIsLoading(true);

    try {
      const reqData = await fetch("/api/like", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          session,
          planId,
        }),
      }).then((res) => res.json());

      if (reqData?.success) {
        toast.success(reqData.message);
        setIsLoading(false);
        // router.push("/");
      } else {
        toast.error(reqData?.message);
        setIsLoading(false);
      }
    } catch (err) {
      setIsLoading(false);
      toast.error("An error occurred while sharing the plan");
      console.log(err);
    }
  }

  return (
    <section className="mt-3 w-full h-full">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mt-12 flex gap-10 ssm:gap-7 md:gap-7 lg:gap-7 flex-col flex-nowrap ssm:flex-row ssm:flex-wrap justify-between"
      >
        {plans.length > 0 ? (
          plans.map((plan, index) => (
            <motion.div
              className="w-full ssm:max-w-[46%] md:max-w-[30%] lg:max-w-[30%] h-full relative planCard"
              key={index}
            >
              <div
                className="w-full h-full cursor-pointer"
                onClick={() => router.push(`/plans/${plan.id}`)}
              >
                {plan.images && (
                  <Image
                    src={plan.images[0]}
                    alt="location name"
                    width={300}
                    height={300}
                    // loading="lazy"
                    draggable={false}
                    priority={true}
                    className="w-full h-full max-w-[600px] min-h-[260px] max-h-[260px] object-cover rounded-2xl brightness-95"
                  />
                )}
              </div>
              <div className="mt-4 w-full flex flex-row justify-between gap-2">
                <div className="w-full max-w-[70%] flex flex-col gap-[2px]">
                  <span className="block font-semibold text-gray-900 text-sm truncate">
                    {plan.location[0].country} | Trip Plan
                  </span>
                  <span className="block text-gray-900 font-semibold text-sm">
                    ${plan.expenses.min} to ${plan.expenses.max}
                  </span>
                  <span className="block text-gray-900 text-sm">
                    {plan.days} days trip plan
                  </span>
                </div>
                <div
                  className="flex gap-1 items-baseline"
                  onClick={() => {
                    if (!isLoading) {
                      handleLike(plan.id);
                    }
                  }}
                >
                  <div className="flex items-center gap-1 cursor-pointer">
                    {/* <FiHeart size={15} /> */}
                    {/* <span className="text-sm"></span> */}
                  </div>
                </div>
              </div>
              <div className="w-full max-w-fit rounded-xl absolute top-[10px] right-[10px] cursor-pointer">
                <FiBookmark size={25} className="text-white" />
              </div>
            </motion.div>
          ))
        ) : (
          <div className="flex items-center justify-center mt-12 w-full">
            <p className="text-center">No plans found yet.</p>
          </div>
        )}
        {itemsPerPage && <div className="flex-grow"></div>}
      </motion.div>
    </section>
  );
}
