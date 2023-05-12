// import { Marker } from "@/context/MapContext";
// import { Expenses, Transportation } from "@/context/SharePlanContext";
// import { Session } from "next-auth";
// import { useState } from "react";

export interface ValidationResponse {
  //   error: boolean;
  //   message: string;
  // }
  // export type tripPlanDataProps = {
  //   location: Marker[];
  //   days: number;
  //   expenses: Expenses;
  //   transportation: Transportation;
  // };
  // export interface ValidateTripPlanBeforeSharingProps {
  //   session: Session;
  //   tripPlanData: tripPlanDataProps;
  // }
  // export function validateTripPlanBeforeSharing({
  //   session,
  //   tripPlanData,
  // }: ValidateTripPlanBeforeSharingProps): ValidationResponse {
  //   const [message, setMessage] = useState("");
  //   const [error, setError] = useState(false);
  //   // check if "transportation" is defined
  //   const isTransportationDefined = Object.values(
  //     tripPlanData.transportation
  //   ).some((value) => value === true);
  //   // check if user is logged in
  //   if (!session) {
  //     setMessage("User not logged in");
  //     setError(true);
  //   }
  //   if (!isTransportationDefined) {
  //     setMessage("Please select transportation options");
  //     setError(true);
  //   }
  //   // check if "days" is defined
  //   if (!tripPlanData.days) {
  //     setMessage("Please provide the number of days");
  //     setError(true);
  //   }
  //   // check if "expenses" is defined
  //   if (!tripPlanData.expenses.min || !tripPlanData.expenses.max) {
  //     setMessage("Please provide valid expense details");
  //     setError(true);
  //   }
  //   // check if "location" is defined
  //   if (tripPlanData.location.length < 2) {
  //     setMessage("Please select at least two locations");
  //     setError(true);
  //   }
  //   return {
  //     error,
  //     message,
  //   };
}
