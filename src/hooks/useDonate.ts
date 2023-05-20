import { useState, useEffect, useCallback } from "react";
import { BigNumberish, ethers } from "ethers";
import fundraiser_abi from "../abis/Fundraiser.json";

export const useDonate = (
  fundRaiserAddress: string,
  donateAmount: string,
  ethereum: Window["ethereum"]
) => {
  // const runner =

  const signer = new ethers.providers.Web3Provider(
    window.ethereum,
    "any"
  ).getSigner();
  const donate = useCallback(
    async (donateAmount: any, fundRaiserAddress: any) => {
      console.log(fundRaiserAddress);
      const fundraiser = new ethers.Contract(
        fundRaiserAddress,
        fundraiser_abi.abi,
        signer
      );

      try {
        const donateTx = await fundraiser.donate({ value: donateAmount }); // donateAmount in Eth, string
        console.log(donateTx);

        const receipt = await donateTx.wait();
        console.log(!!receipt.blockHash ? "success" : "error");
      } catch (e) {
        console.log(e);
      }
    },
    [donateAmount, fundRaiserAddress, signer]
  );

  return { donate };
};
