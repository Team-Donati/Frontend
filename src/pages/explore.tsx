import React, { useState, useEffect } from "react";
import "./main.css";
const Explore = () => {
  return (
    <div id="mainwrap">
      <div className="main">
        <div className="blank"></div>
        <div className="depth_nav"></div>
        <div className="position_banner"></div>
        <a href="http://localhost:3000/explore">
          <div className="explore_btn"></div>
        </a>
        <div className="explore_menu"></div>
        <a href="http://localhost:3000/explore">
          <div className="explore_banner"></div>
        </a>
        <div className="explore_banner"></div>
        <div className="explore_banner"></div>

        <div className="homein"></div>
      </div>
    </div>
  );
};

export default Explore;
