import useMap from "@/hooks/useMap";
import { ReactNode } from "react";

export function Modal({ children }: { children: ReactNode }) {
  const { setIsModalOpen } = useMap();

  return (
    <>
      <div
        className="w-full h-screen fixed inset-0 bg-[#00000075] z-30 flex items-center justify-center"
        onClick={() => setIsModalOpen(false)}
      ></div>
      <div className="fixed w-full max-w-[290px] sm:max-w-[500px] xs:max-w-[400px] md:max-w-[600px] lg:max-w-[800px] bg-white px-5 py-5 rounded-xl z-40 top-1/2 left-1/2 -translate-x-2/4 -translate-y-2/4">
        {children}
      </div>
    </>
  );
}
