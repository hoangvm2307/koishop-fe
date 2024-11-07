import { LayoutGrid, LucideIcon, Package, ShoppingCart, Users } from "lucide-react";

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

export function getMenuList(pathname: string, roles: string[]): Group[] {
  const menuList: Group[] = [
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
          href: "/admin/orders",
          label: "Orders",
          icon: ShoppingCart,
        },
        {
          href: "/admin/consignments",
          label: "Consignments",
          icon: Package,
        },
      ],
    },
    {
      groupLabel: "Accounts",
      menus: [
        {
          href: "/admin/users",
          label: "Users",
          icon: Users,
        },
        {
          href: "/admin/staffs",
          label: "Staffs",
          icon: Users,
        },
      ],
    },
  ];

  // Loại bỏ nhóm "Accounts" nếu role là "Staff"
  if (roles.includes("Staff")) {
    return menuList.filter((group) => group.groupLabel !== "Accounts");
  }

  return menuList;
}
