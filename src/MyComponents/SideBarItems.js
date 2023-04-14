import React from "react";
import "../App.css";

export default function SideBarItems({ sideBarItem, id, changeContent }) {
  return (
    <li
      className="row"
      id={id === sideBarItem.id ? "active" : ""}
      onClick={() => changeContent(sideBarItem)}
    >
      <div id="icon">{sideBarItem.icon}</div>
      <div id="title">{sideBarItem.title}</div>
    </li>
  );
}
