import { useState, useEffect, useCallback } from "react";
import { BigNumberish, ethers } from "ethers";
import donaFT_abi from "../abis/DonaFT.json";

export const useWrite = (nftAddess: string, content: string) => {
  const signer = new ethers.providers.Web3Provider(
    window.ethereum,
    "any"
  ).getSigner();
  const write = useCallback(
    async (content: string) => {
      const donaFT = new ethers.Contract(nftAddess, donaFT_abi.abi, signer);

      try {
        const writeTx = await donaFT.updateLetter(content);
        console.log(writeTx);

        const receipt = await writeTx.wait();
        console.log(!!receipt.blockHash ? "success" : "error");
      } catch (e) {
        console.log(e);
      }
    },
    [nftAddess, nftAddess, signer]
  );

  return { write };
};
