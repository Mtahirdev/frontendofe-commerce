import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../../components/Seller/Navbar/Navbar.jsx";
import ProfileHeading from "../../components/Seller/Profile/ProfileHeading.jsx";
import ProfilePitcture from "../../components/Seller/Profile/ProfilePitcture.jsx";
import ProfileOverview from "../../components/Seller/Profile/ProfileOverview.jsx";
import ProfileInformation from "../../components/Seller/Profile/ProfileInformation.jsx";

const ProfilePageSeller = () => {
  return (
    <div className="flex flex-col lg:flex-row lg:justify-center bg-ink-100 min-h-screen text-ink-800">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="w-full lg:w-[30%] desk:w-[22%]">
        <Navbar />
      </div>

      <div className="w-full lg:w-[70%] desk:w-[78%] px-4 pt-6 pb-10">
        <ProfileHeading />
        <ProfilePitcture />
        <ProfileOverview />
        <ProfileInformation />
      </div>
    </div>
  );
};

export default ProfilePageSeller;
