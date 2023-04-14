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

  const addDevice = (type, name, id) => {
    let newDevice;
    if (type === 1) {
      let s1 = false,
        s2 = false,
        s3 = false,
        s4 = false;
      newDevice = {
        //jsx object
        title: name,
        icon: <ToggleOnIcon />,
        type: 1,
        id: id,
        switch1: s1,
        switch2: s2,
        switch3: s3,
        switch4: s4,
      };
    } else {
      let t = 0;
      newDevice = {
        //jsx object
        title: name,
        icon: <DeviceThermostatIcon />,
        type: 2,
        id: id,
        temp: t,
      };
    }
    let temp = sideBarItems;
    temp.splice(temp.length - 2, 0, newDevice);
    setSideBarItems(temp);
    setContent(sideBarItems[sideBarItems.length - 3]);

    // localStorage.setItem("todos", JSON.stringify(todos));// doesn't work as setContent doesn't do the job that fast (useEffect has to be used)
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
    const check = await fetch(
      "https://good-red-goshawk-wrap.cyclic.app/user/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
        },
        body: JSON.stringify({
          email: "sankalp@gmail.com",
          password: "12345",
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
    console.log(check);
    // on unsuccessful login
    if (check.output != undefined) {
      alert(check.output);
    } else {
      // on successful login
      setUsername(check.name);
      let devices = [];
      for (var i = 0; i < check.multi_device.length; i++) {
        devices.push({
          title: "Switch " + i,
          icon: <ToggleOnIcon />,
          type: 1,
          id: check.multi_device[i],
          switch1: true,
          switch2: false,
          switch3: false,
          switch4: true,
        });
      }
      for (var i = 0; i < check.single_device.length; i++) {
        devices.push({
          title: "Thermal " + i,
          icon: <DeviceThermostatIcon />,
          type: 2,
          id: check.single_device[i],
          temp: 30,
        });
      }
      setSideBarItems([
        {
          title: "Welcome",
          icon: <WavingHandIcon />,
          id: -3,
        },
        ...devices,
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
      "https://good-red-goshawk-wrap.cyclic.app/user/api",
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
