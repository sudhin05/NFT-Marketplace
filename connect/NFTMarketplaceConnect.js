import React, { useState, useEffect, useContext} from 'react';
//import ether import web3Modal

import Web3Modal from "web3modal";
import {ethers} from "ethers";
import { useRouter } from "next/router";
import axios from "axios";


//INTERNAL IMPORT
import {NFTMarketplaceAddress,NFTMarketplaceABI} from './constants';

//--FETCHING SMART CONTRACT
const fetchContract = (signerOrprovider) => new ethers.Contract(NFTMarketplaceAddress,NFTMarketplaceABI, signerOrprovider);

//--CONNECT WITH SMART CONTRACT
const connectingWithSmartContract = async()=> {
    try {
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();
        const contract = fetchContract(signer);
        return contract;
        
    } catch (error) {
        console.log("Connecting with Contract Failed")
        
    }
};

export const NFTMarketplaceContext = React.createContext();

export const NFTMarketplaceProvider = ({ children }) => {
    const titleData = "Explore digital art & NFTs";

    //--USESTATE
    const [walletAddress, setWalletAddress] = useState("");
    const [error,setError] = useState("");
    const [openError, setOpenError] = useState("");


    //--REQUESTS ACCESS TO USER'S META MASK WALLET
    async function requestAccount() {

        //  Check if Meta Mask Extension exists 
        if(window.ethereum) {
          console.log('detected');
    
          try {
            const accounts = await window.ethereum.request({
              method: "eth_requestAccounts",
            });
            setWalletAddress(accounts[0]);
            window.location.reload();

          } catch (error) {
            console.log('Error connecting...');
          }
    
        } else {
          // here direct user to download metamask
          
          alert('Meta Mask not detected');
        }
      }
    
    //--Create a provider to interact with a smart contract
    async function connectWallet() {
        if(typeof window.ethereum !== 'undefined') {
          await requestAccount();
    
          const provider = new ethers.providers.Web3Provider(window.ethereum);
        }
      }

    useEffect(() => {
        connectWallet();
      },[]);

    
    //--UPLOAD TO IPFS FUNCTION PINATA
    const uploadtoPinata = async (file) => {
        if (file) {
            try{
                const formData = new FormData();
                formData.append("file",file);

                const response = await axios({
                    method: "post",
                    url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
                    data: formData,
                    headers: {
                        pinata_api_key: `9d03a2850c7a2c190538`,
                        pinata_secret_api_key: `
                        19df2cf3af00256fc86448cee4cd5796e58abc0dcd62ba86090c28aaad4efba5`,
                        "Content-Type": "multipart/form-data",

                    },
                });
                const ImgHash = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;

                return ImgHash;
            } catch (error) {
                console.log("Unable to upload image to Pinata");
            }
        }
      };

    //--CREATE NFT FUNCTION
    const createNFT = async (name, price, image, description, router) => {
        if (!name || !description || !price || !image)
        return setError("Data is Missing"), setOpenError(true);
      
        

      } 




//    const checkContract = async()=>{
//        const contract = await connectingWithSmartContract();
//        console.log(contract);
//    };
    return(
        <NFTMarketplaceContext.Provider value={{requestAccount,uploadtoPinata,titleData}}>
            {children}
        </NFTMarketplaceContext.Provider>
    );
}; 
