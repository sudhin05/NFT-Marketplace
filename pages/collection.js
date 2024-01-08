import React from "react";

//INTERNAL IMPORT
import Style from "../styles/collection.module.css";
import images from "../img";
import {
  CollectionProfile,
  NFTCardTwo,
} from "../collectionPage/collectionIndex";
import { Slider } from "../components/componentsindex";
import { Filter } from "../components/componentsindex";

const Collection = () => {
  const collectionArray = [
    images.nft_image_1,
    images.nft_image_2,
    images.nft_image_3,
  ];

  return (
    <div className={Style.collection}>
      <CollectionProfile />
      <Filter />
      <NFTCardTwo NFTData={collectionArray} />
      <Slider />
    </div>
  );
};

export default Collection;
