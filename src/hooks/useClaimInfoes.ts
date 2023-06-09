import * as dotenv from "dotenv";

import React, { useState, useEffect } from "react";
import factory_abi from "../abis/Factory.json";
import donaFT_abi from "../abis/DonaFT.json";
import fundraiser_abi from "../abis/Fundraiser.json";
import { ethers } from "ethers";

export const useClaimInfos = (currentAccount: any, provider: any) => {
  interface calimInfo {
    name: string;
    whitelist: string;
    time: number;
    amount: string;
  }

  const [claimInfos, setClaimInfos] = useState<calimInfo[]>([]);

  const GetClaimInfos = async (currentAccount: any) => {
    // currentAddress가 기부한 contract 내역 불러옴
    const factoryAddr: string = process.env.REACT_APP_FACTORY_ADDRESS || "";
    if (currentAccount != undefined) {

      const factory = new ethers.Contract(
        factoryAddr,
        factory_abi.abi,
        provider
      );

      const resultInfos = [];

      // nft 기부자 list들 불러오기
      const nftList = await factory.getAllNfts();
      const fundList = await factory.getAllFundraisers();

      // 순회하면서 기부자 내역 확인
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

        // 만약, depositor가 맞다면 -> 해당 유저의 claim log 가져옴
        if(await fundraiser.isDepositor(currentAccount) == true) {
          const claimFilter = {
            fromBlock: 10,
            toBlock: 'latest',
            address: fundList[idx],
            topics: [ // Claimed event
              "0x2f6639d24651730c7bf57c95ddbf96d66d11477e4ec626876f92c22e5f365e68",
            ]
          };

          const logs = await provider.getLogs(claimFilter);
          const writerName = (await donaft.writer()).writerName;

          for (let l = 0; l<logs.length; l++) {
            resultInfos.push({
              "name": writerName,
              "whitelist": '0x'+logs[l].topics[2].slice(26),
              "time": parseInt(logs[l].topics[3], 16),
              "amount": ethers.utils.formatEther((ethers.utils.defaultAbiCoder.decode(['uint'], logs[l].data)).toString())
            })
          }
        }
      }

      console.log("claim infos: ", resultInfos);
      setClaimInfos(resultInfos);
    } else {
      console.log("notfound");
    }
  };

  useEffect(() => {
    GetClaimInfos(currentAccount);
  }, [currentAccount]);

  return claimInfos;
};
