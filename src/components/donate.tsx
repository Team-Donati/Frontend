import { ethers } from "ethers";
import React, { useState, useEffect } from "react";
import { useDonate } from "../hooks/useDonate";

const Donate = ({ fundraiserAddress, ethereum }: any) => {
  const [donateAmount, setDonateAmount] = useState("");

  const handleDonateAmountChange = (e: any) => {
    setDonateAmount(e.target.value.replace(/^0+(?!\.|$)/, ""));
  };

  const { donate } = useDonate(fundraiserAddress, donateAmount, ethereum);
  console.log(donateAmount);
  const handleDonateBtn = async (
    donateAmount: string,
    fundraiserAddress: string
  ) => {
    donate(ethers.utils.parseUnits(donateAmount, 18), fundraiserAddress);
  };

  return (
    <div>
      <div
        className="donate_btn"
        onClick={() => {
          handleDonateBtn(donateAmount, fundraiserAddress);
        }}
      ></div>
      <input
        type="number"
        id="donate_input"
        name="donate_input"
        placeholder="0.00"
        value={String(donateAmount)}
        onChange={handleDonateAmountChange}
      ></input>
    </div>
  );
};

export default Donate;
