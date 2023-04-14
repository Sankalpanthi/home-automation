import React from "react";
import "../App.css";

import LoginIcon from "@mui/icons-material/Login";

export default function Home({ changeContent, switchChange }) {
  return (
    <div className="container">
      <h1 className="heading">Home</h1>
      <div className="home">
        <p>Welcome to our Home Automation website!</p>
        <button
          className="ls-btn"
          onClick={() => {
            changeContent({
              title: "Signup/Login",
              icon: <LoginIcon />,
              id: -2,
            });
            switchChange(-1);
          }}
        >
          Signup
        </button>
        <button
          className="ls-btn"
          onClick={() => {
            changeContent({
              title: "Signup/Login",
              icon: <LoginIcon />,
              id: -2,
            });
            switchChange(1);
          }}
        >
          Login
        </button>
        <p>
          We are thrilled to introduce you to the world of smart living, where
          your home becomes an extension of your lifestyle. <br />
          Currently we have two smart services to offer which are bound to
          increase with time.
        </p>
        <div className="col">
          <div className="home-col">
            <h3>Smart Switchboard</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
          <div className="home-col">
            <h3>Temperature Sensor</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
        </div>
        <p>
          So, explore our website and discover how we can help you transform
          your home into a smarter, more comfortable, and secure living space.
        </p>
        <p>Start by signing up/logging in to the website</p>
      </div>
    </div>
  );
}
