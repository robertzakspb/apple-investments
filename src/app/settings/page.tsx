"use client";

import { useState } from "react";

type HealthState = "idle" | "checking" | "healthy" | "unavailable";

const backendUrl = (process.env.NEXT_PUBLIC_BACKEND_URL || "http://127.0.0.1:8000").replace(/\/$/, "");

export default function SettingsPage() {
  const [health, setHealth] = useState<HealthState>("idle");

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

  const message: Record<HealthState, string> = {
    idle: "Not checked yet",
    checking: "Checking backend…",
    healthy: "Backend is responsive",
    unavailable: "Backend is not responding",
  };

  return (
    <section className="page-heading settings-page" aria-labelledby="page-title">
      <p className="eyebrow">APPLICATION</p>
      <h1 id="page-title">Settings</h1>
      <p className="page-description">Check the connection to the Apple Investments backend.</p>

      <div className="settings-card" aria-labelledby="health-title">
        <div>
          <p className="eyebrow">SYSTEM STATUS</p>
          <h2 id="health-title">Backend health</h2>
          <p className="health-status" aria-live="polite" role="status">
            <span className={`health-indicator health-${health}`} aria-hidden="true" />
            {message[health]}
          </p>
        </div>
        <button className="health-button" onClick={checkBackend} disabled={health === "checking"}>
          {health === "checking" ? "Checking…" : "Check backend"}
        </button>
      </div>
    </section>
  );
}
