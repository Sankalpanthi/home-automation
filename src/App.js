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

import React, { useEffect, useState } from "react";

function App() {
  const [sideBarItems, setSideBarItems] = useState([
    {
      title: "Home",
      icon: <HomeIcon />,
      id: -1,
    },
    {
      title: "Signup/Login",
      icon: <LoginIcon />,
      id: -2,
    },
  ]);
  const initContent = {
    title: "Home",
    icon: <HomeIcon />,
    id: -1,
  };
  const [content, setContent] = useState(initContent);
  const [username, setUsername] = useState("");

  const changeContent = (sideBarItem) => {
    if (sideBarItem.id === -5) {
      // for logout
      if (window.confirm("Are you sure you wish to logout?")) {
        setSideBarItems([
          {
            title: "Home",
            icon: <HomeIcon />,
            id: -1,
          },
          {
            title: "Signup/Login",
            icon: <LoginIcon />,
            id: -2,
          },
        ]);
        setContent(initContent);
      }
    } else {
      setContent(sideBarItem);
    }
  };

  const onDelete = (content) => {
    setSideBarItems(
      sideBarItems.filter((e) => {
        return e !== content;
      })
    );
    setContent(sideBarItems[0]);
  };

  const addDevice = async (username, pass) => {
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
          username: username,
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
    if (data != "device added to db") {
      alert(data);
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
            username: username,
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
    }
    // let temp = sideBarItems;
    // temp.splice(temp.length - 2, 0, newDevice);
    // setSideBarItems(temp);
    // setContent(sideBarItems[sideBarItems.length - 3]);
  };

  const onToggle = (switch_number) => {
    if (switch_number === 1) {
      content.switch1 = !content.switch1;
    } else if (switch_number === 2) {
      content.switch2 = !content.switch2;
    } else if (switch_number === 3) {
      content.switch3 = !content.switch3;
    } else {
      content.switch4 = !content.switch4;
    }
    let i;
    for (i = 1; i < sideBarItems.length - 1; i++) {
      if (sideBarItems[i].id === content.id) {
        sideBarItems[i] = content;
        break;
      }
    }
  };

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
      setUsername("Sankalp");
      console.log(data.device_status);
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
        console.log(device_details);
        // devices.push({
        // title: "Switch " + (i + 1),
        // icon: <ToggleOnIcon />,
        // type: 1,
        // id: "m" + check.multi_device[i],
        // switch1: true,
        // switch2: false,
        // switch3: false,
        // switch4: true,
        // });
      }
      setSideBarItems([
        {
          title: "Welcome",
          icon: <WavingHandIcon />,
          id: -3,
        },
        ...devices,
        {
          title: "Switchboard 1",
          icon: <ToggleOnIcon />,
          type: 1,
          id: 80,
          switch1: true,
          switch2: false,
          switch3: false,
          switch4: true,
        },
        {
          title: "Temperature Sensor 1",
          icon: <DeviceThermostatIcon />,
          type: 2,
          id: 88,
          temp: 23,
        },
        {
          title: "Temperature Sensor 2",
          icon: <DeviceThermostatIcon />,
          type: 2,
          id: 84,
          temp: 23,
        },
        {
          title: "Motion Sensor 1",
          icon: <DirectionsRunIcon />,
          type: 3,
          id: 43,
          temp: 23,
        },
        {
          title: "Add Device",
          icon: <AddCircleOutlineIcon />,
          id: -4,
        },
        {
          title: "Logout",
          icon: <LogoutIcon />,
          id: -5,
        },
      ]);
      setContent({
        title: "Welcome",
        icon: <WavingHandIcon />,
        id: -3,
      });
    }
  };

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
          id: -3,
        },
        {
          title: "Add Device",
          icon: <AddCircleOutlineIcon />,
          id: -4,
        },
        {
          title: "Logout",
          icon: <LogoutIcon />,
          id: -5,
        },
      ]);
      setContent({
        title: "Welcome",
        icon: <WavingHandIcon />,
        id: -3,
      });
    }
  };

  // useEffect(() => {
  //   const updateContent = () => {
  //     console.log("content updated");
  //   };

  //   if (content.id > 0) {
  //     updateContent();
  //   }
  // }, [content]);

  return (
    <div className="App">
      <SideBar
        sideBarItems={sideBarItems}
        id={content.id}
        changeContent={changeContent}
      />
      <ContentDisplay
        content={content}
        changeContent={changeContent}
        onToggle={onToggle}
        onDelete={onDelete}
        addDevice={addDevice}
        login={login}
        register={register}
        username={username}
      />
    </div>
  );
}

export default App;
