import { categoryEntries, getCategoryHref } from "@/config/categories";

import type { CategoryKey } from "@/config/categories";
import type { SidebarIconName } from "@/config/icons";

export type { CategoryKey } from "@/config/categories";

export type NavigationIcon = SidebarIconName;

export type NavigationChild = {
  label: string;
  href: string;
};

export type NavigationItem = {
  label: string;
  href?: string;
  icon: NavigationIcon;
  category?: CategoryKey;
  children?: NavigationChild[];
};

export const libraryNavigation: NavigationItem[] = categoryEntries.map(
  ([category, config]) => ({
    label: config.label,
    href: getCategoryHref(category),
    icon: config.icon,
    category,
  }),
);

export const utilityNavigation: NavigationItem[] = [
  {
    label: "Favoritos",
    href: "/favoritos",
    icon: "star",
  },
  {
    label: "Ajustes",
    href: "/ajustes",
    icon: "settings",
  },
];

export function getCategoryNavigation(category: CategoryKey) {
  return libraryNavigation.find((item) => item.category === category);
}
