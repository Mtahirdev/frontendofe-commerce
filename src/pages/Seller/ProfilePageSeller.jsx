import React from "react";
import Navbar from "../../components/Seller/Navbar/Navbar.jsx";
import ProfileHeading from "../../components/Seller/Profile/ProfileHeading.jsx";
import ProfilePitcture from "../../components/Seller/Profile/ProfilePitcture.jsx";
import ProfileOverview from "../../components/Seller/Profile/ProfileOverview.jsx";
import ProfileInformation from "../../components/Seller/Profile/ProfileInformation.jsx";

const ProfilePageSeller = () => {
  return (
    <>
      <div className="lg:flex lg:w-full lg:h-full flex flex-col lg:flex-row lg:justify-center ">
        <div className="w-full lg:w-[30%] desk:w-[22%]">
          <Navbar></Navbar>
        </div>
        <div className="w-full lg:w-[70%] desk:w-[78%] pt-10">
          <ProfileHeading></ProfileHeading>
          <ProfilePitcture></ProfilePitcture>
          <ProfileOverview></ProfileOverview>
          <ProfileInformation></ProfileInformation>
        </div>
      </div>
    </>
  );
};

export default ProfilePageSeller;
