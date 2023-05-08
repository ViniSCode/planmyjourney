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
  } = useContext(SharePlanContext);

  return {
    handleSetBus,
    handleSetSubway,
    handleSetWalking,
    handleSetCar,
    days,
    handleIncreaseDays,
    handleDecreaseDays,
    expenses,
    setDays,
    setExpenses,
    transportation,
  };
}
