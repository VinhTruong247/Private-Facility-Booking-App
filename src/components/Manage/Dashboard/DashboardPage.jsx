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
        <div className="box box-10">Content for box 10</div>
        <div className="box box-11">Content for box 11</div>
        <div className="box box-12">Content for box 12</div>
        <div className="box box-13">Content for box 13</div>
        <div className="box box-14">Content for box 14</div>
        <div className="box box-15">Content for box 15</div>
      </div>
    </div>
  );
}

export default DashboardPage;
