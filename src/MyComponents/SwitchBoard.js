import React, { useState, useEffect } from "react";
import ReactSwitch from "react-switch";
import "../App.css";

export default function SwitchBoard({ content, flag, onToggle, onDelete }) {
  const [checked1, setChecked1] = useState(content.switch1);
  const [checked2, setChecked2] = useState(content.switch2);
  const [checked3, setChecked3] = useState(content.switch3);
  const [checked4, setChecked4] = useState(content.switch4);

  useEffect(() => {
    const resetState = () => {
      setChecked1(content.switch1);
      setChecked2(content.switch2);
      setChecked3(content.switch3);
      setChecked4(content.switch4);
      console.log("reset state of switchboard is called");
    };
    resetState();
  }, [content, flag]);

  const handleChange = (val, switch_number) => {
    onToggle(switch_number);
    if (switch_number === 1) {
      setChecked1(val);
    } else if (switch_number === 2) {
      setChecked2(val);
    } else if (switch_number === 3) {
      setChecked3(val);
    } else {
      setChecked4(val);
    }
  };

  return (
    <div className="container">
      <h1 className="heading">SwitchBoard</h1>
      <h2 className="heading2">Esp Username: {content.espusername}</h2>
      <h2 className="heading2">{content.output}</h2>
      <div className="switches">
        <div className="switch-col">
          <h2>
            Switch 1 value:{" "}
            <ReactSwitch
              checked={checked1}
              onChange={(val) => {
                handleChange(val, 1);
              }}
              uncheckedIcon={false}
              checkedIcon={false}
              offColor="#CF9FFF"
              onColor="#7d2ae8"
              offHandleColor="#fff"
              onHandleColor="#fff"
              handleDiameter={20}
            />
          </h2>
        </div>
        <div className="switch-col">
          <h2>
            Switch 2 value:{"  "}
            <ReactSwitch
              checked={checked2}
              onChange={(val) => {
                handleChange(val, 2);
              }}
              uncheckedIcon={false}
              checkedIcon={false}
              offColor="#CF9FFF"
              onColor="#7d2ae8"
              offHandleColor="#fff"
              onHandleColor="#fff"
              handleDiameter={20}
            />
          </h2>
        </div>
        <div className="switch-col">
          <h2>
            Switch 3 value:{"  "}
            <ReactSwitch
              checked={checked3}
              onChange={(val) => {
                handleChange(val, 3);
              }}
              uncheckedIcon={false}
              checkedIcon={false}
              offColor="#CF9FFF"
              onColor="#7d2ae8"
              offHandleColor="#fff"
              onHandleColor="#fff"
              handleDiameter={20}
            />
          </h2>
        </div>
        <div className="switch-col">
          <h2>
            Switch 4 value:{"  "}
            <ReactSwitch
              checked={checked4}
              onChange={(val) => {
                handleChange(val, 4);
              }}
              uncheckedIcon={false}
              checkedIcon={false}
              offColor="#CF9FFF"
              onColor="#7d2ae8"
              offHandleColor="#fff"
              onHandleColor="#fff"
              handleDiameter={20}
            />
          </h2>
        </div>
      </div>
      <button className="delete-btn" onClick={() => onDelete(content)}>
        Delete
      </button>
    </div>
  );
}
