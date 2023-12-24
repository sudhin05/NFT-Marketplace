import React, {useState, useEffect, useContext} from "react";
import Image from "next/image";
import { FaSpaceShuttle } from "react-icons/fa";

//INTERNAL IMPORT
import Style from "./HeroSection.module.css";
import { Button } from "../componentsindex";
import images from "../../img";

//SMART CONTRACT IMPORT
import { NFTMarketplaceContext } from "../../Context/NFTMarketplaceContext";


const HeroSection = () => {
  const { titleData } = useContext(NFTMarketplaceContext);
  return (
    <div className={Style.heroSection}>
      <div className={Style.heroSection_box}>
        <div className={Style.heroSection_box_left} style={{width: '90%', paddingleft: '10%', paddingright: '10%', alignself: 'center'}}>
          <h1>{titleData}</h1>
          <p>
            Ingenefty Marketplace. Collect, buy and sell art from NFT artists.
          </p>
          <Button btnName="Get Started" icon=<FaSpaceShuttle/> handleClick={() => {}}
                classStyle={Style.button} />
        </div>
        <div className={Style.heroSection_box_right}>
          <Image
            src={images.hero}
            alt="Hero section"
            style={{width:'100%',borderradius: 'inherit', height: 'fit-content',borderbottomrightradius: '0px',borderbottomleftradius: '0px'}}
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
