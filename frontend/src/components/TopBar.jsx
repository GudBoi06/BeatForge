import React from "react";
import "../styles/topbar.css";

export default function TopBar() {
  return (
    <div className="topbar">
      <h3>Welcome to BeatForge</h3>

      <div className="right">
        <button className="save-btn">Save</button>
      </div>
    </div>
  );
}
