import React from "react";
import "../App.css";
// import logo from "../../public/home-automation-logo1.jpg"
import SideBarItems from "./SideBarItems";

export default function SideBar(props) {
  return (
    <div className="sidebar">
      <a className="logo">
        <img
          src="/Images/home-automation-logo1.jpg"
          className="logo-img"
          alt="logo"
        />
      </a>
      <ul className="list">
        {props.sideBarItems.map((sideBarItem, key) => {
          return (
            <SideBarItems
              sideBarItem={sideBarItem}
              id={props.id}
              changeContent={props.changeContent}
              key={key}
            />
          );
        })}
      </ul>
    </div>
  );
}
