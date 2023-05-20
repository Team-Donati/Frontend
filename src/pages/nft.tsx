import React, { useState, useEffect } from "react";
import { useLetters } from "../hooks/useLetters";

const Nft = ({ currentAccount, provider }: any) => {
  const letterList = useLetters(currentAccount, provider);

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
          {
            letterList.map((val, key) => {
              return (
                  <div className="nft_letter">
                    <img src={val.letterUri}></img>
                  </div>
                )
              })
          }

        </div>

        <div className="homein"></div>
      </div>
    </div>
  );
};

export default Nft;
