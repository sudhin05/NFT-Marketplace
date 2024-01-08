import React, { useState, useEffect, useContext} from 'react';
//import ether import web3Modal

import Web3Modal from "web3modal";
import {ethers} from "ethers";
import { useRouter } from "next/router";
import axios from "axios";

import Web3 from 'web3';


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
    //--USESTATE
    const [walletAddress, setWalletAddress] = useState("");
    const [error,setError] = useState("");
    const [openError, setOpenError] = useState("");
    const [currentAccount, setCurrentAccount] = useState("");
    const router = useRouter();

    //--CONNECT WALLET FUNCTION
    const connectWallet = async() => {
        try {
            if(!window.ethereum) return console.log("Install MetaMask");

            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            });

            setCurrentAccount(accounts[0]);
            console.log(accounts[0])
            
        } catch (error) {
            console.log("Error in Wallet Connection");
            
        }
    }
    
    ///--CHECK IF WALLET IS CONNECTED
    const checkIfWalletConnected = async()=> {
        try {
            if(!window.ethereum) return console.log("Install MetaMask");

            const accounts = await window.ethereum.request({
                method: "eth_accounts",
            });

            if (accounts.length){
                setCurrentAccount(accounts[0]);
            } else {
                console.log("No Account Found");
            }
            
        } catch (error) {
            console.log("Error in Wallet Connection");  
        }
        console.log(currentAccount);
    };

    useEffect(()=> {
        checkIfWalletConnected()
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
                        pinata_api_key: `bd6d702ffe6dd15c1322`,
                        pinata_secret_api_key: `
                        c9f297d7e1fa7e9542d82f5597fc375e9da45a5781804c7c285646ae13a4eb32 `,
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

        const data =JSON.stringify({ name, description, image});
        
        try {
            console.log("step 1")
            const response = await axios({
                method: "post",
                url: "https://api.pinata.cloud/pinning/pinJSONToIPFS",
                data: data,
                headers: {
                    pinata_api_key: `bd6d702ffe6dd15c1322`,
                    pinata_secret_api_key: `
                    c9f297d7e1fa7e9542d82f5597fc375e9da45a5781804c7c285646ae13a4eb32 `,
                    "Content-Type": "application/json",

                },
            });
            
            const url = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;
            console.log(url);
            
            //sendTransaction();
            await createSale(url, price);
            //router.push("/searchPage")
            
            /*const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
              });
            if (accounts.length === 0) {
                console.error("No account found");
                return;
            }*/
            
              
            //const contract = await connectingWithSmartContract();
            // Call the function
            //sendTransaction();
            //const transaction = await contract.createNFT(name, price, imgUrl, description);
            //await transaction.wait();

            
            
            
            //console.log("External Link:", externalLink);
            //router.push("/searchPage");
            
        } catch (error) {
            setError("Error while creating NFT");
            setOpenError(true);
            
        }
      }; 

    //-CREATE SALE FUNCTION
    const createSale = async (url, formInputPrice, isReselling, id) => {
        try {
          console.log(url, formInputPrice, isReselling, id);
          const price = ethers.utils.parseUnits(formInputPrice, "ether");
          console.log(price);
          const contract = await connectingWithSmartContract();
          console.log(contract);
          const listingPrice = await contract.getListingPrice();
          console.log(listingPrice);

          const transaction = !isReselling
            ? await contract.createToken(url, price, {
                value: listingPrice.toString(),
                })
            : await contract.reSellToken(url, price, {
                value: listingPrice.toString(),
                });
      
          await transaction.wait();
          console.log(transaction);

        } catch (error) {
          console.log("Error in Sale Creation");
        }
      };
    //--FETCHNFTS FUNCTION

    const fetchNFTs = async () => {
        try {
            const provider = new ethers.providers.JsonRpcProvider();
            const contract = fetchContract(provider);

            const data = await contract.fetchMarketItem();
            //console.log(data)

            const items = await Promise.all(
                data.map(
                    async({tokenId, seller, owner, price: unformattedPrice})=>{
                    const tokenURI = await contract.tokenURI(tokenId);
                    const {
                        data: {image, name, description},
                    } = await axios.get(tokenURI);
                    const price = ethers.utils.formatUnits(
                        unformattedPrice.toString(),
                        "ether"
                    );
                    return {
                        price,
                        tokenId: tokenId.toNumber(),
                        seller,
                        owner,
                        image,
                        name,
                        description,
                        tokenURI,
                    };
                }
              )
            );
            return items;

        } catch (error) {
            console.log("Error in NFTS Fetch");
            
        }
    }; 

    useEffect(()=>{
        fetchNFTs();
    },[]);

    //--FETCHING MYNFT
    const fetchMyNFT = async(type) => {
        try {
            const contract = await connectingWithSmartContract();
            const data = 
            type == "fetchItemsListed" 
            ? await contract.fetchItemsListed()
            : await contract.fetchMyNFT();

            const items = await Promise.all(
                data.map(async({tokenId, seller, owner, price: unformattedPrice})=> {
                    const tokenURI = await contract.tokenURI(tokenId);
                    const {
                        data: {image, name, description},
                    } = await axios.get(tokenURI);
                    const price = ethers.utils.formatUnits(
                        unformattedPrice.toString(),
                        "ether"
                    );

                    return {
                        price,
                        tokenId: tokenId.toNumber(),
                        seller,
                        owner,
                        image,
                        name,
                        description,
                        tokenURI,
                    };
                }
              )
            );
            return items;          
        } catch (error) {
            console.log("Error in Listed NFTs Fetch");
            
        }
    };

    //--BUY NFTS FUNCTION
    const buyNFT = async (nft)=> {
        try {
            const contract = await connectingWithSmartContract();
            const price = ethers.utils.parseUnits(nft.price.toString(), "ether");

            const transaction = await contract.createMarketSale(nft.tokenId, {
                value: price,
            });
            await transaction.wait();
        } catch (error) {
            console.log("Error in NFT Purchase")
        }
    }

    async function sendTransaction(/*receiverAddress*/) {
        if (typeof window.ethereum !== 'undefined' || (typeof window.web3 !== 'undefined')) {
            console.log("Trial 0")
            const web3 = new Web3(window.ethereum);
            try {
                await window.ethereum.enable();
                const accounts = await web3.eth.getAccounts();
    
                // Transaction details
                console.log("Trial 1")
                const senderAddress = accounts[0];  // Sender's address
                const receiverAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';  // Receiver's address (replace with actual address)
                const amountToSend = web3.utils.toWei('1', 'ether');  // Amount to send (in Wei)
    
                // Create the transaction
                const transaction = {
                    from: senderAddress,
                    to: receiverAddress,
                    value: amountToSend
                };
                console.log("Trial 2")
                // Send the transaction
                web3.eth.sendTransaction(transaction, function(err, hash) {
                    if (!err) {
                        console.log('Transaction Hash:', hash);
                    } else {
                        console.error('Error:', err);
                    }
                });
            } catch (error) {
                console.error("User denied account access");
            }
        } else {
            console.log('MetaMask is not installed');
        }
    }
    


//    const checkContract = async()=>{
//        const contract = await connectingWithSmartContract();
//        console.log(contract);
//    };

    return(
        <NFTMarketplaceContext.Provider value={{checkIfWalletConnected,connectWallet,uploadtoPinata,createNFT,fetchNFTs,fetchMyNFT,buyNFT,currentAccount,sendTransaction}}>
            {children}
        </NFTMarketplaceContext.Provider>
    );
};

