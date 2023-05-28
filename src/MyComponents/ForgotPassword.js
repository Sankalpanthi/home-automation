import React, { useState } from "react";
import "../App.css";

export default function ForgotPassword({ newPass }) {
  const [email, setEmail] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    const data = await fetch(
      "https://sarthak-testing-render.onrender.com/mails/reset",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
        },
        body: JSON.stringify({
          email: email,
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
    newPass(email);
    setEmail("");
  };

  return (
    <div className="container">
      <h1 className="heading">Forgot Password?</h1>
      <h2 className="heading2">Enter your email</h2>
      <form onSubmit={submit}>
        <div className="row">
          <div className="col-25">
            <label htmlFor="email">Email</label>
          </div>
          <div className="col-75">
            <input
              type="email"
              placeholder="Enter your email"
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
              title="Must contain at least one . after @ and 2-4 char after ."
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              id="email"
              required
            />
          </div>
        </div>
        <div className="row">
          <input type="submit" className="add-btn" value="Next" />
        </div>
      </form>
    </div>
  );
}
