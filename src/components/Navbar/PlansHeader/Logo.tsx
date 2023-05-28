import Link from "next/link";

export function Logo({ dark }: any) {
  return (
    <Link href="/">
      <h1
        className={`text-xl font-semibold cursor-pointer ${
          dark ? "text-gray-900" : "text-white"
        }`}
      >
        PlanMyJourney
      </h1>
    </Link>
  );
}
