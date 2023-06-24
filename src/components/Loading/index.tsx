import { CircleLoader } from "react-spinners";

export function Loading() {
  return (
    <div className="dark:bg-gradient-to-r dark:from-black dark:via-slate-900 dark:to-black bg-white fixed inset-0 h-[100vh] z-[9999] w-full">
      <div className="flex items-center justify-center mt-[45vh] animate-pulse">
        <CircleLoader color="#3B87F9" size={70} />
      </div>
    </div>
  );
}
