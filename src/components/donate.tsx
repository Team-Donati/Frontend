import React, { useState, useEffect } from "react";
import { useDonate } from "../hooks/useDonate";

const Donate = ({ fundraiserAddress, ethereum }: any) => {
  const [donateAmount, setDonateAmount] = useState("");

  const handleDonateAmountChange = (e: any) => {
    setDonateAmount(e.target.value.replace(/^0+(?!\.|$)/, ""));
  };

  const { donate } = useDonate(fundraiserAddress, donateAmount, ethereum);

  const handleDonateBtn = async (
    donateAmount: string,
    fundraiserAddress: string
  ) => {
    donate(donateAmount, fundraiserAddress);
  };

  return (
    <div>
      <div className="amount_inputbox_wrap">
        <input
          type="number"
          name="st_id"
          placeholder="0.00"
          className="amount_inputbox"
          value={donateAmount.toString()}
          onChange={handleDonateAmountChange}
          onKeyPress={(e) => !/[0-9|.]/.test(e.key) && e.preventDefault()}
        />
      </div>
      <button
        onClick={() => {
          handleDonateBtn(donateAmount, fundraiserAddress);
        }}
      >
        donate
      </button>
    </div>
  );
};

export default Donate;
