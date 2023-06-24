import { useTheme } from "next-themes";
import Link from "next/link";
import { FiMoon, FiSun } from "react-icons/fi";

export function MobileLogo() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center justify-between gap-3">
      <Link href="/">
        <h1 className=" xs:text-xl text-white font-semibold cursor-pointer">
          PlanMyJourney
        </h1>
      </Link>
      <div
        className="w-fit cursor-pointer"
        onClick={() => {
          theme == "dark" ? setTheme("light") : setTheme("dark");
        }}
      >
        <FiSun size={20} className="dark:block hidden text-white" />
        <FiMoon size={20} className="dark:hidden block text-white" />
      </div>
    </div>
  );
}
