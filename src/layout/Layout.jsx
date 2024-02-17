import * as React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import NavigationBar from "./NavigationBar"
import "../assets/css/rootStyle.scss"

function Layout() {
  return (
    <>
      <NavigationBar />
      <div id="page-container">
        <div className="body">
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Layout;
