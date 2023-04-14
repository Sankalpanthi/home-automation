import React, { useEffect, useState } from "react";
import "../LoginSignup.css";

export default function LoginSignup({ login, register, change, switchChange }) {
  const [lemail, setLemail] = useState("");
  const [lpass, setLpass] = useState("");
  const [rname, setRname] = useState("");
  const [remail, setRemail] = useState("");
  const [rpass, setRpass] = useState("");
  const [rcpass, setRcpass] = useState("");

  useEffect(() => {
    const check = () => {
      if (change === 1) {
        document.getElementById("flip").checked = false;
        document.getElementById("lform").style.pointerEvents = "auto";
        document.getElementById("rform").style.pointerEvents = "none";
      } else {
        document.getElementById("flip").checked = true;
        document.getElementById("rform").style.pointerEvents = "auto";
        document.getElementById("lform").style.pointerEvents = "none";
      }
    };
    check();
  }, [change]);

  const submitRegister = (e) => {
    e.preventDefault();
    if (rpass !== rcpass) {
      alert("Password and Confirm Password do not match!");
    } else {
      console.log(rname, remail, rpass, rcpass);
      register(rname, remail, rpass);
    }
  };
  const submitLogin = (e) => {
    e.preventDefault();
    console.log(lemail, lpass);
    login(lemail, lpass);
  };

  return (
    <div className="right-body">
      <div className="ls-container">
        <input
          type="checkbox"
          id="flip"
          onChange={() => {
            switchChange(-change);
          }}
        />
        <div className="cover">
          <div className="front">
            <img src="/Images/frontImg.jpg" alt="" />
            <div className="text">
              <span className="text-1">
                An old friend is <br /> always welcome
              </span>
              <span className="text-2">Let's get connected</span>
            </div>
          </div>
          <div className="back">
            <img className="backImg" src="/Images/backImg.jpg" alt="" />
            <div className="text">
              <span className="text-1">
                Every new friend is a <br /> new adventure
              </span>
              <span className="text-2">Let's get started</span>
            </div>
          </div>
        </div>
        <div className="forms">
          <div className="form-content">
            <div className="login-form">
              <div className="title">Login</div>
              <form onSubmit={submitLogin} id="lform">
                <div className="input-boxes">
                  <div className="input-box">
                    <i className="fas fa-envelope"></i>
                    <input
                      type="email"
                      placeholder="Enter your email"
                      pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                      title="Must contain at least one . after @ and 2-4 char after ."
                      value={lemail}
                      onChange={(e) => {
                        setLemail(e.target.value);
                      }}
                      id="lemail"
                      name="lemail"
                      required
                    />
                  </div>
                  <div className="input-box">
                    <i className="fas fa-lock"></i>
                    <input
                      type="password"
                      placeholder="Enter your password"
                      pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                      title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                      value={lpass}
                      onChange={(e) => {
                        setLpass(e.target.value);
                      }}
                      name="lpass"
                      id="lpass"
                      required
                    />
                  </div>
                  <div className="text">
                    <a href="#">Forgot password?</a>
                  </div>
                  <div className="button input-box">
                    <input type="submit" name="submit" value="Login" />
                  </div>
                  <div className="text sign-up-text">
                    Don't have an account?{" "}
                    <label htmlFor="flip">Signup now</label>
                  </div>
                </div>
              </form>
            </div>
            <div className="signup-form">
              <div className="title">Signup</div>
              <form onSubmit={submitRegister} id="rform">
                <div className="input-boxes">
                  <div className="input-box">
                    <i className="fas fa-user"></i>
                    <input
                      type="text"
                      placeholder="Enter your name"
                      pattern="[a-zA-Z\s]+"
                      title="Must contain only alphabets and space character"
                      value={rname}
                      onChange={(e) => {
                        setRname(e.target.value);
                      }}
                      name="rname"
                      id="rname"
                      required
                    />
                  </div>
                  <div className="input-box">
                    <i className="fas fa-envelope"></i>
                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={remail}
                      onChange={(e) => {
                        setRemail(e.target.value);
                      }}
                      id="remail"
                      name="remail"
                      pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                      title="Must contain at least one . after @ and 2-4 char after ."
                      required
                    />
                  </div>
                  <div className="input-box">
                    <i className="fas fa-lock"></i>
                    <input
                      type="password"
                      placeholder="Enter your password"
                      pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                      title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                      value={rpass}
                      onChange={(e) => {
                        setRpass(e.target.value);
                      }}
                      name="rpass"
                      id="rpass"
                      required
                    />
                  </div>
                  <div className="input-box">
                    <i className="fas fa-lock"></i>
                    <input
                      type="password"
                      placeholder="Confirm your password"
                      pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                      title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                      value={rcpass}
                      onChange={(e) => {
                        setRcpass(e.target.value);
                      }}
                      name="rcpass"
                      id="rcpass"
                      required
                    />
                  </div>
                  <div className="button input-box">
                    <input type="submit" name="submit" value="Signup" />
                  </div>
                  <div className="text sign-up-text">
                    Already have an account?{" "}
                    <label htmlFor="flip">Login now</label>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
