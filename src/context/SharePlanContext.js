import { createContext, useState } from "react";

export const SharePlanContext = createContext({});

export function SharePlanContextProvider ({children}) {
  const [days, setDays] = useState(1);

  const [transportation, setTransportation] = useState({
    car: false,
    bus: false,
    subway: false,
    walking: false,
  });

  const [expenses, setExpenses] = useState({
    min: 800,
    max: 1500
  });

  function handleSetCar () {
    setTransportation({
      ...transportation,
      car: !transportation.car,
    });
  }

  function handleSetBus () {
    setTransportation({
      ...transportation,
      bus: !transportation.bus,
    });
  }

  function handleSetSubway () {
    setTransportation({
      ...transportation,
      subway: !transportation.subway,
    });
  }

  function handleSetWalking () {
    setTransportation({
      ...transportation,
      walking: !transportation.walking,
    });
  }
  function handleIncreaseDays () {
    //validate days
    if (days + 1 > 999) {
      return;
    }
    setDays(days + 1);
  }

  function handleDecreaseDays () {
    // validate days
    if (days - 1 < 1) {
      return;
    }

    setDays(days - 1);
  }

  return (
    <SharePlanContext.Provider 
      value={{
        handleSetBus, 
        handleSetSubway, 
        handleSetWalking, 
        handleSetCar, 
        days, 
        setDays, 
        expenses, 
        setExpenses,
        handleIncreaseDays, 
        handleDecreaseDays,
        transportation
      }}
    >
      {children}
    </SharePlanContext.Provider>
  )
}