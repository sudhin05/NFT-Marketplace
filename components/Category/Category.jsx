import React from "react";
import Image from "next/image";
import { BsCircleFill } from "react-icons/bs";

//INTERNAL IMPORT
import Style from "./Category.module.css";
import images from "../../img";

const CategoryCard = ({ image, title, total }) => (
  <div className={Style.category_box}>
    <Image
      src={image}
      className={Style.category_box_img}
      alt="Background image"
      width={350}
      height={150}
      objectFit="cover"
    />

    <div className={Style.category_box_images}>
      {/* Small Box 1 */}
      <div className={Style.small_box}>
        <Image
          src={image}
          className={Style.small_box_img}
          alt="Small Box 1"
          width={50}
          height={25}
          objectFit="cover"
        />
      </div>
      {/* Small Box 2 */}
      <div className={Style.small_box}>
        <Image
          src={image}
          className={Style.small_box_img}
          alt="Small Box 2"
          width={50}
          height={25}
          objectFit="cover"
        />
      </div>
      {/* &more Box */}
      <div className={Style.more_box}>
        <p>&more</p>
      </div>
    </div>

    <div className={Style.category_box_title}>
      <div className={Style.category_box_title_info}>
        <h4>{title}</h4>
        <small>{total} NFTS</small>
      </div>
    </div>
  </div>
);




const Category = () => {
  const CategoryArray = [
    {
      image: images.creatorbackground1,
      title: 'Ocean Exploration',
      total: 800,
    },
    {
      image: images.creatorbackground10,
      title: 'Space Exploration',
      total: 1000,
    },
    {
      image: images.creatorbackground11,
      title: 'City Lifestyle',
      total: 700,
    },
    {
      image: images.creatorbackground2,
      title: 'Sunscapes',
      total: 865,
    },
    {
      image: images.creatorbackground4,
      title: 'Wonders of Earth',
      total: 200,
    },
    {
      image: images.creatorbackground7,
      title: 'Aesthetic Designs',
      total: 400,
    },
  ];

  return (
    <div className={Style.box_category}>
      <div className={Style.category_header}>
      <h1>Trending Collection</h1>
      <p>Checkout Our Weekly Updated Trending Collection.</p>
      </div>
      <div className={Style.category}>
        {CategoryArray.map((el, i) => (
          <CategoryCard key={i} {...el} />
        ))}
      </div>
    </div>
  );
};

export default Category;
