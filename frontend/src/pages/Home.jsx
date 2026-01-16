import React from "react";
import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";
import StepSequencer from "../components/StepSequencer";
import "../styles/home.css";

export default function Home() {
  return (
    <div className="home-layout">
      <Sidebar />

      <div className="main-area">
        <TopBar />

        <div className="workspace">
          <h2>BeatForge Workspace</h2>
          <p>This area will soon contain the Sequencer, Pads, Plugin Panel, etc.</p>
          <StepSequencer />

        </div>
      </div>
    </div>
  );
}
