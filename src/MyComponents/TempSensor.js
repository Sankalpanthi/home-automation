import React from "react";
import "../App.css";

export default function TempSensor({ content, onDelete }) {
  return (
    <div className="container">
      <h1 className="heading">TempSensor</h1>
      <h2 className="heading2">Esp Username: {content.espusername}</h2>
      <h2 className="heading2">{content.output}</h2>
      <h2 className="heading2">The temperature is {content.temp}</h2>
      <h2 className="heading2">The humidity is 33&deg;C</h2>
      <button className="delete-btn" onClick={() => onDelete(content)}>
        Delete
      </button>
    </div>
  );
}
