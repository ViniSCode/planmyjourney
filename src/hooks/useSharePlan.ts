import { SharePlanContext } from "@/context/SharePlanContext";
import { useContext } from "react";

export function useSharePlan() {
  const {
    handleSetBus,
    handleSetSubway,
    handleSetWalking,
    handleSetCar,
    days,
    handleIncreaseDays,
    handleDecreaseDays,
    expenses,
    setExpenses,
    setDays,
    transportation,
    selectedImages,
    setSelectedImages,
    setImagesURL,
    imagesURL,
    name,
    setName,
  } = useContext(SharePlanContext);

  return {
    handleSetBus,
    handleSetSubway,
    handleSetWalking,
    handleSetCar,
    days,
    name,
    setName,
    handleIncreaseDays,
    handleDecreaseDays,
    expenses,
    setDays,
    setExpenses,
    transportation,
    selectedImages,
    setSelectedImages,
    setImagesURL,
    imagesURL,
  };
}
