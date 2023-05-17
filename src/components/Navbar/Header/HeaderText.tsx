export function HeaderText() {
  return (
    <div className="px-8 flex flex-col items-center justify-center h-full max-w-lg md:max-w-3xl lg:max-w-4xl gap-4 mx-auto md:gap-8 mb-28">
      <span className="md:block hidden lg:hidden text-white text-2xl font-bold mb-8">
        PlanMyJourney
      </span>
      <h3 className="text-white text-medium text-2xl font-medium md:text-4xl lg:text-5xl text-shadow text-center">
        Explore The World Around You
      </h3>
      <p className="text-white text-medium text-shadow text-center text-xs md:text-base">
        Explore your dream destinations and take a break from the everyday
        stress. Share and discover travel plans with our community.
      </p>
    </div>
  );
}
