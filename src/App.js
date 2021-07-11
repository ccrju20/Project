import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { AppBar, Toolbar, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import Header from "./Header";
import Content from "./Content";
import Divider from "@material-ui/core/Divider";
import { useState } from "react";
import Cart from "./Cart";
import cookies from "./Images/cookies.jpeg";
import cupcakes from "./Images/cupcakes.jpg";
import doughnuts from "./Images/doughnuts.jpg";
import cafe from "./Images/cafe-two.jpg";
import Hidden from "@material-ui/core/Hidden";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import Account from "./Account";

const Products = [
  {
    name: "Cookies",
    price: 49.99,
    id: "123",
    img: cookies,
    desc: "Chocolate chip cookies.",
  },
  {
    name: "Cupcakes",
    price: 49.99,
    id: "124",
    img: cupcakes,
    desc: "Mocha frosted cupcakes.",
  },
  {
    name: "Doughnuts",
    price: 49.99,
    id: "125",
    img: doughnuts,
    desc: "Vegan glazed doughnuts.",
  },
];

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
  const [addToCart, setAddCart] = useState([]);

  const addCartHandler = (title, subtitle, id, imgSrc) => {
    setAddCart((prevCart) => {
      for (let i = 0; i < prevCart.length; i++) {
        if (prevCart[i].id === id) {
          console.log("exists");
          prevCart[i].qt++;
          prevCart[i].updatedPrice += subtitle;
          console.log(prevCart);
          return prevCart;
        }
      }
      const updatedCart = [
        ...prevCart,
        {
          name: title,
          price: parseFloat(subtitle),
          id: id,
          img: imgSrc,
          qt: 1,
          updatedPrice: parseFloat(subtitle),
        },
      ];
      console.log(updatedCart);
      return updatedCart;
    });
  };

  const onDeleteHandler = (id) => {
    setAddCart((prevCart) => {
      const newCart = prevCart.filter((cartItem) => cartItem.id !== id);
      return newCart;
    });
  };

  return (
    <Router>
      <Grid container direction="column">
        <Grid item>
          <Header cartItems={addToCart} />
        </Grid>

        <Switch>
          <Route exact path="/">
            <Grid item container>
              <Grid item xs={1} sm={1} />
              <Grid item xs={10} sm={10}>
                <Box mt={8}>
                  <div className={classes.divider}>
                    <Divider variant="fullWidth" /> <p></p>
                    <AppBar className={classes.root} position="static">
                      <Toolbar></Toolbar>
                    </AppBar>
                    <Hidden only="xs">
                      <Card>
                        <CardMedia className={classes.image} image={cafe} />
                      </Card>
                    </Hidden>
                  </div>
                  <div>
                    <Content addToCart={addCartHandler} products={Products} />
                  </div>
                </Box>
              </Grid>
              <Grid item xs={1} sm={1} />
            </Grid>
          </Route>
          <Route path="/account">
            <Account />
          </Route>
          <Route path="/cart">
            <Cart cart={addToCart} onDelete={onDeleteHandler} />
          </Route>
        </Switch>
      </Grid>
    </Router>
  );
}

export default App;
