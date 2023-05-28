import React from "react";
import "../App.css";

export default function MotionSensor({ content, onDelete }) {
  return (
    <div className="container">
      <h1 className="heading">MotionSensor</h1>
      <h2 className="heading2">Esp Username: {content.espusername}</h2>
      <h2 className="heading2">{content.output}</h2>
      {content.motion === 1 ? (
        <h2 className="heading2">Motion detected!</h2>
      ) : (
        <h2 className="heading2">No motion present!</h2>
      )}
      <button className="delete-btn" onClick={() => onDelete(content)}>
        Delete
      </button>
    </div>
  );
}
