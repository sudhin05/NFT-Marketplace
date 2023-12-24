import React, { useState, useEffect, useContext} from 'react'
//import ether import web3Modal

import web3Modal from "web3modal";
import {ethers} from "ethers";
import Router from "next/router";

//INTERNAL IMPORT
import { NFTMarketplaceAddress, NFTMarketplaceABI } from './constents';

export const NFTMarketplaceContext = React.createContext();

export const NFTMarketplaceProvider = ({ children }) => {
    const titleData = "Explore digital art & NFTs";
    return(
        <NFTMarketplaceContext.Provider value={{titleData}}>
            {children}
        </NFTMarketplaceContext.Provider>
    );
};
