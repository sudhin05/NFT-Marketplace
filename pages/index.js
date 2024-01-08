import React, { useState, useEffect, useContext } from "react";

//IMPORTING CONTRACT DATA
import { NFTMarketplaceContext } from "../Context/NFTMarketplaceContext";


//INTERNAL IMPORT
import Style from "../styles/index.module.css";
import { HeroSection, Service , Category, NFTCard, Title, Filter, Slider} from "../components/componentsindex";

const Home = () => {
  const {checkIfWalletConnected} = useContext(NFTMarketplaceContext);
  useEffect(()=>{
    checkIfWalletConnected()
  },[]);
  return (
    <div className={Style.homePage}>
      <HeroSection />
      <Service />
      <Title 
        heading="Featured NFTs"
        paragraph="Explore our featured NFTs in all domains"/>
      <Filter />
      <NFTCard/>
      <Slider />      
      <Category />
    </div>
  );
};

export default Home;