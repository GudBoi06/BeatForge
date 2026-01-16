import React, { useEffect, useState } from "react";
import { getPresets, savePreset } from "../../services/api";

export default function PresetLoader({ loadPresetToSequencer }) {
  const [list, setList] = useState([]);
  useEffect(() => { fetchPresets(); }, []);
  const fetchPresets = async () => {
    const res = await getPresets();
    setList(res.data);
  };
  const apply = (p) => {
    // pass to parent to set bpm, grid, samples etc.
    loadPresetToSequencer(p);
  };
  return (
    <div className="preset-list">
      <h4>Presets</h4>
      {list.map(p => (
        <div key={p._id} className="preset-item">
          <div>{p.name}</div>
          <button onClick={() => apply(p)}>Load</button>
        </div>
      ))}
    </div>
  );
}
