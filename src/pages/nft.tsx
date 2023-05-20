import React, { useState, useEffect } from "react";
import Letters from "../components/letters";

const Nft = ({ currentAccount, provider }: any) => {

  return (
    <>
      <div>nft page</div>
      <div>address: {currentAccount}</div>
      <Letters currentAccount={currentAccount} provider={provider}></Letters>
    </>
  );
};

export default Nft;
