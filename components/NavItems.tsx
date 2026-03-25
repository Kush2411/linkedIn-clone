import {
  Bell,
  BriefcaseBusiness,
  Home,
  MessageCircleMore,
  Users,
} from "lucide-react";
import Link from "next/link";
import { JSX } from "react/jsx-runtime";

interface NAVITEMS {
  src: string;
  icon: JSX.Element;
  text: string;
}

const navItems: NAVITEMS[] = [
  {
    src: "/",
    icon: <Home />,
    text: "Home",
  },
  {
    src: "/networks",
    icon: <Users />,
    text: "My Network",
  },
  {
    src: "/job",
    icon: <BriefcaseBusiness />,
    text: "Jobs",
  },
  {
    src: "/message",
    icon: <MessageCircleMore />,
    text: "Messaging",
  },
  {
    src: "/notification",
    icon: <Bell />,
    text: "Notification",
  },
];
export const NavItems = () => {
  return (
    <div className="flex gap-8">
      {navItems.map((navItems, index) => {
        return (
          <div
            key={index}
            className="flex items-center flex-col cursor-pointer text-[#666666] hover:text-black"
          >
            <span>{navItems.icon}</span>
            <Link className="text-xs" href={navItems.src}>
              {navItems.text}
            </Link>
          </div>
        );
      })}
    </div>
  );
};
