import { createSlice } from "@reduxjs/toolkit";

let UserData = createSlice({
  initialState: {
    token: "",
    type: "auth",
    verified: false,
    user: [],
    order: [],
  },
  name: "userdata",
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      console.log("Token is set", state.token);
    },
    setType: (state, action) => {
      state.type = action.payload;
      console.log("type is set", state.type);
    },
    setVerified: (state, action) => {
      state.verified = action.payload;
      console.log("verified is set", state.verified);
    },
    setUserData: (state, action) => {
      state.user = action.payload;
      console.log(state.user);
    },
    setOrderData: (state, action) => {
      state.order = action.payload;
      console.log(state.user);
    },
  },
});

export default UserData.reducer;

export let { setToken, setType, setVerified, setUserData, setOrderData } =
  UserData.actions;
