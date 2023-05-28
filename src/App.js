import "./App.css";
import SideBar from "./MyComponents/SideBar";
import ContentDisplay from "./MyComponents/ContentDisplay";

// importing icons
import HomeIcon from "@mui/icons-material/Home";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import DeviceThermostatIcon from "@mui/icons-material/DeviceThermostat";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import WavingHandIcon from "@mui/icons-material/WavingHand";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import PasswordIcon from "@mui/icons-material/Password";

import React, { useEffect, useState } from "react";

function App() {
  var device_no = [1, 1, 1];
  const [flag, setFlag] = useState(1);
  const [sideBarItems, setSideBarItems] = useState([
    {
      title: "Home",
      icon: <HomeIcon />,
      type: -1,
    },
    {
      title: "Signup/Login",
      icon: <LoginIcon />,
      type: -2,
    },
  ]);
  const initContent = {
    title: "Home",
    icon: <HomeIcon />,
    type: -1,
  };
  const [content, setContent] = useState(initContent);
  const [username, setUsername] = useState("");

  // Toggling in sidebar
  const changeContent = (sideBarItem) => {
    if (sideBarItem.type === -5) {
      // for logout
      if (window.confirm("Are you sure you wish to logout?")) {
        setSideBarItems([
          {
            title: "Home",
            icon: <HomeIcon />,
            type: -1,
          },
          {
            title: "Signup/Login",
            icon: <LoginIcon />,
            type: -2,
          },
        ]);
        setContent(initContent);
      }
    } else {
      setContent(sideBarItem);
    }
  };

  // Deleting esp
  const onDelete = async (content) => {
    const data = await fetch(
      "https://sarthak-testing-render.onrender.com/user/device/delete",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
        },
        body: JSON.stringify({
          token: localStorage.getItem("token"),
          username: content.espusername,
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
    if (data.output !== "esp deleted to db") {
      alert(data.output);
    } else {
      let temp = [];
      let i;
      for (i = 0; i < sideBarItems.length; i++) {
        if (sideBarItems[i].espusername !== content.espusername) {
          temp.push(sideBarItems[i]);
        }
      }
      setSideBarItems(temp);
      setContent(sideBarItems[0]);
    }
  };

  // Adding esp
  const addDevice = async (espusername, pass) => {
    const data = await fetch(
      "https://sarthak-testing-render.onrender.com/user/device/add",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
        },
        body: JSON.stringify({
          token: localStorage.getItem("token"),
          username: espusername,
          otp: pass,
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
    if (data.output !== "esp added to db") {
      alert(data.output);
    } else {
      const device_details = await fetch(
        "https://sarthak-testing-render.onrender.com/user/device",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "*/*",
          },
          body: JSON.stringify({
            token: localStorage.getItem("token"),
            username: espusername,
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
      console.log(device_details);
      let newDevices = [];
      let i;
      for (i = 1; i < sideBarItems.length - 2; i++) {
        if (sideBarItems[i].type === 1) {
          device_no[0] = Number(sideBarItems[i].title.split(" ").pop()) + 1;
        } else if (sideBarItems[i].type === 2) {
          device_no[1] = Number(sideBarItems[i].title.split(" ").pop()) + 1;
        } else if (sideBarItems[i].type === 3) {
          device_no[2] = Number(sideBarItems[i].title.split(" ").pop()) + 1;
        }
      }
      if (device_details.type === 1) {
        newDevices.push(
          {
            title: "SwitchBoard " + device_no[0]++,
            icon: <ToggleOnIcon />,
            type: 1,
            switch1: device_details.status_1,
            switch2: device_details.status_2,
            switch3: device_details.status_3,
            switch4: device_details.status_4,
            espusername: espusername,
            output: device_details.output,
          },
          {
            title: "Temperature Sensor " + device_no[1]++,
            icon: <DeviceThermostatIcon />,
            type: 2,
            temp: device_details.status_temp,
            hum: device_details.status_hum,
            espusername: espusername,
            output: device_details.output,
          }
        );
      } else if (device_details.type === 2) {
        newDevices.push(
          {
            title: "SwitchBoard " + device_no[0]++,
            icon: <ToggleOnIcon />,
            type: 1,
            switch1: device_details.status_1,
            switch2: device_details.status_2,
            switch3: device_details.status_3,
            switch4: device_details.status_4,
            espusername: espusername,
            output: device_details.output,
          },
          {
            title: "Motion Sensor " + device_no[2]++,
            icon: <DirectionsRunIcon />,
            type: 3,
            motion: device_details.status_motion,
            espusername: espusername,
            output: device_details.output,
          }
        );
      }
      let temp = sideBarItems;
      temp.splice.apply(temp, [temp.length - 2, 0].concat(newDevices));
      setSideBarItems(temp);
      setContent(sideBarItems[sideBarItems.length - 4]);
    }
  };

  // Changing switches
  const onToggle = async (switch_number) => {
    if (switch_number === 1) {
      content.switch1 = !content.switch1;
    } else if (switch_number === 2) {
      content.switch2 = !content.switch2;
    } else if (switch_number === 3) {
      content.switch3 = !content.switch3;
    } else {
      content.switch4 = !content.switch4;
    }
    console.log(
      content.switch1,
      content.switch2,
      content.switch3,
      content.switch4
    );
    const data = await fetch(
      "https://sarthak-testing-render.onrender.com/user/device",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
        },
        body: JSON.stringify({
          token: localStorage.getItem("token"),
          username: content.espusername,
          status_1: content.switch1,
          status_2: content.switch2,
          status_3: content.switch3,
          status_4: content.switch4,
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
    if (data.output === "device is in sync") {
      let i;
      for (i = 1; i < sideBarItems.length - 2; i++) {
        if (
          sideBarItems[i].espusername === content.espusername &&
          sideBarItems[i].type === 1
        ) {
          sideBarItems[i] = content;
          break;
        }
      }
    } else {
      console.log(data.output);
    }
  };

  // Logging in
  const login = async (email, pass) => {
    // check if email id and pass are correct
    const data = await fetch(
      "https://sarthak-testing-render.onrender.com/user/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
        },
        body: JSON.stringify({
          email: email,
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
    // on unsuccessful login
    if (data.output !== undefined) {
      alert(data.output);
    } else {
      // on successful login
      localStorage.setItem("token", data.token);
      setUsername(data.username);
      let devices = [];
      for (var i = 0; i < data.device_status.length; i++) {
        const device_details = await fetch(
          "https://sarthak-testing-render.onrender.com/user/device",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "*/*",
            },
            body: JSON.stringify({
              token: localStorage.getItem("token"),
              username: data.device_status[i],
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
        if (device_details.type === 1) {
          devices.push({
            title: "SwitchBoard " + device_no[0]++,
            icon: <ToggleOnIcon />,
            type: 1,
            switch1: device_details.status_1,
            switch2: device_details.status_2,
            switch3: device_details.status_3,
            switch4: device_details.status_4,
            espusername: data.device_status[i],
            output: device_details.output,
          });
          devices.push({
            title: "Temperature Sensor " + device_no[1]++,
            icon: <DeviceThermostatIcon />,
            type: 2,
            temp: device_details.status_temp,
            hum: device_details.status_hum,
            espusername: data.device_status[i],
            output: device_details.output,
          });
        } else if (device_details.type === 2) {
          devices.push({
            title: "SwitchBoard " + device_no[0]++,
            icon: <ToggleOnIcon />,
            type: 1,
            switch1: device_details.status_1,
            switch2: device_details.status_2,
            switch3: device_details.status_3,
            switch4: device_details.status_4,
            espusername: data.device_status[i],
            output: device_details.output,
          });
          devices.push({
            title: "Motion Sensor " + device_no[2]++,
            icon: <DirectionsRunIcon />,
            type: 3,
            motion: device_details.status_motion,
            espusername: data.device_status[i],
            output: device_details.output,
          });
        }
      }
      setSideBarItems([
        {
          title: "Welcome",
          icon: <WavingHandIcon />,
          type: -3,
        },
        ...devices,
        {
          title: "Add Device",
          icon: <AddCircleOutlineIcon />,
          type: -4,
        },
        {
          title: "Logout",
          icon: <LogoutIcon />,
          type: -5,
        },
      ]);
      setContent({
        title: "Welcome",
        icon: <WavingHandIcon />,
        type: -3,
      });
    }
  };

  // Registeration
  const register = async (name, email, pass) => {
    // check if email isn't already in use
    const check = await fetch(
      "https://sarthak-testing-render.onrender.com/user/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: pass,
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.output === "user added to db") {
          return true;
        } else {
          return false;
        }
      })
      .catch((error) => {
        console.error(error);
      });
    // on unsuccessful registration
    if (!check) {
      alert("Email already present!");
    } else {
      // on successful registration
      setUsername(name);
      setSideBarItems([
        {
          title: "Welcome",
          icon: <HomeIcon />,
          type: -3,
        },
        {
          title: "Add Device",
          icon: <AddCircleOutlineIcon />,
          type: -4,
        },
        {
          title: "Logout",
          icon: <LogoutIcon />,
          type: -5,
        },
      ]);
      setContent({
        title: "Welcome",
        icon: <WavingHandIcon />,
        type: -3,
      });
    }
  };

  // 1 second delay time function
  useEffect(() => {
    const interval = setInterval(async () => {
      if (content.espusername !== undefined) {
        const device_details = await fetch(
          "https://sarthak-testing-render.onrender.com/user/device",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "*/*",
            },
            body: JSON.stringify({
              token: localStorage.getItem("token"),
              username: content.espusername,
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
        // console.log(device_details);
        if (device_details.error !== undefined) {
          alert("Your token has become inactive,logging you out!");
          setSideBarItems([
            {
              title: "Home",
              icon: <HomeIcon />,
              type: -1,
            },
            {
              title: "Signup/Login",
              icon: <LoginIcon />,
              type: -2,
            },
          ]);
          setContent(initContent);
        } else {
          let changedDevices = [];
          if (device_details.type === 1) {
            changedDevices.push(
              {
                type: 1,
                switch1: device_details.status_1,
                switch2: device_details.status_2,
                switch3: device_details.status_3,
                switch4: device_details.status_4,
                espusername: content.espusername,
                output: device_details.output,
              },
              {
                type: 2,
                temp: device_details.status_temp,
                hum: device_details.status_hum,
                espusername: content.espusername,
                output: device_details.output,
              }
            );
          } else if (device_details.type === 2) {
            changedDevices.push(
              {
                type: 1,
                switch1: device_details.status_1,
                switch2: device_details.status_2,
                switch3: device_details.status_3,
                switch4: device_details.status_4,
                espusername: content.espusername,
                output: device_details.output,
              },
              {
                type: 3,
                motion: device_details.status_motion,
                espusername: content.espusername,
                output: device_details.output,
              }
            );
          }
          let i;
          for (i = 1; i < sideBarItems.length - 2; i++) {
            if (sideBarItems[i].espusername === changedDevices[0].espusername) {
              for (let j = 0; j < changedDevices.length; j++) {
                if (sideBarItems[i].type === changedDevices[j].type) {
                  if (changedDevices[j].type === 1) {
                    sideBarItems[i].switch1 = changedDevices[j].switch1;
                    sideBarItems[i].switch2 = changedDevices[j].switch2;
                    sideBarItems[i].switch3 = changedDevices[j].switch3;
                    sideBarItems[i].switch4 = changedDevices[j].switch4;
                    sideBarItems[i].output = changedDevices[j].output;
                    if (content.type === 1) {
                      content.switch1 = changedDevices[j].switch1;
                      content.switch2 = changedDevices[j].switch2;
                      content.switch3 = changedDevices[j].switch3;
                      content.switch4 = changedDevices[j].switch4;
                    }
                  } else if (changedDevices[j].type === 2) {
                    sideBarItems[i].temp = changedDevices[j].temp;
                    sideBarItems[i].hum = changedDevices[j].hum;
                    if (content.type === 2) {
                      sideBarItems[i].temp = changedDevices[j].temp;
                      sideBarItems[i].hum = changedDevices[j].hum;
                    }
                  } else if (changedDevices[j].type === 3) {
                    sideBarItems[i].motion = changedDevices[j].motion;
                    if (content.type === 3) {
                      content.motion = changedDevices[j].motion;
                    }
                  }
                  sideBarItems[i].output = changedDevices[j].output;
                  content.output = changedDevices[j].output;
                  break;
                }
              }
            }
          }
          setFlag((flag) => flag + 1);
        }
      }
    }, 1000);

    return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  }, [content]);

  var email;
  // Forgot Password
  const forgotPass = (local_email) => {
    email = local_email;
    setSideBarItems([
      {
        title: "Forgot Password",
        icon: <PasswordIcon />,
        type: -6,
      },
    ]);
    setContent({
      title: "Forgot Password",
      icon: <PasswordIcon />,
      type: -6,
    });
  };

  // New Password
  const newPass = () => {
    setSideBarItems([
      {
        title: "New Password",
        icon: <PasswordIcon />,
        type: -7,
      },
    ]);
    setContent({
      title: "New Password",
      icon: <PasswordIcon />,
      type: -7,
    });
  };

  // Home Page
  const homePage = () => {
    setSideBarItems([
      {
        title: "Home",
        icon: <HomeIcon />,
        type: -1,
      },
      {
        title: "Signup/Login",
        icon: <LoginIcon />,
        type: -2,
      },
    ]);
    setContent(initContent);
  };

  return (
    <div className="App">
      <SideBar
        sideBarItems={sideBarItems}
        title={content.title}
        changeContent={changeContent}
      />
      <ContentDisplay
        content={content}
        flag={flag}
        changeContent={changeContent}
        onToggle={onToggle}
        onDelete={onDelete}
        addDevice={addDevice}
        login={login}
        register={register}
        username={username}
        forgotPass={forgotPass}
        newPass={newPass}
        email={email}
        homePage={homePage}
      />
    </div>
  );
}

export default App;
