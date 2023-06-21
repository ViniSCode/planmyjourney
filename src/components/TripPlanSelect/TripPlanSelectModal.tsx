import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FiMapPin } from "react-icons/fi";
import { SpinnerSm } from "../Loading/SpinnerSm";
import { Duration } from "./Duration";
import { Expenses } from "./Expenses";
interface ModalProps {
  selected: string;
  setIsModalOpen: any;
}

type Country = {
  capital: string[];
  flags: {
    alt: string;
    png: string;
    svg: string;
  };
  name: {
    common: string;
    nativeName: any;
    official: string;
  };
};

export function TripPlanSelectModal({ setIsModalOpen, selected }: ModalProps) {
  const [inputSearch, setInputSearch] = useState("");
  const [countries, setCountries] = useState<Country[]>([]);
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (inputSearch) {
      const typingTimeout = setTimeout(async () => {
        const countries = await fetchCountries(inputSearch);
        setCountries(countries);
        console.log(countries);
      }, 1000);

      return () => {
        clearTimeout(typingTimeout);
      };
    } else {
      setCountries([]);
      setInputSearch("");
    }
  }, [inputSearch]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsModalOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [setIsModalOpen]);

  async function fetchCountries(query: string) {
    try {
      setFetching(true);
      const response = await fetch(
        `https://restcountries.com/v3.1/name/${query}?fields=name,capital,flags`
      );
      const data = await response.json();

      setFetching(false);
      return data.slice(0, 5);
    } catch (error) {
      console.log(error);
      setFetching(false);
      setError(true);
    }

    return;
  }

  const list = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  };

  const item = {
    visible: (index: any) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: index * 0.1,
      },
    }),
    hidden: { opacity: 0, y: 100 },
  };

  return selected === "location" ? (
    <>
      <div
        className="w-full h-screen fixed inset-0 bg-[#00000075] z-30 flex items-center justify-center"
        onClick={() => setIsModalOpen(false)}
      ></div>
      <div className="fixed w-full max-w-[290px] sm:max-w-[500px] xs:max-w-[400px] md:max-w-[600px] lg:max-w-[800px] bg-white px-10 py-10 rounded-xl z-40 top-1/2 left-1/2 -translate-x-2/4 -translate-y-2/4">
        <div className="flex items-center relative">
          <button
            className="absolute right-0 bg-gray-100 text-gray-300 font-medium text-lg border border-gray-300 rounded-lg px-2 py-[2px] mb-2"
            onClick={() => setIsModalOpen(false)}
          >
            esc
          </button>
          <FiMapPin size={30} className="text-pink-500 mb-2" />
          <input
            value={inputSearch}
            onChange={(e) => setInputSearch(e.target.value)}
            type="text"
            placeholder="Enter your destination (Country)"
            className="w-full h-full pt-4 pb-6 border-0 focus:ring-0 focus:outline-none font-medium text-lg placeholder:text-gray-300"
          />
        </div>
        <div className="bg-gray-200 w-full h-[2px]"></div>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={list}
          className="mt-8 flex flex-col items-start gap-2"
        >
          {countries && countries.length > 0 ? (
            countries.map((country, index) => (
              <motion.div
                custom={index}
                variants={item}
                key={index}
                className="rounded-lg flex items-center gap-4 cursor-pointer w-full hover:bg-gray-200 transition-colors px-4 py-4"
              >
                <Image
                  src={country.flags.png}
                  width={30}
                  height={20}
                  alt={country.flags.svg}
                  priority
                  className="rounded h-auto w-auto object-cover"
                />
                <span className="text-lg text-gray-700 font-medium truncate w-fit">
                  {country.name.common}
                </span>
              </motion.div>
            ))
          ) : inputSearch ? (
            <div className="w-full flex items-center justify-center">
              <SpinnerSm />
            </div>
          ) : (
            !fetching &&
            error && (
              <p className="text-lg text-gray-700 font-medium text-center w-full">
                No countries found.
              </p>
            )
          )}
        </motion.div>
      </div>
    </>
  ) : selected === "duration" ? (
    <Duration setIsModalOpen={setIsModalOpen} />
  ) : (
    <Expenses setIsModalOpen={setIsModalOpen} />
  );
}
