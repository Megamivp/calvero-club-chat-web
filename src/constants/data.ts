import { TwitterIcon } from "@/components/ui/react/icons";
import { InstagramIcon } from "lucide-react";

export const communities = [
  {
    name: "Twitter",
    description: "Follow us for updates, insights, and news",
    icon: TwitterIcon,
    href: "#",
  },
  {
    name: "Instagram",
    description: "See our latest posts, stories, and behind-the-scenes moments",
    icon: InstagramIcon,
    href: "#",
  },
];

export const fastNavigations = [
  { label: "Home", path: "/" },
  { label: "Login", path: "/welcome" },
  { label: "Register", path: "/join" },
  { label: "Help", path: "/help" },
];
