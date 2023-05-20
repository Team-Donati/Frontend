import * as dotenv from "dotenv";

import React, { useState, useEffect } from "react";
import factory_abi from "../abis/Factory.json";
import donaFT_abi from "../abis/DonaFT.json";
import fundraiser_abi from "../abis/Fundraiser.json";
import { ethers } from "ethers";

export const useClaimInfoes = (currentAccount: any, provider: any) => {
  const [claimInfos, setClaimInfoes] = useState([]);

  const GetClaimInfoes = async (currentAccount: any) => {
    // currentAddress가 기부한 contract 내역 불러옴
    const factoryAddr: string = process.env.REACT_APP_FACTORY_ADDRESS || "";
    if (currentAccount != undefined) {
      console.log("alskdfj;akldjfal", typeof currentAccount);

      const factory = new ethers.Contract(
        factoryAddr,
        factory_abi.abi,
        provider
      );

      // nft 기부자 list들 불러오기
      const nftList = await factory.getAllNfts();
      const fundList = await factory.getAllFundraisers();

      // 해당 contract 내역대로 tx 불러옴
      for (const idx in nftList) {
        const donaft = new ethers.Contract(
          nftList[idx],
          donaFT_abi.abi,
          provider
        );

        const fundraiser = new ethers.Contract(
          fundList[idx],
          fundraiser_abi.abi,
          provider
        );

        console.log(await fundraiser.isDepositor(currentAccount));
      }

      // // 그 다음 transaction 집어넣기
      for (const idx in nftList) {
        const donaft = new ethers.Contract(
          nftList[idx],
          donaFT_abi.abi,
          provider
        );

        const fundraiser = new ethers.Contract(
          fundList[idx],
          fundraiser_abi.abi,
          provider
        );

        console.log(await fundraiser.isDepositor(currentAccount));
      }
    } else {
      console.log("notfound");
    }
  };

  useEffect(() => {
    GetClaimInfoes(currentAccount);
  }, [currentAccount]);

  return claimInfos;
};
