import React, { useState, useEffect } from "react";
import "../App.css";

export default function TempSensor({ content, flag, onDelete }) {
  const [temp, setTemp] = useState(content.temp);
  const [hum, setHum] = useState(content.hum);

  useEffect(() => {
    const resetState = () => {
      setTemp(content.temp);
      setHum(content.hum);
      console.log("reset state of temp is called");
    };
    resetState();
  }, [content, flag]);
  return (
    <div className="container">
      <h1 className="heading">TempSensor</h1>
      <h2 className="heading2">Esp Username: {content.espusername}</h2>
      <h2 className="heading2">{content.output}</h2>
      <h2 className="heading2">The temperature is {temp}&deg;C</h2>
      <h2 className="heading2">The humidity is {hum}%</h2>
      <button className="delete-btn" onClick={() => onDelete(content)}>
        Delete
      </button>
    </div>
  );
}
