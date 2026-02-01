type MenuLink = {
  href: string;
  label: string;
};

type Menu = MenuLink[];

export const nav_menu: Menu = [
  { href: "/", label: "home" },
  { label: "about", href: "/#about" },
  { label: "projects", href: "/#projects" },
  { label: "services", href: "/#services" },
  { label: "contact", href: "/#contact" },
];

export const footer_menu: Menu = [...nav_menu];
