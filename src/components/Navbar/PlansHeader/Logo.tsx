import Link from "next/link";

export function Logo() {
  return (
    <Link href="/">
      <h1
        className={`text-xl font-semibold cursor-pointer dark:text-white text-black`}
      >
        PlanMyJourney
      </h1>
    </Link>
  );
}
