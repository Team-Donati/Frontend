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
    const trustedForwarderContract = new ethers.Contract(trustedForwarderAddress || "", abi.abi, provider);
  
    const nonce = Number(await trustedForwarderContract.getNonce(process.env.REACT_APP_MY_WALLET_EVM_ADDRESS));
    console.log(nonce);
    
    let callData = new ethers.utils.Interface(FUNDRAISER_ABI).encodeFunctionData("claim", [ethers.utils.parseEther("1.0"),"0xc9bA91B43E12Bf65ABe14B7E903f029f26D8A00e"]);
    console.log(callData);


    const {chainId} = await provider.getNetwork();
    const estimateGas = '4000000';
    const primaryType = 'Message';

    const domain = {
      name: process.env.REACT_APP_DOMAIN_NAME,
      version: process.env.REACT_APP_DOMAIN_VERSION,
      chainId: ethers.utils.hexlify(chainId),
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
      value: String('0x0'),
      gas: ethers.utils.hexlify(4000000),
      nonce: ethers.utils.hexlify(nonce),
      data: callData,
      validUntilTime: String('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'),
    }
    const forwardData = {
      domain: domain,
      types : types,
      primaryType : primaryType,
        ...preForwardData,
        ABCDEFGHIJKLMNOPQRSTGSN: Buffer.from(process.env.REACT_APP_TYPE_SUFFIX_DATA||'', 'utf8')
    }
    console.log(forwardData);
    const metamaskProvider = new ethers.providers.Web3Provider(window.ethereum);
    const signerWallet = metamaskProvider.getSigner();
    const signature = await signerWallet._signTypedData(domain, types, forwardData);
    console.log(123)
    const expectedSignerAddress = await signerWallet.getAddress();
    const recoveredAddress = ethers.utils.verifyTypedData(domain, types, forwardData, signature);
    console.log(recoveredAddress === expectedSignerAddress);

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
