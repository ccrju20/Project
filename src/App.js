import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { AppBar, Toolbar, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import Header from "./Main/Header";
import Content from "./Products/Content";
import AboutSection from "./Main/AboutSection";
import ButtonSection from './Main/ButtonSection'
import Divider from "@material-ui/core/Divider";
import Cart from "./Cart/Cart";
import Hidden from "@material-ui/core/Hidden";
import Account from "./Account/Account";
import Section from "./Main/Section";
import AuthContext from "./store/auth-context";
import CartProvider from "./store/CartProvider";

const useStyles = makeStyles({
  root: {
    boxShadow: "none",
    backgroundColor: "#9B89A4",
    color: "#837D7D",
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
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedUserLogin = localStorage.getItem("isLoggedIn");
    if (storedUserLogin === "1") {
      setIsLoggedIn(true);
    }
  }, []);

  const loginHandler = (email, password) => {
    localStorage.setItem("isLoggedIn", "1");
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn: isLoggedIn, onLogout: logoutHandler }}
    >
      <CartProvider>
        <Router>
          <Grid container direction="column">
            <Grid item>
              <Header />
            </Grid>

            <Switch>
              <Route exact path="/">
                <AppBar className={classes.root} position="static">
                  <Toolbar></Toolbar>
                </AppBar>
                <Grid item container>
                  <Grid item xs={1} sm={1} />
                  <Grid item xs={10} sm={10}>
                    <ButtonSection />
                    <Box mt={10}>
                      <div className={classes.divider}>
                        {/* <Divider variant="fullWidth" /> <p></p> */}
                        <Hidden only="xs">
                          <Section />
                        </Hidden>
                      </div>
                      <div>
                        <Content />
                        <br></br>
                        <br></br>
                        <br></br>
                      </div>
                    </Box>
                  </Grid>
                  <Grid item xs={1} sm={1} />
                  <AboutSection />
                </Grid>
              </Route>
              <Route path="/account">
                <Account loginStatus={loginHandler} logout={logoutHandler} />
              </Route>
              <Route path="/cart">
                <Cart />
              </Route>
            </Switch>
          </Grid>
        </Router>
      </CartProvider>
    </AuthContext.Provider>
  );
}

export default App;
