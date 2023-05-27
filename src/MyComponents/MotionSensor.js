import React from "react";
import "../App.css";

export default function MotionSensor({ content, onDelete }) {
  return (
    <div className="container">
      <h1 className="heading">MotionSensor</h1>
      <h2 className="heading2">Device Id: {content.id}</h2>
      <h2 className="heading2">The motion is {content.temp} there.</h2>
      <button className="delete-btn" onClick={() => onDelete(content)}>
        Delete
      </button>
    </div>
  );
}
