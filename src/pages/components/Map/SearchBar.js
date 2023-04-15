// SearchBar.js
import React, { useState } from 'react';
import { useMapEvents } from 'react-leaflet';

export function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');

  const map = useMapEvents({
    click(e) {
      onSearch(e.latlng);
    },
  });

  const search = (e) => {
    e.preventDefault();
    // Use a geocoding service to convert query to coordinates
    const endpoint = `https://api.opencagedata.com/geocode/v1/json?key=e7c274d7254e4d22a66cd941de94b910&q=${encodeURIComponent(query)}`;
    fetch(endpoint)
      .then(response => response.json())
      .then(data => {
        // Extract the coordinates from the API response
        const coordinates = data.results[0].geometry;
        // Call the onSearch callback with the coordinates
        onSearch(coordinates);
      })
      .catch(error => {
        console.error(error);
      });
    setQuery('');
  };
  
  return (
    <div className="absolute z-[100]">
      <form onSubmit={search}>
        <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} />
        <button type="submit">Search</button>
      </form>
    </div>
  );
}