"use client";

import { useState, useSyncExternalStore } from "react";
import { PageHeader } from "@/components/page-header";
import { getPage } from "@/lib/pages";
import {
  applyThemePreference,
  readThemePreference,
  subscribeThemePreference,
  type ThemePreference,
} from "@/lib/theme";

type HealthState = "idle" | "checking" | "healthy" | "unavailable";

const backendUrl = (process.env.NEXT_PUBLIC_BACKEND_URL || "http://127.0.0.1:8000").replace(/\/$/, "");

const healthMessage: Record<HealthState, string> = {
  idle: "Not checked yet",
  checking: "Checking backend…",
  healthy: "Backend is responsive",
  unavailable: "Backend is not responding",
};

const themeOptions: { value: ThemePreference; label: string }[] = [
  { value: "system", label: "System" },
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
];

export default function SettingsPage() {
  const [health, setHealth] = useState<HealthState>("idle");
  const theme = useSyncExternalStore(subscribeThemePreference, readThemePreference, () => "system");

  async function checkBackend() {
    setHealth("checking");

    try {
      const response = await fetch(`${backendUrl}/health`, {
        cache: "no-store",
        signal: AbortSignal.timeout(5000),
      });
      setHealth(response.ok ? "healthy" : "unavailable");
    } catch {
      setHealth("unavailable");
    }
  }

  return (
    <>
      <PageHeader page={getPage("/settings/")} />

      <section className="panel settings-row" aria-labelledby="appearance-title">
        <div>
          <h2 id="appearance-title">Appearance</h2>
          <p>System follows your device&apos;s light or dark setting.</p>
        </div>
        <div className="segmented" role="radiogroup" aria-labelledby="appearance-title">
          {themeOptions.map(({ value, label }) => (
            <button
              aria-checked={theme === value}
              key={value}
              onClick={() => applyThemePreference(value)}
              role="radio"
              type="button"
            >
              {label}
            </button>
          ))}
        </div>
      </section>

      <section className="panel settings-row" aria-labelledby="health-title">
        <div>
          <h2 id="health-title">Backend health</h2>
          <p className="health-status" aria-live="polite" role="status">
            <span className={`health-indicator health-${health}`} aria-hidden="true" />
            {healthMessage[health]}
          </p>
        </div>
        <button className="button" onClick={checkBackend} disabled={health === "checking"} type="button">
          {health === "checking" ? "Checking…" : "Check backend"}
        </button>
      </section>
    </>
  );
}
