import React, { useState, useEffect } from "react";
import ClaimInfos from "../components/claimInfos";

const Letter = () => {
  return (
    <div id="mainwrap">
      <div className="main">
        <div className="blank"></div>
        <a href="http://localhost:3000">
          <div className="depth_nav"></div>
        </a>
        <div className="letter_send_img"></div>
        <input
          type="text"
          id="letter_input"
          name="letter_input"
          placeholder="To. my donor,"
        ></input>
      </div>
    </div>
  );
};

export default Letter;
