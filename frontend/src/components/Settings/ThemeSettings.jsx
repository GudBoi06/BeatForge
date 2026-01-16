import React from "react";

export default function ThemeSettings() {
  const setTheme = (t) => {
    document.body.setAttribute("data-theme", t);
    // optionally save to server if logged in
  };

  return (
    <div className="theme-card">
      <h3>Theme</h3>
      <button onClick={() => setTheme("dusky")}>Dusky</button>
      <button onClick={() => setTheme("light")}>Light</button>
    </div>
  );
}
