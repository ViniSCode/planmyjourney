import Image from "next/image";

export function OurServices() {
  return (
    <section className="flex flex-col item-center justify-center gap-28 md:gap-60 mt-20 md">
      <div>
        <div className="flex flex-col lg:flex-row lg:gap-20">
          <div>
            <Image
              alt="woman traveling"
              width={660}
              height={666}
              quality={100}
              src="/assets/avatar-blue.png"
              className="w-full h-full max-w-[370px] max-w-h-[373px] md:max-w-[660px] md:max-h-[666px] lg:w-[430px] lg:h-[436px]"
            />
          </div>
          <div className="mt-12 max-w-[370px] md:max-w-[666px] lg:max-w-[548px] md:mt-16">
            <strong className="text-3xl md:text-5xl lg:text-[55px] lg:leading-[80px]">
              Discover and Share Travel Plans
            </strong>
            <p className="font-medium text-gray-700 mt-6 text-xs md:text-base">
              Planning your trip is crucial for a stress-free and enjoyable
              experience. It saves time and money by finding the best deals and
              creating a realistic budget. Moreover, it helps you avoid
              unexpected problems and ensures that you can fully immerse
              yourself in the local culture and experience all that your
              destination has to offer. By sharing your plans, you can
              contribute to the community and make it easier for others to
              discover and explore new destinations.
            </p>
            <div className="hidden lg:flex relative mt-14 items-center justify-end">
              <div className="relative w-full max-w-[250px] md:max-w-[450px] lg:max-w-[400px] order-1">
                <Image
                  alt="plane icon"
                  src="/assets/plane-2.png"
                  width={275}
                  height={136}
                  quality={100}
                  className="absolute top-[-30px] left-0 lg:right-0 lg:left-[unset] max-w-[200px] md:max-w-[335px] lg:max-w-[270px] lg:scale-x-[-1] lg:scale-y-[1]"
                />
              </div>
              <button className="min-w-fit max-w-fit bg-pink-500 w-full text-white rounded-full px-6 py-3 text-xs md:text-base">
                Share Your Plan
              </button>
            </div>
          </div>
        </div>
        <div className="relative mt-14 flex items-center justify-end lg:hidden">
          <div className="relative w-full max-w-[250px] md:max-w-[450px]">
            <Image
              alt="plane icon"
              src="/assets/plane-2.png"
              width={335}
              height={136}
              quality={100}
              className="absolute top-[-30px] left-0 lg:right-0 lg:left-[unset] max-w-[200px] md:max-w-[335px]"
            />
          </div>
          <button className="min-w-fit max-w-fit bg-pink-500 w-full text-white rounded-full px-6 py-3 text-xs md:text-base">
            Share Your Plan
          </button>
        </div>
      </div>

      <div>
        <div className="flex flex-col lg:flex-row lg:gap-20">
          <div className="order-2">
            <Image
              alt="woman traveling"
              width={660}
              height={666}
              quality={100}
              src="/assets/avatar-yellow.png"
              className="w-full h-full max-w-[370px] max-w-h-[373px] md:max-w-[660px] md:max-h-[666px] lg:w-[430px] lg:h-[436px]"
            />
          </div>

          <div className="mt-12 max-w-[370px] md:max-w-[666px] lg:max-w-[548px] md:mt-16 order-1">
            <strong className="text-3xl md:text-5xl lg:text-[55px] lg:leading-[80px]">
              Find Your Dream Travel Plan
            </strong>
            <p className="font-medium text-gray-700 mt-6 text-xs md:text-base">
              Planning your trip is crucial for a stress-free and enjoyable
              experience. It saves time and money by finding the best deals and
              creating a realistic budget. Moreover, it helps you avoid
              unexpected problems and ensures that you can fully immerse
              yourself in the local culture and experience all that your
              destination has to offer.
            </p>
            <div className="hidden lg:flex relative mt-14 items-center justify-end">
              <div className="relative w-full max-w-[250px] md:max-w-[450px] lg:max-w-[400px]">
                <Image
                  alt="plane icon"
                  src="/assets/plane-2.png"
                  width={275}
                  height={136}
                  quality={100}
                  className="absolute top-[-30px] left-0  max-w-[200px] md:max-w-[335px] lg:max-w-[270px]"
                />
              </div>
              <button className="min-w-fit max-w-fit bg-yellow-500 w-full text-gray-900 rounded-full px-6 py-3 text-xs md:text-base">
                Find a Plan
              </button>
            </div>
          </div>
        </div>
        <div className="relative mt-14 flex items-center justify-end lg:hidden">
          <div className="relative w-full max-w-[250px] md:max-w-[450px]">
            <Image
              alt="plane icon"
              src="/assets/plane-2.png"
              width={335}
              height={136}
              quality={100}
              className="absolute top-[-30px] left-0 lg:right-0 lg:left-[unset] max-w-[200px] md:max-w-[335px]"
            />
          </div>
          <button className="min-w-fit max-w-fit bg-pink-500 w-full text-white rounded-full px-6 py-3 text-xs md:text-base">
            Share Your Plan
          </button>
        </div>
      </div>
    </section>
  );
}
