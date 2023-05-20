import React, { useState, useEffect } from "react";
import "./main.css";
const Explore = () => {
  return (
    <div id="mainwrap">
      <div className="main">
        <div className="blank"></div>
        <a href="http://localhost:3000">
          <div className="depth_nav"></div>
        </a>
        <a href="http://localhost:3000/explore/1">
          <div className="explore_full_btn"></div>
        </a>
      </div>
    </div>
  );
};

export default Explore;
