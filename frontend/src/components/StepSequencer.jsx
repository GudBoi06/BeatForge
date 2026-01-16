import React, { useState } from "react";
import "../styles/sequencer.css";

const sounds = ["Kick", "Snare", "HiHat"];

export default function StepSequencer() {
  // 3 rows × 16 steps
  const [grid, setGrid] = useState(
    sounds.map(() => Array(16).fill(false))
  );

  const toggleStep = (rowIndex, stepIndex) => {
    const newGrid = [...grid];
    newGrid[rowIndex][stepIndex] = !newGrid[rowIndex][stepIndex];
    setGrid(newGrid);
  };

  return (
    <div className="sequencer">
      <h3>Step Sequencer</h3>

      {sounds.map((sound, rowIndex) => (
        <div className="sequencer-row" key={sound}>
          <span className="sound-label">{sound}</span>

          <div className="steps">
            {grid[rowIndex].map((active, stepIndex) => (
              <div
                key={stepIndex}
                className={`step ${active ? "active" : ""}`}
                onClick={() => toggleStep(rowIndex, stepIndex)}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
