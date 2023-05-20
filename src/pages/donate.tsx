import React, { useState, useEffect } from "react";
import ClaimInfos from "../components/claimInfos";

const Donate = ({ currentAccount, provider }: any) => {
  return (
    <div>
      donate page
      <ClaimInfos currentAccount={currentAccount} provider={provider} />
    </div>
  );
};

export default Donate;
