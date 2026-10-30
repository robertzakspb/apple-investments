import { expect, test } from "@playwright/test";

const destinations = [
  { label: "Home", path: "/" },
  { label: "Clients", path: "/clients/" },
  { label: "Positions", path: "/positions/" },
  { label: "Security Master", path: "/security-master/" },
  { label: "Settings", path: "/settings/" },
];

test("left sidebar opens each page and marks it current", async ({ page }) => {
  await page.goto("/");

  const nav = page.getByRole("navigation", { name: "Primary navigation" });
  const box = await page.getByRole("complementary").boundingBox();
  // Docked on the left edge as a tall column.
  expect(box && box.x < 40 && box.height > box.width).toBe(true);
  await expect(nav.getByRole("link")).toHaveText(destinations.map(({ label }) => label));

  for (const destination of destinations) {
    const link = nav.getByRole("link", { name: destination.label, exact: true });

    await link.click();

    await expect(page).toHaveURL(destination.path);
    await expect(page.getByRole("heading", { level: 1, name: destination.label })).toBeVisible();
    await expect(link).toHaveAttribute("aria-current", "page");
  }
});

test("mobile sidebar is a drawer behind a menu button", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  const nav = page.getByRole("navigation", { name: "Primary navigation" });
  await expect(nav).not.toBeInViewport();

  await page.getByRole("button", { name: "Open navigation" }).click();
  await expect(nav).toBeInViewport();

  await nav.getByRole("link", { name: "Positions" }).click();
  await expect(page).toHaveURL("/positions/");
  await expect(nav).not.toBeInViewport();
});

test("settings checks backend health and reports the result", async ({ page }) => {
  await page.route("http://127.0.0.1:8000/health", async (route) => {
    await route.fulfill({ status: 200, json: { status: "ok" } });
  });

  await page.goto("/settings/");
  await page.getByRole("button", { name: "Check backend" }).click();

  await expect(page.getByRole("status")).toHaveText("Backend is responsive");
});

test("settings appearance overrides the system theme and persists", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "light" });
  await page.goto("/settings/");

  await expect(page.getByRole("radio", { name: "System" })).toHaveAttribute("aria-checked", "true");
  await page.getByRole("radio", { name: "Dark" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");

  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await expect(page.getByRole("radio", { name: "Dark" })).toHaveAttribute("aria-checked", "true");

  await page.getByRole("radio", { name: "System" }).click();
  await expect(page.locator("html")).not.toHaveAttribute("data-theme", /.*/);
});

test("unknown pages are not found", async ({ page }) => {
  for (const path of ["/accounts/", "/orders/", "/securities/"]) {
    const response = await page.goto(path);
    expect(response?.status()).toBe(404);
  }
});
