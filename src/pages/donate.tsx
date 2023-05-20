import React, { useState, useEffect } from "react";
import ClaimInfos from "../components/claimInfos";

const Donate = ({ currentAccount, provider }: any) => {
  console.log("check", currentAccount);
  return (
    <div>
      donate page
      <ClaimInfos currentAccout={currentAccount} provider={provider} />
    </div>
  );
};

export default Donate;
