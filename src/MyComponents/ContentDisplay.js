import React, { useState } from "react";
import Home from "./Home";
import SwitchBoard from "./SwitchBoard";
import TempSensor from "./TempSensor";
import MotionSensor from "./MotionSensor";
import AddDevice from "./AddDevice";
import LoginSignup from "./LoginSignup";
import Welcome from "./Welcome";
import "../App.css";
import ForgotPassword from "./ForgotPassword";
import NewPassword from "./NewPassword";

export default function ContentDisplay({
  content,
  flag,
  changeContent,
  onToggle,
  onDelete,
  addDevice,
  login,
  register,
  username,
  forgotPass,
  newPass,
  email,
  homePage,
}) {
  const [change, setChange] = useState(-1); // for login/signup

  const switchChange = (val) => {
    setChange(val);
  };

  function callSpecific() {
    if (content.type === -1) {
      return <Home changeContent={changeContent} switchChange={switchChange} />;
    } else if (content.type === -2) {
      return (
        <LoginSignup
          login={login}
          register={register}
          change={change}
          switchChange={switchChange}
          forgotPass={forgotPass}
        />
      );
    } else if (content.type === -3) {
      return <Welcome username={username} />;
    } else if (content.type === -4) {
      return <AddDevice addDevice={addDevice} />;
    } else if (content.type === -6) {
      return <ForgotPassword newPass={newPass} />;
    } else if (content.type === -7) {
      return <NewPassword homePage={homePage} email={email} />;
    } else if (content.type === 1) {
      return (
        <SwitchBoard
          content={content}
          flag={flag}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      );
    } else if (content.type === 2) {
      return <TempSensor content={content} flag={flag} onDelete={onDelete} />;
    } else if (content.type === 3) {
      return <MotionSensor content={content} flag={flag} onDelete={onDelete} />;
    } else {
      return <></>;
    }
  }
  return <div className="right-side">{callSpecific()}</div>;
}
