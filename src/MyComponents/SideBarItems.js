import React from "react";
import "../App.css";

export default function SideBarItems({ sideBarItem, title, changeContent }) {
  return (
    <li
      className="row"
      id={title === sideBarItem.title ? "active" : ""}
      onClick={() => changeContent(sideBarItem)}
    >
      <div id="icon">{sideBarItem.icon}</div>
      <div id="title">{sideBarItem.title}</div>
    </li>
  );
}
