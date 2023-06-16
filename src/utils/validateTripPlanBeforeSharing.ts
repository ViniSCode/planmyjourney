import { Marker } from "@/context/MapContext";
import { Expenses, Transportation } from "@/context/SharePlanContext";
import { TripPlanDataProps } from "@/pages/share/location";
import { Session } from "next-auth";

export interface ValidationResponse {
  error: boolean;
  message: string;
}
export type tripPlanDataProps = {
  location: Marker[];
  days: number;
  expenses: Expenses;
  transportation: Transportation;
  name: string;
};

export interface ValidateTripPlanBeforeSharingProps {
  session: Session;
  tripPlanData: tripPlanDataProps;
}

export function validateTripPlanBeforeSharing(
  session: Session,
  tripPlanData: TripPlanDataProps
): ValidationResponse {
  let message = "";
  let error = false;

  // check if "transportation" is defined
  const isTransportationDefined = Object.values(
    tripPlanData.transportation
  ).some((value) => value === true);

  // check if user is logged in
  if (!session) {
    message = "User not logged in";
    error = true;
  }
  if (!isTransportationDefined) {
    message = "Please select transportation options";
    error = true;
  }
  // check if "days" is defined
  if (!tripPlanData.days) {
    message = "Please provide the number of days";
    error = true;
  }
  // check if "expenses" is defined
  if (!tripPlanData.expenses.min || !tripPlanData.expenses.max) {
    message = "Please provide valid expense details";
    error = true;
  }
  // check if "location" is defined
  if (tripPlanData.location.length < 2) {
    message = "Please select at least two locations";
    error = true;
  }

  if (tripPlanData.name.trim() === "") {
    message = "Please provide a name for your trip plan.";
    error = true;
  }

  return {
    error,
    message,
  };
}
