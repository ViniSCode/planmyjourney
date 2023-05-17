import { Session } from "next-auth";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { Logo } from "./Logo";

interface HeaderProps {
  session: Session;
}

export function Header({ session }: HeaderProps) {
  return (
    <header>
      <nav className="select-none max-w-[1120px] lg:pt-0 pt-2 mx-auto fixed inset-0 z-50 px-9 lg:px-10 w-full h-[5rem] bg-transparent lg:bg-transparent lg:shadow-none lg:relative">
        <div className="text-center pt-4 flex justify-center gap-8 lg:justify-between items-center w-full mx-auto relative">
          <span className="lg:hidden"></span>
          <span className="block md:hidden lg:block">
            <Logo />
          </span>
          <ul className="flex gap-8 items-center text-sm">
            <li className="text-white hidden md:block transition-colors hover:text-pink-500 cursor-pointer">
              <Link href="/">Services</Link>
            </li>
            <li className="text-white hidden md:block transition-colors hover:text-pink-500 cursor-pointer">
              <Link href="/">Popular Plans</Link>
            </li>
            <li className="text-white hidden md:block transition-colors hover:text-pink-500 cursor-pointer">
              <Link href="/">Create Plan</Link>
            </li>
            <li className="text-white hidden md:block transition-colors hover:text-pink-500 cursor-pointer">
              <Link href="/">Contact</Link>
            </li>
          </ul>
          {session?.user?.image ? (
            <li className="hidden md:block transition-colors hover:text-yellow-500 cursor-pointer">
              <Link href="/profile">
                <div className="rounded-full p-[3px] relative bg-gradient-to-r from-pink-500 to-blue-500">
                  {session.user?.image ? (
                    <img
                      src={session.user!.image!}
                      className="rounded-full h-8 w-8"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    session.user?.name
                  )}
                </div>
              </Link>
            </li>
          ) : (
            <li
              onClick={() => signIn("google")}
              className="hidden md:block transition-colors hover:text-yellow-500 cursor-pointer"
            >
              <button className="bg-pink-500 px-8 py-2 rounded-full text-sm text-white hover:brightness-90 transition-[filter]">
                Login
              </button>
            </li>
          )}
        </div>
      </nav>
    </header>
  );
}
