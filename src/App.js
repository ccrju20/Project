import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { AppBar, Toolbar, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import Header from "./Main/Header";
import Cart from "./Cart/Cart";
import Account from "./Account/Account";
import AuthProvider from "./store/AuthProvider";
import CartProvider from "./store/CartProvider";
import Checkout from "./Checkout/Checkout";
import Shop from "./Products/Shop";
import Register from "./Account/Register";
import RegisterSuccess from "./Account/RegisterSuccess";
import ProductPage from "./Products/ProductPage";
import ServiceProvider from "./service/ServiceProvider";
import UserInfoProvider from "./store/UserInfoProvider";
import ConfirmInfo from "./Checkout/ConfirmInfo";
import MainPage from "./MainPage";
import Check from "./Checkout/Check";

const useStyles = makeStyles({
  root: {
    boxShadow: "none",
    backgroundColor: "#9B89A4",
    color: "#837D7D",
    borderRadius: "10px",
  },
  myOwnStyle: {
    fontSize: "30px",
  },
  divider: {
    marginTop: "-70px",
    marginBottom: "50px",
  },
  image: {
    height: "500px",
  },
});

function App() {
  const classes = useStyles();

  return (
    <AuthProvider>
      <CartProvider>
        <UserInfoProvider>
          <ServiceProvider>
            <Router>
              <Grid container>
                <Grid item xs={1} sm={1} />
                <Grid item xs={10} sm={10}>
                  <Header />
                  <AppBar className={classes.root} position="static">
                    <Toolbar></Toolbar>
                  </AppBar>
                </Grid>
                <Grid item xs={1} sm={1} />
              </Grid>

              <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/account" element={<Account />} />

                <Route path="/signup" element={<Register />} />

                <Route path="/success" element={<RegisterSuccess />} />

                <Route path="/cart" element={<Cart />} />
                {/* <Route path="/checkout" element={<Checkout />} /> */}
                <Route path="/check" element={<Check />} />

                <Route path="/confirminfo" element={<ConfirmInfo />} />

                <Route path="/shop" element={<Shop />} />

                <Route path="/product" element={<ProductPage />} />
              </Routes>
            </Router>
          </ServiceProvider>
        </UserInfoProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
