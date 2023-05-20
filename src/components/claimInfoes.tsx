import React, { useState, useEffect } from "react";
import { useClaimInfoes } from "../hooks/useClaimInfoes";

const ClaimInfoes = ({ currentAccount, provider }: any) => {
  const claimList = useClaimInfoes(currentAccount, provider);
  console.log("ssibal....", claimList);
  return (
    <div>
        ming...
    </div>
  );
};

export default ClaimInfoes;
