import Image from "next/image";

export function HeaderText() {
  return (
    <div className="mt-40 md:mt-0 max-w-[370px] md:max-w-[1120px] mx-auto w-full px-8 flex flex-col lg:flex-row items-center justify-center lg:justify-between h-full gap-10">
      <div className="lg:max-w-[460px] xl:max-w-[530px] w-full order-1 mt-20 lg:mt-0 flex items-center justify-center flex-col lg:block">
        <div className="relative">
          <h3 className="block dark:text-white text-black w-80 text-center lg:text-start lg:w-full text-4xl md:text-[52px] leading-[1.5] xl:text-6xl xl:leading-[1.5]">
            Explore The World Around You
          </h3>
          <span className="block absolute w-[200px] h-1 underline-blue-bg top-[50px] md:top-[75px] xl:top-[85px]"></span>
        </div>
        <p className="mt-8 dark:text-white max-w-lg text-black text-shadow text-sm text-center lg:text-start">
          Explore your dream destinations and take a break from the everyday
          stress. Share and discover travel plans with our community.
        </p>
        <button className="button-blue-bg rounded px-4 py-2 text-white mt-16">
          Get started
        </button>
      </div>
      <div className="w-full relative mt-52 max-w-[420px] xl:max-w-[440px] order-0 lg:order-2 lg:mt-0">
        <Image
          src="/assets/hero-1.png"
          width={160}
          height={154}
          alt="hero image"
          className="absolute z-20 left-[5%] top-[-3%] drop-shadow-lg w-[33%]"
        />
        <Image
          src="/assets/hero-2.png"
          width={160}
          height={154}
          alt="hero image"
          className="absolute z-20 bottom-[5%] left-[-11%] w-[33%]"
        />
        <Image
          src="/assets/hero-3.png"
          width={160}
          height={154}
          alt="hero image"
          className="absolute z-20 right-[20%] bottom-[30%] drop-shadow-lg w-[33%]"
        />
        <Image
          src="/assets/travel-badge.png"
          width={160}
          height={154}
          alt="hero image"
          className="absolute z-20 right-[18%] bottom-[-20%] drop-shadow-lg w-[33%]"
        />
        <Image
          src="/assets/hero-dark.png"
          width={445}
          height={489}
          alt="hero image"
          className="brightness-75 dark:block hidden w-full drop-shadow-lg"
          quality={100}
          priority={true}
        />

        <Image
          src="/assets/hero-light.png"
          width={445}
          height={489}
          alt="Mountain Image"
          className="dark:hidden block w-full"
          quality={100}
          priority={true}
        />
      </div>
    </div>
  );
}
