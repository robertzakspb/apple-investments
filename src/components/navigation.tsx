"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const pages = [
  { label: "Home", href: "/" },
  { label: "Accounts", href: "/accounts" },
  { label: "Positions", href: "/positions" },
  { label: "Orders", href: "/orders" },
  { label: "Securities", href: "/securities" },
  { label: "Settings", href: "/settings" },
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="primary-nav" aria-label="Primary navigation">
      {pages.map(({ label, href }) => {
        const isCurrent = pathname === href;

        return (
          <Link
            aria-current={isCurrent ? "page" : undefined}
            className={`nav-link${isCurrent ? " nav-link-current" : ""}`}
            href={href}
            key={href}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
