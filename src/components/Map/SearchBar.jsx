// import { useEffect, useState } from 'react';
// import { FiX } from 'react-icons/fi';
// import { RiSearch2Line } from 'react-icons/ri';
// import { useMapEvents } from 'react-leaflet';
// import { PulseLoader } from 'react-spinners';

// export function SearchBar({ apiKey, markers, setMarkers, setResults, results, query, setQuery }) {

//   const [loading, setLoading] = useState(false);

//   const map = useMapEvents({
//     click(e) {
//       // Check if the target of the click event isn't the map
//       if (!document.querySelector('.searchbar').contains(e.originalEvent.target)) {
//         setMarkers([...markers, e.latlng]);
//       }
//     },
//   });

//   useEffect(() => {
//     // convert query to coordinates
//     const endpoint = `https://api.opencagedata.com/geocode/v1/json?key=${apiKey}&q=${encodeURIComponent(query)}&limit=5`;

//     const delayDebounceFn = setTimeout(() => {
//       if (query) {
//         setLoading(true);
//         fetch(endpoint)
//           .then(response => response.json())
//           .then(data => {
//             // Extract the coordinates from the API response
//             const coordinates = data.results[0].geometry;
//             setResults(data.results)
            
//             // Add the coordinates to the markers state
//             setMarkers([...markers, coordinates]);
//           })
//           .catch(error => {
//             console.error(error);
//           })
//           .finally(() => {
//             setLoading(false);
//           });
//         } else {
//           setResults([])
//         }
//     }, 1000);

//     return () => clearTimeout(delayDebounceFn);
//   }, [query]);

//   const handleResultClick = (result) => {
//     setQuery('');
//     const coordinates = result.geometry;
    
//     // Move the map to the clicked result
//     map.flyTo(coordinates, 15);
    
//     // Add a marker to the clicked result
//   }  
  
//   return (
//     <div className='searchbar cursor-default absolute z-[9999] w-full h-fit max-w-[620px] top-3 right-0 left-0 mx-auto mb-4'>
//       <div className="searchbar relative">
//         <RiSearch2Line size={22} className="searchbar absolute text-black top-[15px] left-3"/>
//         <div className="searchbar cursor-pointer absolute text-black top-[15px] right-3">
//           {query && <FiX size={22} className="searchbar" onClick={() => setQuery('')}/>}
//         </div>
//         <input
//           type="text"
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//           className="searchbar w-full py-4 px-11 rounded-lg text-[16px] placeholder:text-[16px] placeholder:text-black"
//           placeholder='Search a location'
//         />
//       </div>
//       <div className="searchbar flex flex-col gap-4 bg-white mt-2 rounded-lg">
//       {!loading ? (
//         results.map((result, index) => (
//           <div className='searchbar text-black px-8 py-4 cursor-pointer hover:bg-pink-100 transition-colors' key={index} onClick={() => handleResultClick(result)}>
//             <p className='searchbar'>{result?.formatted}</p>
//           </div>
//         ))
//       ) : (
//         <div className='searchbar text-black px-8 py-4 cursor-pointer hover:bg-pink-100 transition-colors flex items-center justify-center'>
//           <PulseLoader className='searchbar' color="#f35fc7" size={10}/>
//         </div>
//       )}
//       </div>
//     </div>
//   );
// }