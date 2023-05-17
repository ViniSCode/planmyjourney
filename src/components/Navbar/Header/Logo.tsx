import Link from "next/link";

export function Logo() {
  return (
    <Link href="/">
      <h1 className="text-xl text-white font-semibold cursor-pointer">
        PlanMyJourney
      </h1>
    </Link>
  );
}
