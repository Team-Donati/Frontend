import React, { useState, useEffect } from "react";
import { useLetters } from "../hooks/useLetters";
import { Link } from "react-router-dom";

const Nft = ({ currentAccount, provider }: any) => {
  const letterList = useLetters(currentAccount, provider);

  return (
    // <Letters currentAccount={currentAccount} provider={provider}></Letters>
    <div id="mainwrap">
      <div className="main">
        <div className="blank"></div>
        <Link to="/">
          <div className="depth_nav"></div>
        </Link>
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
