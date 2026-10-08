import { createSlice } from "@reduxjs/toolkit";

let ProductData = createSlice({
  initialState: { productarr: [], cartarr: [] },
  name: "ProductData",
  reducers: {
    SetProductArray: (state, action) => {
      console.log(action.payload);

      state.productarr = action.payload;
      console.log(state.productarr);
    },
    SetCartArray: (state, action) => {
      let item = action.payload;

      item = item.map((ele) => {
        return { ...ele, qyt: 1 };
      });

      state.cartarr = item;
      console.log(state.cartarr);
    },
    SetQytIncrement: (state, action) => {
      let id = action.payload.id;
      state.cartarr = state.cartarr.map((ele) => {
        return ele._id == id ? { ...ele, qyt: action.payload.qyt } : ele;
      });
      console.log(state.cartarr);
    },

    // we have array of many object  we want to update only one object we have object id how we do by array method

    SetQytDecrement: (state, action) => {
      let id = action.payload.id;
      state.cartarr = state.cartarr.map((ele) => {
        return ele._id == id ? { ...ele, qyt: action.payload.qyt } : ele;
      });
      console.log(state.cartarr);
    },
  },
});

export default ProductData.reducer;
export let { SetProductArray, SetCartArray, SetQytIncrement, SetQytDecrement } =
  ProductData.actions;
