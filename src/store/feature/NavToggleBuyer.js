import { createSlice } from "@reduxjs/toolkit";

let NavToggleBuyer = createSlice({
  name: "navtogglebuyer",
  initialState: {
    Nav_Toggle_Buyer: false,
  },
  reducers: {
    Set_Nav_Toggle_Buyer: (state, action) => {
      console.log(state.Nav_Toggle_Buyer);

      state.Nav_Toggle_Buyer = !state.Nav_Toggle_Buyer;
    },
  },
});

export default NavToggleBuyer.reducer;

export let { Set_Nav_Toggle_Buyer } = NavToggleBuyer.actions;
