import React, { useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BsImages } from "react-icons/bs";
import Image from "next/image";

//INTERNAL IMPORT
import Style from "./NFTCard.module.css";
import images from "../../img";

const NFTCard = () => {
  const CardArray = [
    images.nft_image_1,
    images.nft_image_2,
    images.nft_image_3,
  ];

  return (
    <div className={Style.NFTCard}>
      {CardArray.map((el, i) => (
        <div className={Style.NFTCard_box} key={i + 1}>
          <div className={Style.NFTCard_box_img}>
            <Image
              src={el}
              alt="NFT images"
              width={600}
              height={600}
              className={Style.NFTCard_box_img_img}
            />
            <div className={Style.NFTCard_details_container}>
                <h4>NFT</h4>
                <div className={Style.NFTCard_bid_container}>
                    <small>Current Bid</small>
                    <p>1.000ETH</p>
                    <div className={Style.NFTCard_details_category}>
                      <BsImages />
                    </div>
                  </div>
                </div>
              </div>
          </div>
      ))}
    </div>
  );
};

export default NFTCard;