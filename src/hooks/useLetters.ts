import * as dotenv from "dotenv";

import React, { useState, useEffect } from "react";
import factory_abi from "../abis/Factory.json";
import donaFT_abi from "../abis/DonaFT.json";
import fundraiser_abi from "../abis/Fundraiser.json";
import { ethers } from "ethers";
import { Buffer } from "buffer";

export const useLetters = (currentAccount: any, provider: any) => {

  interface nftInfo {
    name: string;
    writer: string;
    letterUri: string;
  }

  const [letterInfos, setLetterInfos] = useState<nftInfo[]>([]);
  const [svgDataMing, setMing] = useState("");

  const GetLetters = async (currentAccount: any) => {

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
      
      // list 순회하면서 기부자의 nft 확인
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
        // 만약, depositor가 맞다면 -> nft 데이터 가져옴
        if(await fundraiser.isDepositor(currentAccount) == true) {
            // nft 이름
            const letterName = await donaft.name();
            const writerName = (await donaft.writer()).writerName;

            // letter svg 정보
            const letterNum = await fundraiser.getTokenId(currentAccount);
            const svgData = await donaft.tokenURI(letterNum);

            console.log("svgData", svgData);
            
            resultInfos.push({
                "name": letterName,
                "writer": writerName,
                "letterUri": svgData
            })
        }
      }

      console.log("nft infoes: ", resultInfos);
      setLetterInfos(resultInfos);
    } else {
      console.log("notfound");
    }
  };

  useEffect(() => {
    GetLetters(currentAccount);
  }, [currentAccount]);

  return svgDataMing;
};
