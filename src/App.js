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
  var device_no = [1, 1, 1];
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
          username: content.username,
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
        if (sideBarItems[i].username !== content.username) {
          temp.push(sideBarItems[i]);
        }
      }
      setSideBarItems(temp);
      setContent(sideBarItems[0]);
    }
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
    console.log(data);
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
            title: "Switch " + device_no[0]++,
            icon: <ToggleOnIcon />,
            type: 1,
            switch1: device_details.status_1,
            switch2: device_details.status_2,
            switch3: device_details.status_3,
            switch4: device_details.status_4,
            username: username,
            output: device_details.output,
          },
          {
            title: "Temperature Sensor " + device_no[1]++,
            icon: <DeviceThermostatIcon />,
            type: 2,
            temp: device_details.status_temp,
            hum: device_details.status_hum,
            username: username,
            output: device_details.output,
          }
        );
      } else if (device_details.type === 2) {
        newDevices.push(
          {
            title: "Switch " + device_no[0]++,
            icon: <ToggleOnIcon />,
            type: 1,
            switch1: device_details.status_1,
            switch2: device_details.status_2,
            switch3: device_details.status_3,
            switch4: device_details.status_4,
            username: username,
            output: device_details.output,
          },
          {
            title: "Motion Sensor " + device_no[2]++,
            icon: <DirectionsRunIcon />,
            type: 3,
            motion: device_details.status_motion,
            username: username,
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
          username: content.username,
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
    // let i;
    // for (i = 1; i < sideBarItems.length - 1; i++) {
    //   if (sideBarItems[i].username === content.username) {
    //     sideBarItems[i] = content;
    //     break;
    //   }
    // }
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
            title: "Switch " + device_no[0]++,
            icon: <ToggleOnIcon />,
            type: 1,
            switch1: device_details.status_1,
            switch2: device_details.status_2,
            switch3: device_details.status_3,
            switch4: device_details.status_4,
            username: data.device_status[i],
            output: device_details.output,
          });
          devices.push({
            title: "Temperature Sensor " + device_no[1]++,
            icon: <DeviceThermostatIcon />,
            type: 2,
            temp: device_details.status_temp,
            hum: device_details.status_hum,
            username: data.device_status[i],
            output: device_details.output,
          });
        } else if (device_details.type === 2) {
          devices.push({
            title: "Switch " + device_no[0]++,
            icon: <ToggleOnIcon />,
            type: 1,
            switch1: device_details.status_1,
            switch2: device_details.status_2,
            switch3: device_details.status_3,
            switch4: device_details.status_4,
            username: data.device_status[i],
            output: device_details.output,
          });
          devices.push({
            title: "Motion Sensor " + device_no[2]++,
            icon: <DirectionsRunIcon />,
            type: 3,
            motion: device_details.status_motion,
            username: data.device_status[i],
            output: device_details.output,
          });
        }
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

  useEffect(() => {
    const interval = setInterval(() => {
      console.log("Logs every minute");
    }, 1000);

    return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  }, []);

  return (
    <div className="App">
      <SideBar
        sideBarItems={sideBarItems}
        title={content.title}
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
