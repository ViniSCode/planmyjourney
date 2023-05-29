import { useSharePlan } from "@/hooks/useSharePlan";
import { storage } from "@/lib/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { useState } from "react";
import { FiX } from "react-icons/fi";
import { IoReorderTwo } from "react-icons/io5";
import { RiArrowRightCircleLine } from "react-icons/ri";
import { toast } from "react-toastify";
import { v4 } from "uuid";
import { Loading } from "../Loading";

interface EditImagesProp {
  images: File[];
  setImages: any;
}

export function EditImages({ images, setImages }: EditImagesProp) {
  const { setImagesURL } = useSharePlan();
  const [isUploading, setIsUploading] = useState(false);
  const router = useRouter();

  async function uploadImage() {
    setIsUploading(true);
    const imagesURL = await uploadImageURL(images);

    if (!imagesURL) {
      toast.error("Image format not supported");
      setIsUploading(false);
      return;
    }

    setImagesURL(imagesURL);

    setIsUploading(false);
    router.push("/share/location");
  }
  async function uploadImageURL(images: File[]) {
    try {
      const imageUrls = [];

      for (let i = 0; i < images.length; i++) {
        const image = images[i];
        const imageRef = ref(storage, `images/${image.name + v4()}`);
        await uploadBytes(imageRef, image);
        const imageURL = await getDownloadURL(imageRef);
        imageUrls.push(imageURL);
      }

      return imageUrls;
    } catch (error) {
      console.error(error);
    }
  }

  const handleImageDelete = (index: number) => {
    setImages((prevImages: any) => {
      const newImages = [...prevImages];
      newImages.splice(index, 1);
      return newImages;
    });
  };

  return (
    <div className="overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-500 flex justify-center flex-col gap-3 bg-gray-900 w-full h-screen text-gray-300 px-10">
      {isUploading && <Loading />}
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
        {images.length > 0 ? (
          <>
            <button
              type="button"
              onClick={() => router.back()}
              className="px-2 py-3 rounded-lg text-gray-600 bg-white w-full hover:brightness-75 transition-[filter]"
            >
              Previous
            </button>
            <motion.button
              disabled={isUploading}
              onClick={uploadImage}
              type="button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="px-2 py-3 rounded-lg text-white bg-blue-500 w-full disabled:animate-pulse disabled:bg-blue-900"
            >
              Next
            </motion.button>
          </>
        ) : (
          <>
            <button
              onClick={() => router.back()}
              type="button"
              className="px-2 py-3 rounded-lg text-white border border-white w-full hover:bg-white hover:text-gray-900 transition-colors"
            >
              Previous
            </button>
            <div className="w-full">
              <button
                onClick={() =>
                  toast.error("You must upload at least one image")
                }
                className="px-2 py-3 rounded-lg text-white bg-blue-500 w-full flex items-center gap-2 justify-center hover:bg-blue-600 transition-colors"
              >
                Next
                <RiArrowRightCircleLine size={25} />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
