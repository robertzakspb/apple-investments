export type ThemePreference = "system" | "light" | "dark";

export const themeStorageKey = "theme";

// Runs before first paint (see layout.tsx) so a saved theme never flashes the system one.
export const themeBootScript = `(function(){try{var t=localStorage.getItem("${themeStorageKey}");if(t==="light"||t==="dark")document.documentElement.setAttribute("data-theme",t)}catch(e){}})()`;

const changeEvent = "themechange";

export function readThemePreference(): ThemePreference {
  try {
    const stored = localStorage.getItem(themeStorageKey);
    return stored === "light" || stored === "dark" ? stored : "system";
  } catch {
    return "system";
  }
}

export function applyThemePreference(preference: ThemePreference) {
  try {
    if (preference === "system") localStorage.removeItem(themeStorageKey);
    else localStorage.setItem(themeStorageKey, preference);
  } catch {
    // Storage can be unavailable (private mode); the choice still applies to this page view.
  }

  setThemeAttribute(preference);
  window.dispatchEvent(new Event(changeEvent));
}

function setThemeAttribute(preference: ThemePreference) {
  if (preference === "system") document.documentElement.removeAttribute("data-theme");
  else document.documentElement.setAttribute("data-theme", preference);
}

export function subscribeThemePreference(onChange: () => void) {
  // Another tab changed the preference: apply it here too.
  const onStorage = () => {
    setThemeAttribute(readThemePreference());
    onChange();
  };
  window.addEventListener(changeEvent, onChange);
  window.addEventListener("storage", onStorage);
  return () => {
    window.removeEventListener(changeEvent, onChange);
    window.removeEventListener("storage", onStorage);
  };
}
