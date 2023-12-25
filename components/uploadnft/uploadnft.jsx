import React from "react";

//INTERNAL IMPORT
import Style from "./uploadnft.module.css";
import { FiUpload } from "react-icons/fi";
import { Button } from "../componentsindex";


function Uploadnft() {
  return (
    <div>
      <h2>Create an NFT</h2>
      <p>
        Once your item is minted you will not be able to change any of its
        information.
      </p>
      <form className={Style.content}>
        <div className={Style.uploadbox}>
          <FiUpload size={30} />
          <br />
          <b>Drag and drop media</b>
          <a href="">Browse File</a>
          <p className={Style.uploadinfo}>
            Max size: 50MB <br /> JPG, PNG, GIF, SVG, MP4
          </p>
        </div>
        <div className={Style.uploaddetails}>
          <div className={Style.name}>
            <b className={Style.tag}>Name*</b>
            <input
              className={Style.input}
              type="text"
              placeholder="Name Your NFT"
            />
          </div>
          <div className={Style.desc}>
            <b className={Style.tag}>Description*</b>
            <textarea
              className={Style.input}
              type="textarea"
              placeholder="Add a description to your NFT..."
            />
          </div>
          <div className={Style.link}>
            <b className={Style.tag}>External Link</b>
            <input
              className={Style.input}
              type="text"
              placeholder="Link here..."
            />
            <Button btnName={"Create"}/>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Uploadnft;
