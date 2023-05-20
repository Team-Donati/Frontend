import React, { useState, useEffect } from "react";

const Claim = () => {
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
