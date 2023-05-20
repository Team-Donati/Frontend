import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { Buffer } from 'buffer';
import axios from "axios";


import abi from "../abi/Forwarder.json"


const Claim = () => {

  const signTx = async () => {
    const FUNDRAISER_ABI=[
      "function claim(uint _amount, address _whitelistAddr) external"
    ]
    const provider = new ethers.providers.JsonRpcProvider(process.env.REACT_APP_DEVNET_RPC_URL)
    const trustedForwarderAddress = process.env.REACT_APP_TRUSTED_FORWARDER_CONTRACT_ADDRESS
    const relayerEOA = new ethers.Wallet(process.env.REACT_APP_HEX_ENCODED_PRIVATE_KEY || "", provider);
    // console.log(relayerEOA);
    const trustedForwarderContract = new ethers.Contract(trustedForwarderAddress || "", abi.abi, provider);
  
    const nonce = Number(await trustedForwarderContract.getNonce(process.env.REACT_APP_MY_WALLET_EVM_ADDRESS));
    console.log(nonce);
    
    let callData = new ethers.utils.Interface(FUNDRAISER_ABI).encodeFunctionData("claim", [ethers.utils.parseEther("1.0"),"0x1234567890123456789012345678901234567890"]);
    console.log(callData);


    const {chainId} = await provider.getNetwork();
    const estimateGas = '4000000';
    const primaryType = 'Message';

    const domain = {
      name: 'TrustedForwarder',
      version: '0.0.1',
      chainId: chainId,
      verifyingContract: trustedForwarderAddress,
    }
    
    const types = {
      Message: [
          { name: 'from', type: 'address' },
          { name: 'to', type: 'address' },
          { name: 'value', type: 'uint256' },
          { name: 'gas', type: 'uint256' },
          { name: 'nonce', type: 'uint256' },
          { name: 'data', type: 'bytes' },
          { name: 'validUntilTime', type: 'uint256' },
          { name: 'ABCDEFGHIJKLMNOPQRSTGSN', type: 'bytes32'},
      ]
    };
    
    const preForwardData = {
      from: process.env.REACT_APP_MY_WALLET_EVM_ADDRESS,
      to: process.env.REACT_APP_FUNDRAISER_CONTRACT_ADDRESS,
      data: callData,
      value: String('0x0')
    }
    const forwardData = {
      ...preForwardData,
      domain: domain,
      types: types,
      gas: '10000000',
      nonce: nonce,
      primaryType: primaryType,
      value: preForwardData.value ?? '0x0',
      validUntilTime: String('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'),
      ABCDEFGHIJKLMNOPQRSTGSN: Buffer.from(process.env.REACT_APP_TYPE_SUFFIX_DATA||'', 'utf8')
    }
    // const types = {
    //   EIP712Domain: [
    //     {name: 'name', type: 'string' },
    //     {name: 'version', type: 'string' },
    //     {name: 'chainId', type: 'uint256' },
    //     {name: 'verifyingContract', type: 'address' },
    // ],
    //   Message: [
    //       { name: 'from', type: 'address' },
    //       { name: 'to', type: 'address' },
    //       { name: 'value', type: 'uint256' },
    //       { name: 'gas', type: 'uint256' },
    //       { name: 'nonce', type: 'uint256' },
    //       { name: 'data', type: 'bytes' },
    //       { name: 'validUntilTime', type: 'uint256' },
    //       { name: 'ABCDEFGHIJKLMNOPQRSTGSN', type: 'bytes32'},
    //   ]
    // };
    //   const preForwardData = {
      //     data: callData,
      //     from: process.env.REACT_APP_MY_WALLET_EVM_ADDRESS,
      //     gas: '10000000',
    //     nonce: nonce,
    //     to: process.env.REACT_APP_FUNDRAISER_CONTRACT_ADDRESS,
    //     validUntilTime: String('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'),
    //     value: String('0x0')
    //   }
    // const forwardData = {
    //   domain,
    //   types,
    //   primaryType,
    //   message: {
    //     ...preForwardData,
    //     ABCDEFGHIJKLMNOPQRSTGSN: Buffer.from(process.env.REACT_APP_TYPE_SUFFIX_DATA||'', 'utf8')
    //   }
    // }

    // const signerWallet = new ethers.Wallet(process.env.REACT_APP_HEX_ENCODED_PRIVATE_KEY || "", provider);
    const metamaskProvider = new ethers.providers.Web3Provider(window.ethereum);
    const signerWallet = metamaskProvider.getSigner();
    const signature = await signerWallet._signTypedData(domain, types, forwardData);
    const expectedSignerAddress = await signerWallet.getAddress();
    const recoveredAddress = ethers.utils.verifyTypedData(domain, types, forwardData, signature);
    console.log(recoveredAddress === expectedSignerAddress);
    // const tx = await trustedForwarderContract.connect(signerWallet).execute(forwardData, signature, {});
    // console.log(tx, 'tx');

    const forwardRequest = {
      domain,
      types,
      primaryType,
      forwardData
    };

    const relayTx = {
      forwardRequest: forwardRequest,
      metadata: {
        signature: signature.substring(2)
      }
    };

    const hexRawTx = '0x' + Buffer.from(JSON.stringify(relayTx)).toString('hex');
    console.log(hexRawTx)

    // const xhr = new XMLHttpRequest();
    // xhr.open("POST", "http://gasrelay-202305-38hlg2-nlb-4deb54783e33031b.elb.ap-northeast-2.amazonaws.com:9876/rpc-sync" || "");    
    // xhr.setRequestHeader("Content-Type", "application/json");
    // // xhr.setRequestHeader("X-Requested-With","XMLHttpRequest");
    // xhr.withCredentials = true;
    // // xhr.setRequestHeader("Access-Control-Allow-Origin","http://geojsonlint.com/");
    // // xhr.setRequestHeader("Accept","application/json");
    // console.log("here")
    // xhr.send(JSON.stringify({"jsonrpc": "2.0", "method": "eth_sendRawTransaction", "params": [hexRawTx], "id": 1}));

    const response = await axios.post('/api',
    {"jsonrpc": "2.0", "method": "eth_sendRawTransaction", "params": [hexRawTx], "id": 1}, 
    {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
    })
    console.log(response.data.result)
  }

  return (
    <div>
      Calim page // sign
      <button onClick={signTx}> claim</button>
    </div>
  );
};

export default Claim;
