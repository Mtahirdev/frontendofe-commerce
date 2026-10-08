import React from "react";
import Upper_Navbar from "../../components/Buyer/Navbar components/Upper_Navbar.jsx";
import Navbar from "../../components/Buyer/Navbar components/Navbar.jsx";
import ProfileHeading from "../../components/Buyer/Profile/ProfileHeading.jsx";
import ProfilePitcture from "../../components/Buyer/Profile/ProfilePitcture.jsx";
import ProfileOverview from "../../components/Buyer/Profile/ProfileOverview.jsx";
import ProfileInformation from "../../components/Buyer/Profile/ProfileInformation.jsx";
import SecondFooter from "../../components/Buyer/SecondFooter.jsx";
import Footer from "../../components/Buyer/Footer.jsx";
import SideBar from "../../components/Buyer/Navbar components/SideBar.jsx";

const ProfilePage = () => {
  return (
    <>
      <div>
        <div>
          <div className="overflow-x-hidden">
            <Upper_Navbar />
            <Navbar></Navbar>
            <SideBar></SideBar>

            <div className="pt-20 pb-20 md:pt-24 md:pb-5">
              <ProfileHeading></ProfileHeading>
              <ProfilePitcture></ProfilePitcture>
              <ProfileOverview></ProfileOverview>
              <ProfileInformation></ProfileInformation>
              <SecondFooter></SecondFooter>
              <Footer></Footer>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
