export type AppPage = {
  label: string;
  href: string;
  description: string;
  icon: string;
};

// One entry per sidebar destination; `icon` is the path data of a 24px line icon.
export const appPages: AppPage[] = [
  {
    label: "Home",
    href: "/",
    description: "Firm-wide overview of clients, assets and activity.",
    icon: "M3 10.5 12 3l9 7.5M5 9v11h5v-6h4v6h5V9",
  },
  {
    label: "Clients",
    href: "/clients/",
    description: "Client households, accounts and relationship details.",
    icon: "M16 20v-1.5a3.5 3.5 0 0 0-3.5-3.5h-5A3.5 3.5 0 0 0 4 18.5V20M10 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm10 9v-1.5a3.5 3.5 0 0 0-2.5-3.35M15 4.15a3.5 3.5 0 0 1 0 6.7",
  },
  {
    label: "Positions",
    href: "/positions/",
    description: "Holdings across client accounts, with quantities and market values.",
    icon: "M4 20V10m6 10V4m6 16v-7m4 7H2",
  },
  {
    label: "Security Master",
    href: "/security-master/",
    description: "Reference data for every security the firm holds or trades.",
    icon: "M4 6c0-1.66 3.58-3 8-3s8 1.34 8 3-3.58 3-8 3-8-1.34-8-3Zm0 0v12c0 1.66 3.58 3 8 3s8-1.34 8-3V6M4 12c0 1.66 3.58 3 8 3s8-1.34 8-3",
  },
  {
    label: "Settings",
    href: "/settings/",
    description: "Appearance preferences and system status.",
    icon: "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm7.4-3a7.4 7.4 0 0 0-.1-1.2l2-1.6-2-3.4-2.4 1a7.5 7.5 0 0 0-2-1.2L14.5 3h-5l-.4 2.6a7.5 7.5 0 0 0-2 1.2l-2.4-1-2 3.4 2 1.6a7.4 7.4 0 0 0 0 2.4l-2 1.6 2 3.4 2.4-1a7.5 7.5 0 0 0 2 1.2l.4 2.6h5l.4-2.6a7.5 7.5 0 0 0 2-1.2l2.4 1 2-3.4-2-1.6c.07-.4.1-.8.1-1.2Z",
  },
];

export function getPage(href: string): AppPage {
  const page = appPages.find((candidate) => candidate.href === href);
  if (!page) throw new Error(`Unknown page: ${href}`);
  return page;
}
