// Signup Post Function

import { setToken } from "../store/feature/UserData.js";
import store from "../store/store.js";

export let SignupFetch = async (formdata) => {
  let res = await fetch("http://localhost:3000/auth/signup", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formdata),
  });

  res = await res.json();

  console.log(res);

  return res;
};
// Otp Fetch function
export let OtpFetch = async (data) => {
  let res = await fetch("http://localhost:3000/auth/verify-otp", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  res = await res.json();
  return res;
};

// Otp Request Fun
export let RequestOtpFetch = async (params) => {
  let res = await fetch("http://localhost:3000/auth/request-otp", {
    method: "GET",
    credentials: "include",
  });

  res = await res.json();

  return res;
};

// set type function
export let TypeFetch = async (data) => {
  let res = await fetch("http://localhost:3000/auth/type", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  res = await res.json();
  return res;
};

// Login fun

export let LoginFetch = async (formdata) => {
  let res = await fetch("http://localhost:3000/auth/login", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formdata),
  });

  res = await res.json();

  return res;
};

// getme fetch

export let GetmeFetch = async (params) => {
  let res = await fetch("http://localhost:3000/auth/getme", {
    method: "GET",
    credentials: "include",
  });

  res = await res.json();

  return res;
};

// set logout function

const apiFetch = async (api, option) => {
  try {
    let currentState = store.getState();
    let refresh_api = "";

    refresh_api = "http://localhost:3000/auth/refresh-token";

    let res = await fetch(api, option);
    if (res.status === 401 || res.status === 403) {
      res = await fetch(refresh_api, {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      store.dispatch(setToken(data.access_token));
      const newheader = {
        // it open the option
        ...option,
        headers: {
          // it again open the option that is in header section
          ...option.headers,
          Authorization: `Bearer ${data.access_token}`,
        },
      };
      res = await fetch(api, newheader);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export let AddItem = async (formdata, token) => {
  let res = await apiFetch("http://localhost:3000/admin/additem", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
    body: formdata,
  });

  return res;
};

export let FetchItem = async (token) => {
  let res = await apiFetch("http://localhost:3000/admin/getproducts", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
  });

  return res;
};

export let EditItem = async (formdata, token) => {
  let res = await apiFetch("http://localhost:3000/admin/updateitem", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
    body: formdata,
  });

  return res;
};

export let DeleteItemServer = async (id, token) => {
  let res = await apiFetch(`http://localhost:3000/admin/deleteproduct/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
  });

  return res;
};

export let BuyerFetchItem = async (token) => {
  let res = await apiFetch(`http://localhost:3000/buyer/items`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
  });

  return res;
};

export let AddtoCartFetch = async (id, token) => {
  let res = await apiFetch(`http://localhost:3000/buyer/addcartitem/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
  });

  return res;
};

export let BuyerCartFetchItem = async (token) => {
  let res = await apiFetch(`http://localhost:3000/buyer/fetchcart`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
  });

  return res;
};

export let DeleteCartItem = async (id, token) => {
  let res = await apiFetch(`http://localhost:3000/buyer/cartitemdelete/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
  });

  return res;
};

export let SetProfilePitcture = async (formdata, token) => {
  let res = await apiFetch("http://localhost:3000/buyer/profile-img", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
    body: formdata,
  });

  return res;
};

export let EditProfile = async (formdata, token) => {
  let res = await apiFetch("http://localhost:3000/buyer/edit-profile", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
    body: JSON.stringify(formdata),
  });

  return res;
};

export let Add_Address = async (formdata, token) => {
  let res = await apiFetch("http://localhost:3000/buyer/add-address", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
    body: JSON.stringify(formdata),
  });

  return res;
};

export let Set_Address = async (formdata, token) => {
  let res = await apiFetch("http://localhost:3000/buyer/set-address", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
    body: JSON.stringify(formdata),
  });

  return res;
};

export let PlaceOrder = async (formdata, token) => {
  let res = await apiFetch("http://localhost:3000/buyer/order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
    body: JSON.stringify(formdata),
  });

  return res;
};

export let Logout = async (token) => {
  let res = await apiFetch(`http://localhost:3000/auth/logout`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
  });

  return res;
};
