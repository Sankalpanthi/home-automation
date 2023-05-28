import React, { useState } from "react";
import "../App.css";

export default function NewPassword({ homePage, email }) {
  const [otp, setOtp] = useState("");
  const [pass, setPass] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    const data = await fetch(
      "https://sarthak-testing-render.onrender.com/mails/reset",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
        },
        body: JSON.stringify({
          email: email,
          otp: otp,
          password: pass,
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.error(error);
      });
    console.log(data);
    alert("New Password Set!");
    homePage();
    setOtp("");
    setPass("");
  };

  return (
    <div className="container">
      <h1 className="heading">Enter opt and new password</h1>
      <h2 className="heading2">
        Otp has been sent to your email! Please check and enter!
      </h2>
      <form onSubmit={submit}>
        <div className="row">
          <div className="col-25">
            <label htmlFor="otp">OTP</label>
          </div>
          <div className="col-75">
            <input
              type="text"
              maxLength="6"
              pattern="\d{6}"
              title="It is not a 6 digit otp"
              placeholder="It should be of 6 digits"
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
          <input type="submit" className="add-btn" value="Change Password" />
        </div>
      </form>
    </div>
  );
}
