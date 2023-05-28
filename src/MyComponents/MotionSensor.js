import React, { useState, useEffect } from "react";
import "../App.css";

export default function MotionSensor({ content, flag, onDelete }) {
  const [motion, setMotion] = useState(content.motion);
  const [output, setOutput] = useState(content.output);
  useEffect(() => {
    const resetState = () => {
      setMotion(content.motion);
      setOutput(content.output);
    };
    resetState();
  }, [content, flag]);
  return (
    <div className="container">
      <h1 className="heading">MotionSensor</h1>
      <h2 className="heading2">Esp Username: {content.espusername}</h2>
      <h2 className="heading2">{output}</h2>
      {motion === 1 ? (
        <h2 className="heading2">Motion detected!</h2>
      ) : (
        <h2 className="heading2">No motion present.</h2>
      )}
      <button className="delete-btn" onClick={() => onDelete(content)}>
        Delete
      </button>
    </div>
  );
}
