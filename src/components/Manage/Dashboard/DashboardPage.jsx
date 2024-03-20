import React from "react";
import "./Dashboard.scss";
import Categories from "./Categories/Categories";
import Courts from "./Courts/Courts";
import Member from "./User/User";
import VinSlot from "./Vinslot/VinSlot";
import Club from "./Club/Club";
import Event from "./EventBox/Event";
import Areas from "./Areas/Areas";
import Post from "./PostBox/Post";
import Roles from "./Roles/Roles";


function DashboardPage() {
 return (
    <div className="dashboard-container">
      <div className="dashboard-page">
        <div className="box box-1"><Member/></div>
        <div className="box box-2"><Courts/></div>
        <div className="box box-3"><VinSlot/></div>
        <div className="box box-4"><Categories/></div>
        <div className="box box-5"><Club/></div>
        <div className="box box-6"><Event/></div>
        <div className="box box-7"><Areas/></div>
        <div className="box box-8"><Post/></div>
        <div className="box box-9"><Roles/></div>
      </div>
    </div>
  );
}

export default DashboardPage;
