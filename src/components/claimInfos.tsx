import React, { useState, useEffect } from "react";
import { useClaimInfoes } from "../hooks/useClaimInfoes";

const ClaimInfos = ({ currentAccount, provider }: any) => {
  const claimList = useClaimInfoes(currentAccount, provider);

  console.log("alkdjfkladsjf", claimList);
  return <div>ming...</div>;
};

export default ClaimInfos;
