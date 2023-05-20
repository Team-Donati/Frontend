import React, { useState, useEffect } from "react";
import { useClaimInfos } from "../hooks/useClaimInfoes";

const ClaimInfos = ({ currentAccount, provider }: any) => {
  const claimList = useClaimInfos(currentAccount, provider);

  console.log("claim lists", claimList);
  return (
    <>
    {
      claimList.map((val, key) => {
        return (
          <div>
            <p>{val.name}</p>
            <p>{val.whitelist}</p>
            <p>{val.amount} AVAX</p>
            <p>{val.time}</p>
          </div>
        )
      })
    }
    </>
  );
};

export default ClaimInfos;
