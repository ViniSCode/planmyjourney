export function TransportationButton ({children, transportation, ...rest}) { 
  return (
    <button 
    type='button'
    className={`bg-gray-200 rounded-lg w-12 h-12 flex items-center justify-center text-gray-700 ${transportation === true && 'bg-pink-500 text-white'}`}
    {...rest}
  >
    {children}
  </button>
  )
}