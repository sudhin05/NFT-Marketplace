import React, {useState,useEffect,useContext} from "react";
import Image from "next/image";
///INTERNAL IMPORT
import Style from "./uploadnft.module.css";
import { Button } from "../componentsindex";
import {useRouter} from "next/router";

//IMPORTING NFTMARKETPLACE CONTEXT
import { NFTMarketplaceContext } from "../../Context/NFTMarketplaceContext";

function Uploadnft() {
  //ACCESSING NFTMARKETPLACE CONTEXT
  const {createNFT, uploadtoPinata, sendTransaction} = useContext(NFTMarketplaceContext);
  const [price, setPrice] = useState("");
  const router = useRouter();
  const [filePreview, setFilePreview] = useState(null);


  //HANDLING FILE UPLOAD
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];

    try {
      //UPLOADING TO PINATA
      const imgUrl = await uploadtoPinata(file);

      //USING IMGURL TO DISPLAY OR SAVE IN COMPONENT STATE
      console.log("Image URL:", imgUrl);
      
      //DISPLAY FILE PREVIEW
      setFilePreview(URL.createObjectURL(file));


    } catch (error) {
      console.error("Error uploading to Pinata", error);
    }
  };
  const handleCreateNFT = async (e) => {
    alert("Running");//GET FORM DATA (NAME, DESCRIPTION, EXTERNAL LINK)
    const name = document.getElementById("nameInput").value;
    const description = document.getElementById("descriptionInput").value;
    const price = document.getElementById("priceInput").value;
    const externalLink = document.getElementById("externalLinkInput").value;

    try {
      //CREATING NFT
      //alert("running1");
      //sendTransaction();
      alert("running2");
      await createNFT(name, price, filePreview, description,/* router,*/);      
      router.push("/searchPage");

    } catch (error) {
      console.error("Error creating NFT:", error);
    }
  };

  return (
    <div>
      <h2>Create an NFT</h2>
      <p>
        Once your item is minted you will not be able to change any of its
        information.
      </p>
      <div className={Style.content}>
      <div className={Style.uploadbox}>
        {filePreview ? (
          <img
            src={filePreview}
            alt="File Preview"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: '20px',
            }}
          />
        ) : (
          <>
            <input 
              id="imageInput"
              type="file"
              accept="image/*,video/*"
              onChange={handleFileUpload}
            />
            <br />
            <b>Drag and drop media</b>
            <a href="">Browse File</a>
            <p className={Style.uploadinfo}>
              Max size: 50MB <br /> JPG, PNG, GIF, SVG, MP4
            </p>
          </>
        )}
      </div>

        <div className={Style.uploaddetails}>
          <div className={Style.name}>
            <b className={Style.tag}>Name*</b>
            <input
              id="nameInput"
              className={Style.input}
              type="text"
              placeholder="Name Your NFT"
            />
          </div>
          <div className={Style.desc}>
            <b className={Style.tag}>Description*</b>
            <textarea
              id="descriptionInput"
              className={Style.input}
              type="textarea"
              placeholder="Add a description to your NFT..."
            />
          </div>
          <div className={Style.price}>
            <b className={Style.tag}>Price*</b>
            <input
              id="priceInput"
              className={Style.input}
              type="text"
              placeholder="Price"
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className={Style.link}>
            <b className={Style.tag}>External Link</b>
            <input
              id="externalLinkInput"
              className={Style.input}
              type="text"
              placeholder="Link here..."
            />
          </div>
          <div className={Style.uploadboxbtn}>
          <Button btnName={"Create"} handleClick={handleCreateNFT} classStyle={Style.uploadboxbtnstyle}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Uploadnft;
