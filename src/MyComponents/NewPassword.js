import React, { useState } from "react";
import "../App.css";

export default function NewPassword({ homePage }) {
  const [otp, setOtp] = useState("");
  const [pass, setPass] = useState("");

  const submit = (e) => {
    e.preventDefault();
    alert("New Password Set!");
    homePage();
    setOtp("");
    setPass("");
  };

  return (
    <div className="container">
      <h1 className="heading">Enter opt and new password</h1>
      <h2 className="heading2">Otp is sent to your mail! Check and enter!</h2>
      <form onSubmit={submit}>
        <div className="row">
          <div className="col-25">
            <label htmlFor="otp">OTP</label>
          </div>
          <div className="col-75">
            <input
              type="text"
              maxLength="5"
              pattern="\d{5}"
              title="It is not a 5 digit otp"
              placeholder="It should be of 5 digits"
              value={otp}
              onChange={(e) => {
                setOtp(e.target.value);
              }}
              id="otp"
              required
            />
          </div>
        </div>
        <div className="row">
          <div className="col-25">
            <label htmlFor="password">New Password</label>
          </div>
          <div className="col-75">
            <input
              type="password"
              placeholder="Enter your password"
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
              value={pass}
              onChange={(e) => {
                setPass(e.target.value);
              }}
              id="password"
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
