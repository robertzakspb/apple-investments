"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { appPages } from "@/lib/pages";

export function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [openedAt, setOpenedAt] = useState(pathname);
  const menuButton = useRef<HTMLButtonElement>(null);

  // Close the mobile drawer whenever the route changes.
  if (open && openedAt !== pathname) setOpen(false);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      menuButton.current?.focus();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  function toggle() {
    setOpenedAt(pathname);
    setOpen((value) => !value);
  }

  return (
    <>
      <div className="mobile-bar">
        <button
          aria-controls="sidebar"
          aria-expanded={open}
          aria-label={open ? "Close navigation" : "Open navigation"}
          className="menu-button"
          onClick={toggle}
          ref={menuButton}
          type="button"
        >
          <svg aria-hidden="true" viewBox="0 0 24 24">
            <path d={open ? "M6 6l12 12M18 6 6 18" : "M4 7h16M4 12h16M4 17h16"} />
          </svg>
        </button>
      </div>

      <aside className={`sidebar${open ? " sidebar-open" : ""}`} id="sidebar">
        <nav aria-label="Primary navigation">
          <ul className="nav-list">
            {appPages.map(({ label, href, icon }) => {
              const isCurrent = pathname === href;

              return (
                <li key={href}>
                  <Link
                    aria-current={isCurrent ? "page" : undefined}
                    className="nav-link"
                    href={href}
                    onClick={() => setOpen(false)}
                  >
                    <svg aria-hidden="true" className="nav-icon" viewBox="0 0 24 24">
                      <path d={icon} />
                    </svg>
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>

      {open && <div aria-hidden="true" className="sidebar-scrim" onClick={() => setOpen(false)} />}
    </>
  );
}
