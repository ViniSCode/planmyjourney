import { motion } from "framer-motion";
import { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { FiMoon, FiSun, FiX } from "react-icons/fi";
import { Logo } from "./Logo";
import { MobileLogo } from "./MobileLogo";
interface HeaderProps {
  session: Session;
}

export function Header({ session }: HeaderProps) {
  const { theme, setTheme } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { duration: 0.6, delay: 0.2 },
      }}
    >
      <nav className="select-none max-w-[1120px] lg:pt-0 pt-2 mx-auto fixed inset-0 z-50 px-9 lg:px-6 w-full h-[5rem] shadow-lg md:bg-none bg-navbar-blue-dark md:shadow-none md:relative">
        <div className="text-center pt-4 flex justify-center gap-8 md:gap-0 lg:gap-8 lg:justify-between items-center w-full mx-auto relative">
          <span className="lg:hidden"></span>
          <span className="block md:hidden lg:hidden">
            <MobileLogo />
          </span>
          <span className="hidden md:hidden lg:block">
            <Logo />
          </span>
          <ul className="flex gap-10 items-center text-sm">
            <li className="dark:text-white dark:hover:text-blue-500 hidden md:block transition-colors hover:text-blue-500 cursor-pointer text-shadow">
              <Link href="/">Services</Link>
            </li>
            <li className="dark:text-white dark:hover:text-blue-500 hidden md:block transition-colors hover:text-blue-500 cursor-pointer text-shadow">
              <Link href="/plans">All Plans</Link>
            </li>
            <li className="dark:text-white dark:hover:text-blue-500 hidden md:block transition-colors hover:text-blue-500 cursor-pointer text-shadow">
              <Link href="/">Popular Plans</Link>
            </li>
            <li className="dark:text-white dark:hover:text-blue-500 hidden md:block transition-colors hover:text-blue-500 cursor-pointer text-shadow">
              <Link href="/share">Share Plan</Link>
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
            {session?.user?.image ? (
              <li
                className="hidden md:block transition-colors hover:text-yellow-500 cursor-pointer"
                onClick={() => signOut()}
              >
                <div className="flex items-center gap-2 text-white relative button-blue-bg py-2 px-4 rounded-full">
                  <span className="max-w-[100px] truncate">
                    {session.user && session.user?.name}
                  </span>
                  <FiX size={15} />
                </div>
              </li>
            ) : (
              <li
                onClick={() => signIn("google")}
                className="hidden md:block transition-colors hover:text-yellow-500 cursor-pointer"
              >
                <button className="bg-blue-500 px-8 py-2 rounded text-sm text-white hover:brightness-90 transition-[filter]">
                  Login
                </button>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </motion.div>
  );
}
