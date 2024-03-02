import React, { useState } from "react";
import "./Dashboard.scss";
import Categories from "./Categories/Categories";
import Courts from "./Courts/Courts";

function DashboardPage() {
 return (
    <div className="dashboard-container">
      <div className="dashboard-page">
        <div className="box box-1"><Categories/></div>
        <div className="box box-2"><Courts/></div>
        <div className="box box-3">Content for box 3</div>
        <div className="box box-4"><Categories/></div>
        <div className="box box-5">Content for box 5</div>
        <div className="box box-6"><Categories/></div>
        <div className="box box-7">Content for box 7</div>
        <div className="box box-8"><Categories/></div>
      </div>
    </div>
  );
}

export default DashboardPage;
