import "./App.css";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Cart from "./Cart/Cart";
import Account from "./Account/Account";
import AuthProvider from "./store/AuthProvider";
import CartProvider from "./store/CartProvider";
import Shop from "./Products/Shop";
import Register from "./Account/Register";
import RegisterSuccess from "./Account/RegisterSuccess";
import ProductPage from "./Products/ProductPage";
import ServiceProvider from "./service/ServiceProvider";
import UserInfoProvider from "./store/UserInfoProvider";
import ConfirmInfo from "./Checkout/ConfirmInfo";
import MainPage from "./Main/MainPage";
import Check from "./Checkout/Check";
import WithNav from "./WithNav";
import WithoutNav from "./WithoutNav";

function App() {
  return (
    <>
      <AuthProvider>
        <CartProvider>
          <UserInfoProvider>
            <ServiceProvider>
              <BrowserRouter>
                <Routes>
                  <Route element={<WithNav />}>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/account" element={<Account />} />
                    <Route path="/signup" element={<Register />} />
                    <Route path="/success" element={<RegisterSuccess />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/confirminfo" element={<ConfirmInfo />} />
                    <Route path="/shop" element={<Shop />} />
                    <Route path="/product" element={<ProductPage />} />
                  </Route>

                  <Route element={<WithoutNav />}>
                    <Route path="/check" element={<Check />} />
                  </Route>
                </Routes>
              </BrowserRouter>
            </ServiceProvider>
          </UserInfoProvider>
        </CartProvider>
      </AuthProvider>
    </>
  );
}

export default App;
