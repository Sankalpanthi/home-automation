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
              type: -2,
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
              type: -2,
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
              A smart switchboard, also known as a smart electrical panel, is an
              advanced electrical distribution system that incorporates digital
              technology and connectivity. It allows for remote monitoring,
              control, and automation of electrical circuits within a building
              or home. Smart switchboards provide real-time information on
              energy consumption, enable efficient energy management, and offer
              features like remote operation, fault detection, and integration
              with smart home systems. They enhance safety, convenience, and
              energy efficiency by optimizing power usage and providing
              intelligent control over electrical devices.
            </p>
          </div>
          <div className="home-col">
            <h3>Temperature Sensor</h3>
            <p>
              The DHT11 sensor consists of two primary components - a capacitive
              humidity sensor and a Negative Temperature Coefficient (NTC)
              thermistor, which work together to measure temperature and
              humidity. Two electrodes and a moisture-holding dielectric
              substrate make up the humidity sensor, while the thermistor
              experiences variations in its resistance value based on the
              surrounding temperature. The sensor records these changes in
              capacitance and resistance values and then converts them into
              digital signals.
            </p>
          </div>
          <div className="home-col">
            <h3>Motion Sensor</h3>
            <p>
              A PIR (Passive Infrared) sensor is a device that detects infrared
              radiation emitted by objects in its field of view. It is commonly
              used for motion detection in security systems and automatic
              lighting controls. The PIR sensor measures changes in infrared
              levels caused by the movement of warm objects, such as humans or
              animals, and triggers a response accordingly. It is an
              energy-efficient and reliable technology for detecting motion,
              making it widely used in applications like home security systems,
              occupancy sensing, and energy-saving solutions.
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
