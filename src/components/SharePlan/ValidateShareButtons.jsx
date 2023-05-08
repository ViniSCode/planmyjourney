import { useRouter } from "next/router";
import { RiArrowRightCircleLine } from "react-icons/ri";
import { toast } from "react-toastify";

export function ValidateShareButtons({ alert }) {
  const router = useRouter();

  return (
    <div className="mt-12 flex-col md:flex-row flex items-center gap-4 mx-auto w-full max-w-[400px]">
      <button
        onClick={() => router.back()}
        type="button"
        className="px-2 py-3 rounded-lg text-gray-900 border border-gray-900 w-full hover:bg-gray-900 hover:text-white transition-colors"
      >
        Previous
      </button>
      <div className="w-full">
        <button
          onClick={() => toast.error(alert)}
          className="px-2 py-3 rounded-lg text-white bg-blue-500 w-full flex items-center gap-2 justify-center hover:bg-blue-600 transition-colors"
        >
          Next
          <RiArrowRightCircleLine size={25} />
        </button>
      </div>
    </div>
  );
}
