import React, { useState } from "react";
import "../App.css";

export default function AddDevice({ addDevice }) {
  const [type, setType] = useState(0);
  const [name, setName] = useState("");
  const [id, setId] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (!type) {
      alert("Select the device type!");
    } else {
      addDevice(type, name, id);
      setName("");
      setId("");
    }
  };

  return (
    <div className="container">
      <h1 className="heading">Add a Device</h1>
      <form onSubmit={submit}>
        <div className="radio-div">
          <div className="radio-col">
            <input
              type="radio"
              onClick={() => {
                setType(1);
              }}
              id="switch_board"
              className="input-hidden"
              name="device_type"
            />
            <label htmlFor="switch_board">
              <figure>
                <img src="/Images/switch board.jpg" alt="switch board image" />
                <figcaption>Switch Board</figcaption>
              </figure>
            </label>
            <br />
          </div>
          <div className="radio-col">
            <input
              type="radio"
              onClick={() => {
                setType(2);
              }}
              id="temp_sensor"
              className="input-hidden"
              name="device_type"
            />
            <label htmlFor="temp_sensor">
              <figure>
                <img
                  src="/Images/temp sensor.jpeg"
                  alt="temperature sensor image"
                />
                <figcaption>Temperature Sensor</figcaption>
              </figure>
            </label>
            <br />
          </div>
        </div>
        <div className="row">
          <div className="col-25">
            <label htmlFor="deviceName">Device Name</label>
          </div>
          <div className="col-75">
            <input
              type="text"
              maxLength="20"
              placeholder="Max Limit 20 Characters"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              id="deviceName"
              required
            />
          </div>
        </div>
        <div className="row">
          <div className="col-25">
            <label htmlFor="deviceId">Device Id</label>
          </div>
          <div className="col-75">
            <input
              type="number"
              placeholder="Max Limit 20 Characters"
              value={id}
              onChange={(e) => {
                setId(e.target.value);
              }}
              id="deviceId"
              required
            />
          </div>
        </div>
        <br />
        <div className="row">
          <input type="submit" className="add-btn" value="Add Device" />
        </div>
      </form>
    </div>
  );
}
