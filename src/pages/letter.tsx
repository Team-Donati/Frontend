import React, { useState, useEffect } from "react";
import Write from "../components/write";

const Letter = () => {
  return (
    <div id="mainwrap">
      <div className="main">
        <div className="blank"></div>
        <a href="http://localhost:3000">
          <div className="depth_nav"></div>
        </a>
        <Write />
        <div className="send_btn"></div>
      </div>
    </div>
  );
};

export default Letter;
