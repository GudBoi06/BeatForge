import React, { useState, useRef, useEffect } from "react";
import Knob from "./common/Knob";
import "../styles/sequencer.css";

const sounds = [
  { name: "Kick", file: "/sounds/kick.wav" },
  { name: "Snare", file: "/sounds/snare.wav" },
  { name: "HiHat", file: "/sounds/hihat.wav" }
];

export default function StepSequencer() {
  /* ===========================
     STATE (UI ONLY)
  ============================ */
  const [stepsCount, setStepsCount] = useState(16);
  const [grid, setGrid] = useState(
    sounds.map(() => Array(16).fill(false))
  );
  const [volumes, setVolumes] = useState([1, 1, 1]);
  const [bpm, setBpm] = useState(120);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  /* ===========================
     REFS (AUDIO ENGINE)
  ============================ */
  const gridRef = useRef(grid);
  const volumeRef = useRef(volumes);
  const stepRef = useRef(0);
  const intervalRef = useRef(null);
  const dragMode = useRef(null); // "paint" | "erase"
  const audioPlayersRef = useRef({});
  const [masterVolume, setMasterVolume] = useState(0.8);
  const masterVolumeRef = useRef(masterVolume);
  const [mutedTracks, setMutedTracks] = useState(sounds.map(() => false));
  const mutedTracksRef = useRef(mutedTracks);



  /* ===========================
     KEEP REFS IN SYNC
  ============================ */
  useEffect(() => {
    gridRef.current = grid;
  }, [grid]);

  useEffect(() => {
    volumeRef.current = volumes;
  }, [volumes]);

  useEffect(() => {
    masterVolumeRef.current = masterVolume;
  }, [masterVolume]);


  /* ===========================
     REBUILD GRID ON STEP CHANGE
  ============================ */
  useEffect(() => {
  setGrid(prevGrid => {
    return prevGrid.map(row => {
      // If steps increased → add empty steps
      if (row.length < stepsCount) {
        return [
          ...row,
          ...Array(stepsCount - row.length).fill(false)
        ];
      }

      // If steps decreased → trim extra steps
      if (row.length > stepsCount) {
        return row.slice(0, stepsCount);
      }

      return row;
    });
  });

  // Keep playback position valid
  stepRef.current =
    stepRef.current % stepsCount;
  setCurrentStep(stepRef.current);
}, [stepsCount]);


  /* ===========================
     AUDIO PLAYBACK (CORE)
  ============================ */
  const playStep = () => {
  sounds.forEach((sound, rowIndex) => {
    if (
      gridRef.current[rowIndex][stepRef.current] &&
      !mutedTracksRef.current[rowIndex] 
    ) {
      const audio = audioPlayersRef.current[sound.file];
      if (!audio) return;

      audio.currentTime = 0;
      audio.volume =
        volumeRef.current[rowIndex] * masterVolumeRef.current;
      audio.play();
    }
  });

  setCurrentStep(stepRef.current);
  stepRef.current = (stepRef.current + 1) % stepsCount;
};


useEffect(() => {
  mutedTracksRef.current = mutedTracks;
}, [mutedTracks]);

  /* ===========================
     TRANSPORT CONTROLS
  ============================ */
  const start = () => {
    if (isPlaying) return;
    setIsPlaying(true);
  };

  const stop = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setIsPlaying(false);
    stepRef.current = 0;
    setCurrentStep(0);
  };

  const clearBeat = () => {
    setGrid(sounds.map(() => Array(stepsCount).fill(false)));
    stepRef.current = 0;
    setCurrentStep(0);
  };

  /* ===========================
     REAL-TIME BPM ENGINE
  ============================ */
  useEffect(() => {
    if (!isPlaying) return;

    clearInterval(intervalRef.current);

    const stepTime = (60 / bpm) * 1000 / 4;

    intervalRef.current = setInterval(playStep, stepTime);

    return () => clearInterval(intervalRef.current);
  }, [bpm, isPlaying, stepsCount]);

  /* ===========================
     STEP UPDATE (PAINT / ERASE)
  ============================ */
  const updateStep = (row, step, value) => {
    setGrid(prev => {
      const copy = prev.map(r => [...r]);
      copy[row][step] = value;
      return copy;
    });
  };

  const handleBpmWheel = (e) => {
  e.preventDefault();
  const delta = e.deltaY < 0 ? 1 : -1;
  setBpm((prev) =>
    Math.min(200, Math.max(60, prev + delta))
  );
};

const handleStepsWheel = (e) => {
  e.preventDefault();
  const delta = e.deltaY < 0 ? 1 : -1;
  setStepsCount((prev) =>
    Math.min(32, Math.max(4, prev + delta))
  );
};

const preloadSounds = () => {
  sounds.forEach(sound => {
    if (!audioPlayersRef.current[sound.file]) {
      const audio = new Audio(sound.file);
      audio.preload = "auto";
      audioPlayersRef.current[sound.file] = audio;
    }
  });
};

  /* ===========================
     RENDER
  ============================ */
  return (
    <div
      className="sequencer"
      onContextMenu={(e) => e.preventDefault()}
    >
      <h3>Step Sequencer</h3>

      {/* TRANSPORT BAR */}
      <div className="transport-bar">
        <div className="transport-left">
          <button
            onClick={() => {
                preloadSounds();
                start();
            }}
            >▶
          </button>
          <button onClick={stop}>⏹</button>
          <button onClick={clearBeat}>X</button>
        </div>

        <div className="transport-right">
          <div className="bpm-control">
            <Knob
            label="BPM"
            value={bpm}
            min={60}
            max={300}
            step={1}
            onChange={setBpm}
            />
          </div>
          <div className="bpm-control">
            <Knob
            label="STEPS"
            value={stepsCount}
            min={4}
            max={32}
            step={1}
            onChange={(v) =>
                setStepsCount(
                Math.min(32, Math.max(4, v))
                )
            }
            />
          </div>
          <div className="bpm-control">
            <Knob
      label="MASTER"
      value={Math.round(masterVolume * 100)}
      min={0}
      max={100}
      step={1}
      onChange={(v) => setMasterVolume(v / 100)}
    />
          </div>
        </div>
      </div>

      {/* SEQUENCER GRID */}
      {sounds.map((sound, rowIndex) => (
        <div className="sequencer-row" key={sound.name}>
          <div className="track-label">
  <span>{sound.name}</span>

    <div className="track-controls">
        <button
        className={`mute-btn ${mutedTracks[rowIndex] ? "active" : ""}`}
        onClick={() => {
            setMutedTracks(prev => {
            const copy = [...prev];
            copy[rowIndex] = !copy[rowIndex];
            return copy;
            });
        }}
        >
        M
        </button>
    </div>
    </div>

          {/* VOLUME */}
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volumes[rowIndex]}
            className="volume-slider"
            onChange={(e) => {
              const copy = [...volumes];
              copy[rowIndex] = Number(e.target.value);
              setVolumes(copy);
            }}
          />

          {/* STEPS */}
          <div
            className="steps"
            onMouseUp={() => (dragMode.current = null)}
            onMouseLeave={() => (dragMode.current = null)}
          >
            {grid[rowIndex].map((active, stepIndex) => {
              const isAltGroup =
                Math.floor(stepIndex / 4) % 2 === 1;

              return (
                <div
                  key={stepIndex}
                  className={`step
                    ${active ? "active" : ""}
                    ${currentStep === stepIndex ? "current" : ""}
                    ${isAltGroup ? "alt-group" : ""}
                  `}
                  onMouseDown={(e) => {
                    if (e.button === 2) {
                      dragMode.current = "erase";
                      updateStep(rowIndex, stepIndex, false);
                    } else {
                      dragMode.current = "paint";
                      updateStep(rowIndex, stepIndex, true);
                    }
                  }}
                  onMouseEnter={() => {
                    if (!dragMode.current) return;
                    updateStep(
                      rowIndex,
                      stepIndex,
                      dragMode.current === "paint"
                    );
                  }}
                />
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
