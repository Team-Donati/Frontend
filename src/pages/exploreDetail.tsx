import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Donate from "../components/donate";
import { Link } from "react-router-dom";
import "./main.css";

const ExploreDetail = (ethereum: any) => {
  const { fundraiseId } = useParams();
  console.log("ccccc");
  return (
    <div id="mainwrap">
      <div className="main">
        <Link to="/explore">
          <div className="exploredetail_back"></div>
        </Link>
        <div className="exploredetail_img"></div>
        <Donate fundraiserAddress={fundraiseId} ethereum={ethereum} />
      </div>
    </div>
  );
};

export default ExploreDetail;
