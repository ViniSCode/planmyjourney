import Image from "next/image";

export function HeaderText() {
  return (
    <div className="max-w-[1120px] mx-auto w-full px-8 flex items-center justify-between h-full gap-4 md:gap-10">
      <div className="max-w-[500px]">
        <span className="md:block hidden lg:hidden text-white text-xl font-bold mb-4">
          PlanMyJourney
        </span>
        <div>
          <h3 className="block text-white text-medium text-2xl font-medium md:text-3xl lg:text-5xl text-shadow">
            <span className="border-b-4">Explore</span> The World Around You
          </h3>
        </div>
        <p className="mt-8 text-white text-medium text-shadow text-xs md:text-sm max-w-lg">
          Explore your dream destinations and take a break from the everyday
          stress. Share and discover travel plans with our community.
        </p>
      </div>
      <div>
        <Image
          src="/assets/hero-dark.png"
          width={445}
          height={489}
          alt="Mountain Image"
          className="brightness-75 dark:block hidden w-full"
          quality={100}
          loading="lazy"
        />

        <Image
          src="/assets/hero-dark.png"
          width={445}
          height={489}
          alt="Mountain Image"
          className="dark:hidden block w-full"
          quality={100}
          loading="lazy"
        />
      </div>
    </div>
  );
}
