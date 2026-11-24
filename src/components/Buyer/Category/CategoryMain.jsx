import React, { useState } from "react";
import CateHeading from "./CateHeading";
import Banner from "../Banner";
import Category from "../Category";
import Filter from "./Filter";
import ProductBox from "../ProductBox";
import Trending from "../Trending.jsx";
import ProductGridOne from "../ProductGridOne.jsx";
import Phone from "../Phone.jsx";

const CategoryMain = () => {
  const [categoryOpen, setcategoryOpen] = useState(false);

  return categoryOpen ? (
    <Filter setcategoryOpen={setcategoryOpen} />
  ) : (
    <div>
      <Banner />
      <Trending></Trending>
      <ProductGridOne></ProductGridOne>
      <CateHeading setcategoryOpen={setcategoryOpen} />
      <Category />
      <ProductBox />
    </div>
  );
};

export default CategoryMain;
