import { expect, test } from "@playwright/test";

test("navigation opens each portfolio page and marks it current", async ({ page }) => {
  const destinations = [
    { label: "Home", path: "/" },
    { label: "Accounts", path: "/accounts/" },
    { label: "Positions", path: "/positions/" },
    { label: "Orders", path: "/orders/" },
    { label: "Securities", path: "/securities/" },
    { label: "Settings", path: "/settings/" },
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

test("settings checks backend health and reports the result", async ({ page }) => {
  await page.route("http://127.0.0.1:8000/health", async (route) => {
    await route.fulfill({ status: 200, json: { status: "ok" } });
  });

  await page.goto("/settings/");
  await page.getByRole("button", { name: "Check backend" }).click();

  await expect(page.getByRole("status")).toHaveText("Backend is responsive");
});
