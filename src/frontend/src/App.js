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
import MainPage from "./Main/MainPage";
import Check from "./Checkout/Check";
import PaymentPage from "./Checkout/PaymentPage";
import ConfirmSuccess from "./Checkout/ConfirmSuccess";
import WithNav from "./WithNav";
import WithoutNav from "./WithoutNav";
import NotFound from "./NotFound";
import ContactUs from "./ContactUs/ContactUs";

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
                    <Route path="/shop" element={<Shop />} />
                    <Route path="/shop/product/:id" element={<ProductPage />} />
                    <Route path="/ordersuccess" element={<ConfirmSuccess />} />
                    <Route path="/contact" element={<ContactUs />} />
                    <Route path="*" element={<NotFound />} />
                  </Route>

                  <Route element={<WithoutNav />}>
                    <Route path="/check" element={<Check />} />
                    <Route path="/payment" element={<PaymentPage />} />
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
