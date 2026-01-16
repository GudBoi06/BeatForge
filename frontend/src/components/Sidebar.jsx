import React from "react";
import "../styles/sidebar.css";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <h2 className="logo">BeatForge</h2>

      <div className="menu">
        <p className="menu-item active">Dashboard</p>
        <p className="menu-item">Beat Maker</p>
        <p className="menu-item">My Samples</p>
        <p className="menu-item">Settings</p>
      </div>
    </div>
  );
}
