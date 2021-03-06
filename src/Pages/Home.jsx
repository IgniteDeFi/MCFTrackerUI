import { useState, useEffect } from "react";
import Web3 from "web3";
import {
  claimDividends,
  getCurrentWalletConnected,
} from "../Utils/walletInteract";
import MCFabi from "../ABI/mcfabi.json";
import upperCables from "../Images/top cable double.png";
import midCable from "../Images/mid cable double.png";
import lowCable from "../Images/mid cable smol.png";
const web3 = new Web3("https://bsc-dataseed1.ninicoin.io/");
const contractAddress = "0x6E1f76017024BaF9dc52a796dC4e5Ae3110005c2";
const mcfHandler = new web3.eth.Contract(MCFabi, contractAddress);

const ethereum = window.ethereum;
if (ethereum) {
  ethereum.on("accountsChanged", function (accounts) {
    console.log(accounts[0]);
  });
}

export const Stats = () => {
  const [dividend, setDividends] = useState("");
  const [userDividends, setClaimable] = useState("");
  const [wallet, setWallet] = useState("");
  function addWalletListener() {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setWallet(accounts[0]);
          getUserDividends(accounts[0]);
        } else {
          setWallet("");
        }
      });
    }
  }
  async function pullDividends() {
    let dividends = await mcfHandler.methods
      .getTotalDividendsDistributed()
      .call();
    setDividends(dividends);
  }
  async function getUserDividends(userAddress) {
    let userDividends = await mcfHandler.methods
      .withdrawableDividendOf(userAddress)
      .call();
    setClaimable(userDividends / 10 ** 18);
  }
  useEffect(() => {
    async function magic() {
      const { address } = await getCurrentWalletConnected();
      setWallet(address);
      addWalletListener();
      pullDividends();
      if (wallet.length > 0) {
        getUserDividends(wallet);
        console.log(claimDividends);
      }
    }
    magic();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(wallet);
  return (
    <div className="flex flex-col items-center mb-10 mx-auto w-11/12">
      <img src={upperCables} alt="" />
      <div className="totalDivs w-full md:w-10/12 lg:w-1/2">
        <h1>Total BUSD reflected to holders #128151</h1>
        <span className="NumberColor">{(dividend / 10 ** 18).toFixed(5)} BUSD</span>
      </div>
      <img src={midCable} alt="" />
      <div className="divsBoxContainer rounded w-3/4 md:w-1/2 lg:w-1/4">
        <span className="textAboveDivs"> Your BUSD rewards</span>
        <div className="claimableDividends">
          {wallet.length > 0 ? (
            <span className="NumberColor">$ {userDividends}</span>
          ) : (
            <span className="">Connect your wallet</span>
          )}
        </div>
      </div>
      <img src={lowCable} alt="" />

      <div className="multiBoxContainer">
        <button
          className="claimDividends"
          onClick={() => {
            getUserDividends(wallet);
            wallet.length <= 0 ? console.log("no") : claimDividends();
          }}
        >
          <span className="shadow"></span>
          <span className="edge"></span>
          {wallet.length > 0 ? (
            <span className="front text">claim</span>
          ) : (
            <span className="front text">Connect your wallet to claim</span>
          )}
        </button>
      </div>
    </div>
  );
};
