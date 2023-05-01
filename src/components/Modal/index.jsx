import useMap from "@/hooks/useMap"

export function Modal () {
  const {setIsModalOpen} = useMap()

  return (
    <>
    <div className="w-full h-screen fixed inset-0 bg-[#00000075] z-30 flex items-center justify-center" onClick={() => setIsModalOpen(false)}></div>
    <div className="fixed w-full max-w-[80%] md:max-w-[500px] lg:max-w-[600px] bg-white px-10 py-10 rounded-xl z-40 top-1/2 left-1/2 -translate-x-2/4 -translate-y-2/4">
      <h1 className="text-[20px] md:text-2xl font-medium">Change Location Name</h1>
      <p className="mt-4 text-gray-500 text-xs font-medium md:text-sm">Is the name of your chosen location incorrect or incomplete? Change the name to something more accurate and complete to avoid confusion and make your trip planning more efficient.</p>
      <input
        type="text"
        placeholder='Location Name'
        className="mt-4 border rounded-md px-2 py-2 w-full" 
      />
    </div>
    </>
  )
}