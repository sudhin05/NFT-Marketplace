import React from "react";

//INTERNAL IMPORT
import { Button, Category} from "../components/componentsindex";
import NFTDetailsPage from "../NFTDetailsPage/NFTDetailsPage";
const NFTDetails = () => {
  return (
    <div>
      <NFTDetailsPage />
      <Category />
    </div>
  );
};

export default NFTDetails;