import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";

const GenerateCode = () => {
  const baseURL = "http://localhost:3000/";
  const { address, amount } = useParams();
  const url = baseURL + address + "/" + amount;

  const qrcode = (
    <QRCodeCanvas
      id="qrCode"
      value={url}
      size={300}
      bgColor={"#00ff00"}
      level={"H"}
    />
  );
  return (
    <div className="qrcode__container">
      <div>{qrcode}</div>
    </div>
  );
};
export default GenerateCode;
