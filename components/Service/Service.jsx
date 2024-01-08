import React from "react";
import Image from "next/image";

//INTERNAL IMPORT
import Style from "./Service.module.css";
import images from "../../img";
const Service = () => {
  return (
    <div className={Style.service}>
      <div className={Style.service_header}>
      <h1>How It Works</h1>
      <p>Find Out how to Get Started and Begin your Journey Today.</p>
      </div>
      <div className={Style.service_box} style={{ display: 'flex',justifyContent:'center'}}>
        <div className={Style.service_box_item}>
          <Image
            src={images.service1}
            alt="Filter & Discover"
            width={100}
            height={100}
          />
          <p className={Style.service_box_item_step}>
          </p>
          <h3>Collect, Buy & Sell</h3>
          <p>
            Connect with wallet, discover, buy NTFs, sell your NFTs and earn
            money
          </p>
        </div>
        <div className={Style.service_box_item}>
          <Image
            src={images.service3}
            alt="Connect Wallet"
            width={100}
            height={100}
          />
          <p className={Style.service_box_item_step}>
          </p>
          <h3>Live Auctions</h3>
          <p>
            Discover exciting NFT auctions and bid on your favorite NFTs
          </p>
        </div>
        <div className={Style.service_box_item}>
          <Image
            src={images.service4}
            alt="Filter & Discover"
            width={100}
            height={100}
          />
          <p className={Style.service_box_item_step}>
          </p>
          <h3>Community of Artists</h3>
          <p>
            Follow your favorite artists. Be a part of a diverse community
          </p>
        </div>
      </div>
    </div>
  );
};

export default Service;