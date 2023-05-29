import { ClimbingBoxLoader } from "react-spinners";

export function Loading() {
  return (
    <div className="bg-white fixed inset-0 h-[100vh] z-[9999] w-full">
      <div className="flex items-center justify-center mt-[45vh] animate-pulse">
        <ClimbingBoxLoader color="#FB3C61" size={20} />
      </div>
    </div>
  );
}
