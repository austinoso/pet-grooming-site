/**
 * Navigation Configuration
 * ────────────────────────
 * Central definition for all navigation menus (header, footer, mobile).
 */

export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}

export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Gallery", href: "/gallery" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

export const footerNav: NavItem[] = [
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Gallery", href: "/gallery" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
  { label: "Policies", href: "/policies" },
];

export const ctaLink: NavItem = {
  label: "Book Now",
  href: "/booking",
};
