import React, { useEffect, useState } from "react";
import logo from "./logo.png";
import "./App.css";
import ABI from "./utils/portal.json";

import { ethers } from "ethers";

function App() {
  const [userETHAccount, setUserETHAccount] = useState("");
  const [allWaves, setAllWaves] = useState([]);

  let wavePortalAddress = "CONTRACT-ADDRESS-HERE";
  let contractABI = ABI.abi;
  const checkWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      getAllWaves();

      console.log("Connected", accounts[0]);
      setUserETHAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      console.log("Connected", accounts[0]);
      setUserETHAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const Wave = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      alert("Get MetaMask!");
      return;
    }
    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const wavePortalContract = new ethers.Contract(
        wavePortalAddress,
        contractABI,
        signer
      );
      const waveTxn = await wavePortalContract.wave("this is a message");

      let count = await wavePortalContract.getTotalWaves();
      console.log("Retrieved total wave count...", count.toNumber());

      console.log("Mining...", waveTxn.hash);

      await waveTxn.wait();
      console.log("Mined -- ", waveTxn.hash);

      count = await wavePortalContract.getTotalWaves();
      console.log("Retrieved total wave count...", count.toNumber());
    }
  };

  const getAllWaves = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const wavePortalContract = new ethers.Contract(
          wavePortalAddress,
          contractABI,
          signer
        );

        const waves = await wavePortalContract.getAllWaves();

        let wavesCleaned = [];
        waves.forEach((wave) => {
          wavesCleaned.push({
            address: wave.waver,
            timestamp: new Date(wave.timestamp * 1000),
            message: wave.message,
          });
        });
        setAllWaves(wavesCleaned);
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkWallet();
  }, []);

  return (
    <div className="h-screen flex justify-center background items-center">
      <div>
        <p class="text-5xl text-yellow-500	">Hey 👋 </p>
        <button
          onClick={() => Wave()}
          class="p-2 pl-5 pr-5 bg-yellow-500 mt-10 text-black  text-lg rounded-lg focus:border-4 border-yellow-300"
        >
          Wave at me
        </button>
        {!userETHAccount ? (
          <p
            onClick={() => connectWallet()}
            class="p-2 pl-5 pr-5 bg-yellow-500 mt-10 text-black  text-lg rounded-lg focus:border-4 border-yellow-300"
          >
            Connect your wallet
          </p>
        ) : null}
        {allWaves.map((wave, index) => {
          return (
            <div
              key={index}
              style={{
                marginTop: "16px",
                padding: "8px",
              }}
            >
              <div className="text-white">Address: {wave.address}</div>
              <div className="text-white">
                Time: {wave.timestamp.toString()}
              </div>
              <div className="text-white">Message: {wave.message}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
