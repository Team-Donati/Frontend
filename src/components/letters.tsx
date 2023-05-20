import React, { useState, useEffect } from "react";
import { useLetters } from "../hooks/useLetters";

const Letters = ({ currentAccount, provider }: any) => {
  const letterList = useLetters(currentAccount, provider);

  console.log("letter lists", letterList);
  return (
    <>
      <div>
        Letters
      </div>
      <div>
        {currentAccount}
      </div>
    </>
  );
};

export default Letters;
