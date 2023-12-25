import React from "react";

//INTERNAL IMPORT
import Style from "./Profile.module.css";

const Profile = () => {
  return (
    <div>
      <img
        className={Style.cover}
        src="https://images.unsplash.com/photo-1608408843596-b3119736057c?q=80&w=2034&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      />
      <img
        className={Style.profilepic}
        src="https://w0.peakpx.com/wallpaper/660/478/HD-wallpaper-pride-and-joy-profile-colorful-black-art-rainbow-fantasy-phill314-girl-luminos.jpg"
      />
      <div className={Style.userdetails}>
        <h3>IamMando</h3>
        <div className={Style.action}>
          <button className={Style.followbtn}>
            <svg
              className={Style.svg}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
            >
              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
            </svg>
            <b>Follow</b>
          </button>
          <svg
            className={Style.moresvg}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
          >
            <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Profile;
