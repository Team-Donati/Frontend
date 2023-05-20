import React, { useState, useEffect } from "react";
import Write from "../components/write";
import { Link } from "react-router-dom";

const Letter = () => {
  return (
    <div id="mainwrap">
      <div className="main">
        <div className="blank"></div>
        <Link to="/">
          <div className="depth_nav"></div>
        </Link>
        <Write />
      </div>
    </div>
  );
};

export default Letter;
