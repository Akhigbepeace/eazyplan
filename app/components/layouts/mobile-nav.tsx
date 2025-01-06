import Link from "next/link";
import Image from "next/image";
import { AiFillHome } from "react-icons/ai";
import { GoGoal } from "react-icons/go";
import { MdOutlineTaskAlt } from "react-icons/md";
import { IoSettingsSharp } from "react-icons/io5";

const MobileNav = () => {
  return (
    <nav className="fixed bottom-0 w-full bg-white border-t shadow-lg">
      <div className="flex items-center justify-evenly gap-5 px-4 sm:px-8 py-3">
        <div className="flex justify-evenly w-full space-x-6">
          <Link
            href="/dashboard"
            className="flex flex-col items-center gap-1 text-primary"
          >
            <AiFillHome size={25} color="#131C25" />
            <span>Dashboard</span>
          </Link>

          <Link
            href="/goals"
            className="flex flex-col items-center gap-1 text-primary"
          >
            <GoGoal size={25} color="#131C25" />
            <span>Goals</span>
          </Link>
        </div>

        <div className="flex-shrink-0 bg-primary p-3 rounded-full ">
          <Image
            src="/assets/images/calendar-logo.png"
            alt="App Logo"
            width={40}
            height={40}
          />
        </div>

        <div className="flex justify-evenly w-full space-x-6">
          <Link
            href="/tasks"
            className="flex flex-col items-center gap-1 text-primary"
          >
            <MdOutlineTaskAlt size={25} color="#131C25" />
            <span>Tasks</span>
          </Link>

          <Link
            href="/settings"
            className="flex flex-col items-center gap-1 text-primary"
          >
            <IoSettingsSharp size={25} color="#131C25" />
            <span>Settings</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default MobileNav;
