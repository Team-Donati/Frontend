import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./main.css";
const Explore = () => {
  return (
    <div id="mainwrap">
      <div className="main">
        <div className="blank"></div>
        <Link to="/">
          <div className="depth_nav"></div>
        </Link>
        <Link to="/explore/0x9009c2253D2041Ee450F085f918B844b4E638b11">
          <div className="explore_full_btn"></div>
        </Link>
      </div>
    </div>
  );
};

export default Explore;
