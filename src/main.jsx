import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import LoginPage from "./pages/Auth/LoginPage.jsx";
import Signuppage from "./pages/Auth/Signuppage.jsx";
import OtpPage from "./pages/Auth/OtpPage.jsx";
import Typepage from "./pages/Auth/Typepage.jsx";
import BuyerPage from "./pages/Buyer/BuyerPage.jsx";
import SellerPage from "./pages/Seller/SellerPage.jsx";
import { Provider } from "react-redux";
import store from "./store/store.js";
import ProtectionLayout from "./components/Auth/ProtectionLayout.jsx";
import AppInitializer from "./components/Auth/AppInitializer.jsx";
import SellerAddProductPage from "./pages/Seller/SellerAddProductPage.jsx";
import SellerEditProductPage from "./pages/Seller/SellerEditProductPage.jsx";
import ProductDetailPage from "./pages/Seller/ProductDetailPage.jsx";
import OrderPage from "./pages/Seller/OrderPage.jsx";
import SalesOverviewPage from "./pages/Seller/SalesOverviewPage.jsx";
import NotificationPage from "./pages/Seller/NotificationPage.jsx";
import Homepage from "./pages/Buyer/Homepage.jsx";
import Cartpage from "./pages/Buyer/Cartpage.jsx";
import CategoryPage from "./pages/Buyer/CategoryPage.jsx";
import ProfilePage from "./pages/Buyer/ProfilePage.jsx";
import PaymentPage from "./pages/Buyer/PaymentPage.jsx";
import NotificationBuyerPage from "./pages/Buyer/NotificationBuyerPage.jsx";
import ProductDetailPageBuyer from "./pages/Buyer/ProductDetailPageBuyer.jsx";
import BuyerOrderPage from "./pages/Buyer/BuyerOrderPage.jsx";
import ProfilePageSeller from "./pages/Seller/ProfilePageSeller.jsx";
let route = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/auth" replace />,
  },

  {
    element: <AppInitializer />,
    children: [
      // Auth Routes
      {
        path: "/auth",
        element: <App />,
        children: [
          { index: true, element: <Homepage /> },
          { path: "login", element: <LoginPage /> },
          { path: "signup", element: <Signuppage /> },
          { path: "otp", element: <OtpPage /> },
          { path: "type", element: <Typepage /> },
        ],
      },

      // Buyer Routes
      {
        path: "/buyer",
        element: (
          <ProtectionLayout>
            <App />
          </ProtectionLayout>
        ),
        children: [
          { index: true, element: <Homepage /> },
          { path: "cart", element: <Cartpage /> },
          { path: "category", element: <CategoryPage /> },
          { path: "profile", element: <ProfilePage /> },
          { path: "payment", element: <PaymentPage /> },
          { path: "notification", element: <NotificationBuyerPage /> },
          { path: "productdetail/:id", element: <ProductDetailPageBuyer /> },
          { path: "order", element: <BuyerOrderPage /> },
        ],
      },

      // Seller Routes
      {
        path: "/seller",
        element: (
          <ProtectionLayout>
            <App />
          </ProtectionLayout>
        ),
        children: [
          { index: true, element: <SellerPage /> },
          { path: "addproduct", element: <SellerAddProductPage /> },
          { path: "editproduct/:id", element: <SellerEditProductPage /> },
          { path: "productdetail/:id", element: <ProductDetailPage /> },
          { path: "order", element: <OrderPage /> },
          { path: "sales", element: <SalesOverviewPage /> },
          { path: "notification", element: <NotificationPage /> },
          { path: "profile", element: <ProfilePageSeller /> },
        ],
      },
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={route}></RouterProvider>,
  </Provider>,
);
