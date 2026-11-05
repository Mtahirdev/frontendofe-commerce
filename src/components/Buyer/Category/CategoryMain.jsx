import React, { useState } from "react";
import CateHeading from "./CateHeading";
import Banner from "../Banner";
import Category from "../Category";
import Filter from "./Filter";
import ProductBox from "../ProductBox";

const CategoryMain = () => {
  const [categoryOpen, setcategoryOpen] = useState(false);

  return categoryOpen ? (
    <Filter setcategoryOpen={setcategoryOpen} />
  ) : (
    <div>
      <CateHeading setcategoryOpen={setcategoryOpen} />
      <Banner />
      <Category />
      <ProductBox />
    </div>
  );
};

export default CategoryMain;
