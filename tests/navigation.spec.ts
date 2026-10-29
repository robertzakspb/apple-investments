import { expect, test } from "@playwright/test";

test("navigation opens each portfolio page and marks it current", async ({ page }) => {
  const destinations = [
    { label: "Home", path: "/" },
    { label: "Accounts", path: "/accounts" },
    { label: "Positions", path: "/positions" },
    { label: "Orders", path: "/orders" },
    { label: "Securities", path: "/securities" },
  ];

  await page.goto("/");

  for (const destination of destinations) {
    const link = page.getByRole("navigation", { name: "Primary navigation" }).getByRole("link", {
      name: destination.label,
      exact: true,
    });

    await link.click();

    await expect(page).toHaveURL(destination.path);
    await expect(page.getByRole("heading", { level: 1, name: destination.label })).toBeVisible();
    await expect(link).toHaveAttribute("aria-current", "page");
  }
});
