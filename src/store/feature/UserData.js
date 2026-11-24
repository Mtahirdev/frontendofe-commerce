import { createSlice } from "@reduxjs/toolkit";

let UserData = createSlice({
  initialState: {
    token: "",
    type: "auth",
    verified: false,
    user: [],
    order: [],
    notification: [],
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
    },
    setNotificationData: (state, action) => {
      state.notification = action.payload;
    },
    pushNotificationData: (state, action) => {
      state.notification.push(action.payload);
    },
  },
});

export default UserData.reducer;

export let {
  setToken,
  setType,
  setVerified,
  setUserData,
  setOrderData,
  setNotificationData,
  pushNotificationData,
} = UserData.actions;
