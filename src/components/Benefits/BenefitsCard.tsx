interface BenefitsCardProps {
  icon: any;
  title: string;
  description: string;
  key: any;
}

export function BenefitsCard({ icon, title, description }: BenefitsCardProps) {
  return (
    <div className="dark:bg-[#11344D] bg-gray-260 px-8 py-12 rounded-2xl max-w-[284px] md:max-w-[320px] lg:max-w-[31%] shadow-lg hover:shadow-none transition-shadow select-none">
      <div className="p-4 rounded-xl dark:bg-[#0D2D44] bg-white max-w-fit">
        {icon}
      </div>
      <div className="mt-11 md:mt-16 lg:mt-16">
        <strong className="text-lg md:text-xl lg:text-lg dark:text-white text-black">
          {title}
        </strong>
        <p className="text-xs md:text-sm md:mt-5 lg:text-sm dark:text-gray-400 text-gray-500 font-medium mt-3">
          {description}
        </p>
      </div>
    </div>
  );
}
