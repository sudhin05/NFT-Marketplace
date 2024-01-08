import { useState } from 'react';
import React from 'react';
import { ethers } from 'ethers';
import { Connect } from "../components/componentsindex";

function SignIn() {

  // Properties

  const [walletAddress, setWalletAddress] = useState("");

  // Helper Functions

  // Requests access to the user's META MASK WALLET
  // https://metamask.io
  async function requestAccount() {

    //  Check if Meta Mask Extension exists 
    if(window.ethereum) {
      console.log('detected');

      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setWalletAddress(accounts[0]);
      } catch (error) {
        console.log('Error connecting...');
      }

    } else {
      // here direct user to download metamask
      
      alert('Meta Mask not detected');
    }
  }

  // Create a provider to interact with a smart contract
  async function connectWallet() {
    if(typeof window.ethereum !== 'undefined') {
      await requestAccount();

      const provider = new ethers.providers.Web3Provider(window.ethereum);
    }
  }

  return (
    <React.StrictMode>
    <div >
      <header className="App-header">
        <button
        
        onClick={requestAccount}
        
        >Request Account</button>
        <h3>Wallet Address: {walletAddress}</h3>
      </header>
      <Connect/>

    </div>
    </React.StrictMode>
  );
}

export default SignIn;