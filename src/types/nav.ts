export type NavItem = {
  label: string;
  href: string;
  badge?: string;
  highlight?: boolean;
};

export type NavConfig = {
  logo: string;
  links: NavItem[];
};