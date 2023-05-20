import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Donate from "../components/donate";

const ExploreDetail = (ethereum: any) => {
  const { fundraiseId } = useParams();

  return (
    <div>
      funraiser detail page
      <Donate fundraiserAddress={String(fundraiseId)} ethereum={ethereum} />
    </div>
  );
};

export default ExploreDetail;
