import React, { Component } from 'react';
import Style from './NavBar.module.css';

import ReactDOM from 'react-dom/client';

import { FiAlignRight } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { FaSearch } from "react-icons/fa";
import { IoIosCart } from "react-icons/io";
import { render } from 'react-dom';

function NavBar() {
    const open = () => {
        dropdown.classList.toggle('open')
    }
    return ( 
        <>
        <div className={Style.navbar}>
            <div className={Style.logo}>NFT Marketplace</div>
            <div className={Style.search}>
                <input className={Style.input} type="text" placeholder='Search...'/>
                <button className={Style.button}><FaSearch size={16}/></button>
                
            </div>
            <ul className={Style.links}>
            <ul><a href="MarketPlace">MarketPlace</a></ul>
            <ul><a href="createnft">Create</a></ul>
            <ul><a href="profile"><CgProfile size={24}/></a></ul>
            <ul><a href="cart"><IoIosCart size={24}/> </a></ul>
            </ul>
            <div className={Style.togglebtn}>
            <FiAlignRight size={24}/>
            </div>
        
        </div>
         <div className={Style.dropdown} onClick={open} id='dropdown'>
         <ul className={Style.links}>
         <ul><a href="MarketPlace">MarketPlace</a></ul>
         <ul><a href="createnft">Create</a></ul>
         <ul><a href="profile"><CgProfile style={{marginRight: "10px"}} size={24}/> Profile</a></ul>
         <ul><a href="cart"><IoIosCart style={{marginRight: "10px"}} size={24}/> Cart </a></ul>
         </ul>
         </div>
         {/* <script>
         const togglebtn = document.querySelector(".togglebtn")
         // const togglebtnicon = document.querySelector(".togglebtn")
         const dropdown = document.querySelector(".dropdown")

        togglebtn.onclick = function () {
            dropdown.classList.toggle('open')
        }
         </script> */}
         </>
     );
}

// let dropdown =   ReactDOM.createRoot( document.getElementsById("dropdown"));
// dropdown.render(<NavBar/>)

export default NavBar;