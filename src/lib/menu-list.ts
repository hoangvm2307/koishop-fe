import {
  LayoutGrid,
  LucideIcon,
  Package,
  ShoppingCart,
  Users
} from "lucide-react";

type Submenu = {
  href: string;
  label: string;
  active?: boolean;
};

type Menu = {
  href: string;
  label: string;
  active?: boolean;
  icon: LucideIcon;
  submenus?: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/admin/dashboard",
          label: "Dashboard",
          icon: LayoutGrid,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "Management",
      menus: [
        {
          href: "/admin/order",
          label: "Orders",
          icon: ShoppingCart,
        },
        {
          href: "/admin/consignment",
          label: "Consignments",
          icon: Package,
        },
      ],
    },
    {
      groupLabel: "Accounts",
      menus: [
        {
          href: "/admin/account",
          label: "Users",
          icon: Users,
        },
        // {
        //   href: "/account",
        //   label: "Account",
        //   icon: Settings,
        // },
      ],
    },
  ];
}