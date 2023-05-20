import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Claim = () => {
  let { fundraiseId } = useParams();

  const signTx = () => {
    // tx sign logic here
  };
  return (
    <div>
      Calim page // sign
      <button onClick={signTx}> claim</button>
    </div>
  );
};

export default Claim;
