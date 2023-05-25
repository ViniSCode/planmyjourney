import { ReactNode, createContext, useState } from "react";

export type Transportation = {
  car: boolean;
  bus: boolean;
  subway: boolean;
  walking: boolean;
};

export type Expenses = {
  min: number;
  max: number;
};

interface SharePlanContextProviderProps {
  children: ReactNode;
}

interface SharePlanContextData {
  days: number;
  transportation: Transportation;
  expenses: Expenses;
  handleIncreaseDays: () => void;
  handleDecreaseDays: () => void;
  handleSetWalking: () => void;
  handleSetSubway: () => void;
  handleSetCar: () => void;
  handleSetBus: () => void;
  setDays: any;
  setExpenses: any;
  selectedImages: any;
  setSelectedImages: any;
  setImagesURL: any;
  imagesURL: any;
}

export const SharePlanContext = createContext<SharePlanContextData>(
  {} as SharePlanContextData
);

export function SharePlanContextProvider({
  children,
}: SharePlanContextProviderProps) {
  const [imagesURL, setImagesURL] = useState<string[]>();
  const [days, setDays] = useState(0);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [transportation, setTransportation] = useState({
    car: false,
    bus: false,
    subway: false,
    walking: false,
  });

  const [expenses, setExpenses] = useState({
    min: 0,
    max: 0,
  });

  function handleSetCar() {
    setTransportation({
      ...transportation,
      car: !transportation.car,
    });
  }

  function handleSetBus() {
    setTransportation({
      ...transportation,
      bus: !transportation.bus,
    });
  }

  function handleSetSubway() {
    setTransportation({
      ...transportation,
      subway: !transportation.subway,
    });
  }

  function handleSetWalking() {
    setTransportation({
      ...transportation,
      walking: !transportation.walking,
    });
  }
  function handleIncreaseDays() {
    //validate days
    if (Number(days) + 1 > 999) {
      return;
    }
    setDays(Number(days) + 1);
  }

  function handleDecreaseDays() {
    // validate days
    if (Number(days) - 1 < 1) {
      return;
    }

    setDays(Number(days) - 1);
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
        transportation,
        selectedImages,
        setSelectedImages,
        setImagesURL,
        imagesURL,
      }}
    >
      {children}
    </SharePlanContext.Provider>
  );
}
