import { AnimatePresence, motion, useCycle } from "framer-motion";
import { useSession } from "next-auth/react";
import {
  AiOutlineEnvironment,
  AiOutlineGlobal,
  AiOutlineLogin,
  AiOutlineStar,
} from "react-icons/ai";
import { FiSun } from "react-icons/fi";
import { HiMenuAlt3 } from "react-icons/hi";
import { RiMapPinAddLine } from "react-icons/ri";
import { SidebarItems } from "./SidebarItems";

const itemVariants = {
  closed: { opacity: 0 },
  open: { opacity: 1 },
};

const sideVariants = {
  closed: {
    transition: {
      opacity: 0,
      staggerDirection: -1,
    },
  },
  open: {
    transition: {
      staggerChildren: 0.1,
      staggerDirection: 1,
    },
  },
};

const aside = {
  open: {
    width: 250,
    opacity: 1,
  },
  closed: {
    width: "0",
    opacity: 0,
  },
};

export function MobileMenu() {
  const [open, cycleOpen] = useCycle(false, true);
  const { data: session } = useSession();

  const menuItems = [
    {
      icon: <FiSun size={22} />,
      href: "/",
      name: "Theme",
    },
    { icon: <AiOutlineGlobal size={22} />, href: "/", name: "Services" },
    {
      icon: <AiOutlineEnvironment size={23} />,
      href: "/plans",
      name: "All Plans",
    },
    {
      icon: <AiOutlineStar size={23} />,
      href: "/",
      name: "Popular Plans",
    },
    {
      icon: <RiMapPinAddLine size={22} />,
      href: "/share",
      name: "Share Plan",
    },
    {
      icon: <AiOutlineLogin size={22} />,
      href: "/login",
      name: "Login",
      isLoggedIn: session,
    },
  ];

  return (
    <div className="md:hidden select-none">
      <HiMenuAlt3
        size={26}
        className="text-white cursor-pointer ml-4 fixed top-6 left-0 right-0 bottom-0 z-[100] lg:hidden"
        onClick={() => cycleOpen()}
      />
      <div
        onClick={() => cycleOpen()}
        className={`${
          open
            ? "fixed z-[90] w-[100vw] h-[100vh] inset-0 closeModalBackground"
            : ""
        }`}
      >
        <AnimatePresence>
          (
          <motion.aside
            animate={open ? "open" : "closed"}
            variants={aside}
            transition={{ duration: 0.2 }}
            className="flex flex-col bg-navbar-blue-dark  py-36 h-[100%] w-0 fixed top-0 left-0 right-0 bottom-0 z-50 shadow-lg overflow-x-hidden"
          >
            <motion.div
              animate={open ? "open" : "closed"}
              exit="closed"
              variants={sideVariants}
              className="container flex flex-col gap-10"
            >
              {menuItems.map((navItem) => (
                <SidebarItems
                  href={navItem.href}
                  icon={navItem.icon}
                  name={navItem.name}
                  key={navItem.name}
                  isLoggedIn={session}
                />
              ))}
            </motion.div>
          </motion.aside>
          )
        </AnimatePresence>
      </div>
    </div>
  );
}
