import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";
import { FiX } from "react-icons/fi";
import { IoReorderTwo } from "react-icons/io5";

interface EditImagesProp {
  images: File[];
  setImages: any;
}

export function EditImages({ images, setImages }: EditImagesProp) {
  const router = useRouter();

  const handleImageDelete = (index: number) => {
    setImages((prevImages: any) => {
      const newImages = [...prevImages];
      newImages.splice(index, 1);
      return newImages;
    });
  };

  return (
    <div className="overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-500 flex justify-center flex-col gap-3 bg-gray-900 w-full h-screen text-gray-300 px-10">
      <h2 className="mb-4 text-center text-[24px] text-white">
        Uploaded Images
      </h2>
      <p className="mb-14 text-center text-gray-300 text-sm">
        Remove or edit your uploaded images
      </p>
      <div className="overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-500 w-full py-2 px-4 max-h-96 max-w-[90%] md:max-w-[80%] lg:max-w-[400px] mx-auto">
        {images.length > 0 ? (
          images.map((image, index) => (
            <div
              className="flex items-center gap-3 mx-auto w-full md:max-w-full lg:max-w-[320px] mt-3"
              key={index}
            >
              <IoReorderTwo
                size={20}
                className="cursor-pointer reorder-handle"
              />
              <p className="truncate text-sm w-[90%]">{image.name}</p>
              <FiX
                className="text-red-500 cursor-pointer hover:text-red-300 transition-colors"
                size={20}
                onClick={() => handleImageDelete(index)}
              />
            </div>
          ))
        ) : (
          <p className="mb-14 text-center text-gray-300 text-sm">
            No location selected yet. Please select at least two locations on
            the map to proceed.
          </p>
        )}
      </div>
      <div className="mt-20 flex items-center gap-4 mx-auto w-full max-w-xs">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-2 py-2 rounded-lg text-gray-600 bg-white w-full hover:brightness-75 transition-[filter]"
        >
          Previous
        </button>
        <Link href="/share/location" className="w-full">
          <motion.button
            type="button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="px-2 py-2 rounded-lg text-white bg-blue-500 w-full hover:brightness-75 transition-[filter]"
          >
            Next
          </motion.button>
        </Link>
      </div>
    </div>
  );
}
