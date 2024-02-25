import React from "react";
import Sidebar from "../../layout/SideBar";
import { Outlet } from "react-router-dom";

export default function Manage() {
  return (
    <div style={{ display: "flex", height:"100%" }}>
      <Sidebar />
      <div id="page-container" style={{ flex: 1 }}>
        <div className="body">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
