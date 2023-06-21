import { Marker } from "@/context/MapContext";

export function getDifferentLocationString(markers: Marker[]): string {
  let result = "";

  markers.forEach((marker) => {
    const { country, country_code, formatted, state, state_code } = marker;
    const existingCountries = result
      .split(", ")
      .filter((str) => str.includes(country));

    if (existingCountries.length === 0) {
      result += `${country}, ${country_code}, ${formatted}, ${state}, ${state_code}, `;
    } else {
      const existingStates = result
        .split(", ")
        .filter((str) => str.includes(state));

      if (existingStates.length === 0) {
        result += `${state}, ${state_code}, `;
      }
    }
  });

  // Remove the trailing comma and space
  result = result.slice(0, -2);

  return result;
}
