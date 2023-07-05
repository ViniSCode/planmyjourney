import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

export function DisplayTripPlanImages({ images }: any) {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 4 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mt-3 w-full h-full">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mt-12"
      >
        <motion.div className="w-full h-full relative planCard md:flex md:gap-4">
          <div className="w-full h-full">
            {images.length > 0 && (
              <div>
                <Image
                  src={images[activeIndex]}
                  alt="location name"
                  width={500}
                  height={500}
                  placeholder="blur"
                  blurDataURL={images[activeIndex]}
                  draggable={false}
                  priority={true}
                  className="select-none w-full h-full max-w-full min-h-[40vh] max-h-[40vh]  md:min-h-[60vh] md:max-h-[60vh] object-cover rounded-xl"
                />
              </div>
            )}
          </div>
        </motion.div>
        <div className="flex-grow"></div>
      </motion.div>
    </div>
  );
}

{
  /* <div className="mt-4 md:mt-0 w-full max-w-full md:max-w-[150px]">
<div className="w-full h-full flex md:flex-col justify-between gap-2">
  {images.slice(0, 4).map((image: any, index: any) => (
    <Image
      onClick={() => setSelectedImage(image)}
      key={index}
      src={image || "placeholder.jpg"}
      alt={image ? "location name" : "empty"}
      width={300}
      height={300}
      priority={true}
      draggable={false}
      className="cursor-pointer w-full h-full object-cover rounded-xl brightness-95 max-w-[23%] min-h-[60px] max-h-[60px] xs:min-h-[80px] xs:max-h-[80px]  ssm:min-h-[100px] ssm:max-h-[100px] md:w-full md:max-w-full md:min-h-[115px]"
    />
  ))}
  {[...Array(Math.max(0, 4 - images.length))].map((_, index) => (
    <div
      key={index + images.length}
      className="dark:bg-blue-600 bg-gray-100 w-full h-full object-cover rounded-xl brightness-95 max-w-[23%] min-h-[60px] max-h-[60px] xs:min-h-[80px] xs:max-h-[80px]  ssm:min-h-[100px] ssm:max-h-[100px] md:w-full md:max-w-full md:min-h-[115px]"
    />
  ))}
</div>
</div> */
}
