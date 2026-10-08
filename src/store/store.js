import { configureStore } from "@reduxjs/toolkit";
import UserData from "./feature/UserData.js";
import ProductData from "./feature/ProductsData.js";
import NavStore from "./feature/NavToggleBuyer.js";

let store = configureStore({
  reducer: {
    userstore: UserData,
    productstore: ProductData,
    navstore: NavStore,
  },
});

export default store;
