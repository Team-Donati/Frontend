import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const NftDetail = () => {
  let { tokenId } = useParams();
  return <div>nft page</div>;
};

export default NftDetail;
