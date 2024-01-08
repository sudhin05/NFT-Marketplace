import React, { useContext, useEffect, useState } from "react";

//INTRNAL IMPORT
import Style from "../styles/searchPage.module.css";
import { Slider } from "../components/componentsindex";
import { SearchBar } from "../SearchPage/searchBarIndex";
import { Filter } from "../components/componentsindex";

import { NFTCardTwo} from "../collectionPage/collectionIndex";
import images from "../img";

import { NFTMarketplaceContext } from "../Context/NFTMarketplaceContext";


const searchPage = () => {

  const {fetchNFTs} = useContext(NFTMarketplaceContext);
  const {nfts, setnfts} = useState([]);
  const {nftscopy, setnftscopy} = useState([]);

  useEffect(()=>{
    fetchNFTs().then((item)=> {
      setnfts(item.reverse());
      setnftscopy(item);
      console.log(nfts);
   });
  })

  const collectionArray = [
    images.nft_image_1,
    images.nft_image_2,
    images.nft_image_3,
  ];
  return (
    <div className={Style.searchPage}>
      <SearchBar />
      <Filter />
      <NFTCardTwo NFTData={collectionArray} />
      <Slider />
    </div>
  );
};

export default searchPage;