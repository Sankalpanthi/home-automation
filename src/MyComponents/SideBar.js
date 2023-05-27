import React from "react";
import "../App.css";
// import logo from "../../public/home-automation-logo1.jpg"
import SideBarItems from "./SideBarItems";

export default function SideBar(props) {
  return (
    <div className="sidebar">
      <div className="logo">
        <img
          src="/Images/home-automation-logo1.jpg"
          className="logo-img"
          alt="logo"
        />
      </div>
      <ul className="list">
        {props.sideBarItems.map((sideBarItem, key) => {
          return (
            <SideBarItems
              sideBarItem={sideBarItem}
              title={props.title}
              changeContent={props.changeContent}
              key={key}
            />
          );
        })}
      </ul>
    </div>
  );
}
