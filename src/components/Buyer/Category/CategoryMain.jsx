import React, { useState } from "react";
import CateHeading from "./CateHeading";
import Banner from "../Banner";
import Category from "../Category";
import Filter from "./Filter";
import ProductBox from "../ProductBox";

const CategoryMain = () => {
  let [categoryOpen, setcategoryOpen] = useState(false);
  return (
    <>
      {categoryOpen == false ? (
        <div>
          <CateHeading setcategoryOpen={setcategoryOpen}></CateHeading>
          <Banner></Banner>
          <Category></Category>
          <ProductBox></ProductBox>
        </div>
      ) : (
        <div>
          <Filter setcategoryOpen={setcategoryOpen}></Filter>
        </div>
      )}
    </>
  );
};

export default CategoryMain;
