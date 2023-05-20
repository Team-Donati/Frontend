import React, { useState, useEffect } from "react";
import Letters from "../components/letters";

const Nft = ({ currentAccount, provider }: any) => {
  return (
    // <Letters currentAccount={currentAccount} provider={provider}></Letters>
    <div id="mainwrap">
      <div className="main">
        <div className="blank"></div>
        <a href="http://localhost:3000">
          <div className="depth_nav"></div>
        </a>
        <div className="nft_filter"></div>
        <div className="nft_letter_wrap">
          <div className="nft_letter"></div>
        </div>

        <div className="homein"></div>
      </div>
    </div>
  );
};

export default Nft;
