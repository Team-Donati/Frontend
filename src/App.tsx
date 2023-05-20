import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import logo from "./logo.svg";

import "./App.css";
import { ethers } from "ethers";
import ConnectButton from "./components/connectButton";

import Donate from "./pages/donate";
import Explore from "./pages/explore";
import Nft from "./pages/nft";
import Home from "./pages/home";
import Claim from "./pages/claim";
import ExploreDetail from "./pages/exploreDetail";
import GenerateCode from "./pages/generateCode";

type Network = {
  name: string;
  id: string;
};

function App() {
  const [mmInstalled, setMMInstalled] = useState(false);
  const [currentAccount, setCurrentAccount] = useState<any>();
  const [correctNetwork, setCorrectNetwork] = useState(true);

  const { ethereum } = window;
  const [donati_provider, setDonatiProvider] = useState(
    new ethers.providers.JsonRpcProvider(
      process.env.REACT_APP_DEVNET_RPC_URL || ""
    )
  );

  const targetNetwork: Network = {
    name: process.env.REACT_APP_NETWORK_NAME || "",
    id: process.env.REACT_APP_NETWORK_ID || "",
  };

  const listenMMAccount = async () => {
    if (mmInstalled) {
      ethereum.on("accountsChanged", async function () {
        const accounts = await ethereum.request({ method: "eth_accounts" });
        const account = [...accounts].pop();
        setCurrentAccount(account);
        console.log("found new account : ", account);
      });
    }
  };

  const listenMMNetwork = async () => {
    if (mmInstalled) {
      ethereum.on("networkChanged", function () {
        checkCorrectNetwork();
      });
    }
  };

  const checkIfWalletIsConnected = async () => {
    if (ethereum) {
      setMMInstalled(true);
    } else {
      console.log("No Wallet found. Connect Wallet");
      return;
    }
    const accounts = await ethereum.request({ method: "eth_accounts" });

    if (accounts.length !== 0) {
      console.log("Found authorized Account: ", accounts[0]);
      console.log(process.env.REACT_APP_NETWORK_ID);
      setCurrentAccount(accounts[0]);
      checkCorrectNetwork();
    } else {
      console.log("No authorized account found");
    }
  };

  const connectWallet = async () => {
    try {
      if (!mmInstalled) {
        alert("Please install metamask first");
        return;
      }
      let chainId = await ethereum.request({ method: "eth_chainId" });

      let address = await ethereum.request({ method: "eth_requestAccounts" });

      if (chainId !== targetNetwork.id) {
        console.log(
          "Network is not in",
          targetNetwork.name,
          ". Change Network"
        );
        changeNetwork();
      }
      console.log("Connected Network", chainId);
      console.log("Connected to Account: ", address[0]);
      setCurrentAccount(address[0]);
    } catch (error) {
      console.log("Error connecting to metamask", error);
    }
  };

  const changeNetwork = async () => {
    if (window.ethereum.networkVersion !== targetNetwork.id) {
      try {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: targetNetwork.id }],
        });
      } catch (err: any) {
        // This error code indicates that the chain has not been added to MetaMask
        if (err.code === 4902) {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainName: targetNetwork.name,
                chainId: targetNetwork.id,
                rpcUrls: process.env.DEVNET_RPC_URL,
              },
            ],
          });
        }
      }
    }
  };

  const checkCorrectNetwork = async () => {
    let chainId = await ethereum.request({ method: "eth_chainId" });
    if (chainId !== targetNetwork.id) {
      setCorrectNetwork(false);
    } else {
      setCorrectNetwork(true);
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
    listenMMAccount();
    listenMMNetwork();
  }, [currentAccount]);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/explore" element={<Explore />} />
          <Route
            path="/explore/:fundraiseId"
            element={<ExploreDetail ethereum={ethereum} />}
          />
          <Route path="/nft/*" element={<Nft />} />
          <Route
            path="/donate"
            element={
              <Donate
                currentAccount={currentAccount}
                provider={donati_provider}
              />
            }
          />
          <Route path="/claim/:fundraiseId" element={<Claim />} />
          <Route path="/qr/:address/:amount" element={<GenerateCode />} />
          <Route path="/" element={<Home connectWallet={connectWallet} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
