import React, { useState, useEffect } from "react";

const ConnectButton = ({ connectWallet }: any) => {
  return (
    <div>
      <button onClick={connectWallet}> click</button>
    </div>
  );
};

export default ConnectButton;
