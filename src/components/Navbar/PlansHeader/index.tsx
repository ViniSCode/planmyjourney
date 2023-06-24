import { useTheme } from "next-themes";
import Link from "next/link";
import { FiMoon, FiSun } from "react-icons/fi";
import { Logo } from "./Logo";

export function PlansHeader() {
  const { theme, setTheme } = useTheme();
  return (
    <div>
      <nav className="select-none max-w-[1120px] lg:pt-0 pt-2 mx-auto fixed inset-0 z-50 px-9 lg:px-6 w-full h-[5rem] bg-gray-900 shadow-lg md:bg-none bg-navbar-blue-dark md:bg-transparent md:shadow-none md:relative">
        <div className="text-center pt-4 flex justify-center gap-8 md:gap-0 lg:gap-8 lg:justify-between items-center w-full mx-auto relative">
          <span className="lg:hidden"></span>
          <span className="hidden md:hidden lg:block">
            <Logo />
          </span>
          <span className="block md:hidden lg:hidden">
            <Logo />
          </span>
          <ul className="dark:text-white text-black flex gap-10 items-center text-sm">
            <li className="hidden md:block transition-colors hover:text-blue-500 cursor-pointer text-shadow">
              <Link href="/">Home</Link>
            </li>
            <li className="hidden md:block transition-colors hover:text-blue-500 cursor-pointer text-shadow">
              <Link href="/">Popular Plans</Link>
            </li>
            <li className="hidden md:block transition-colors hover:text-blue-500 cursor-pointer text-shadow">
              <Link href="https://www.linkedin.com/in/vinicius-rodrigues-5897831b8/">
                Contact
              </Link>
            </li>
            <li
              className="dark:text-white dark:hover:text-blue-500 hidden md:block transition-colors hover:text-blue-500 cursor-pointer text-shadow"
              onClick={() => {
                theme == "dark" ? setTheme("light") : setTheme("dark");
              }}
            >
              <FiSun size={18} className="dark:block hidden text-white" />
              <FiMoon size={18} className="dark:hidden block text-black" />
            </li>
            <Link href="/share">
              <li className="hidden md:block transition-colors hover:text-yellow-500 cursor-pointer">
                <button className="button-blue-bg px-8 py-2 rounded-full text-sm text-white hover:brightness-90 transition-[filter]">
                  Share Plan
                </button>
              </li>
            </Link>
          </ul>
        </div>
      </nav>
    </div>
  );
}
