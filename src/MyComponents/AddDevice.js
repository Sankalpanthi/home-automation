import React, { useState } from "react";
import "../App.css";

export default function AddDevice({ addDevice }) {
  const [username, setUsername] = useState("");
  const [pass, setPass] = useState("");

  const submit = (e) => {
    e.preventDefault();
    addDevice(username, pass);
    setUsername("");
    setPass("");
  };

  return (
    <div className="container">
      <h1 className="heading">Add a Device</h1>
      <form onSubmit={submit}>
        <div className="row">
          <div className="col-25">
            <label htmlFor="deviceUsername">Device Username</label>
          </div>
          <div className="col-75">
            <input
              type="text"
              maxLength="20"
              placeholder="Max Limit 20 Characters"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              id="deviceUsername"
              required
            />
          </div>
        </div>
        <div className="row">
          <div className="col-25">
            <label htmlFor="password">Password</label>
          </div>
          <div className="col-75">
            <input
              type="number"
              placeholder="Max Limit 20 Characters"
              value={pass}
              onChange={(e) => {
                setPass(e.target.value);
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
