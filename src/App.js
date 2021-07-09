import "./App.css";
import { Box } from "@material-ui/core";
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

const Products = [
  {
    name: "Cookies",
    price: 49.99,
    id: "123",
    img: cookies,
    desc: "A delicious batch of chocolate chip cookies",
  },
  {
    name: "Cupcakes",
    price: 49.99,
    id: "124",
    img: cupcakes,
    desc: "A delicious batch of frosting-covered cupcakes",
  },
  {
    name: "Doughnuts",
    price: 49.99,
    id: "125",
    img: doughnuts,
    desc: "A delicious batch of vegan doughnuts",
  },
];

const useStyles = makeStyles({
  myOwnStyle: {
    fontSize: "30px",
  },
});

function App() {
  const classes = useStyles();

  const [cartDisplay, setCartDisplay] = useState(false);
  const [addToCart, setAddCart] = useState([]);

  const cartStatusHandler = (boolean) => {
    setCartDisplay(boolean);
  };

  const addCartHandler = (title, subtitle, id, imgSrc) => {
    // take previous cart state and add to it
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
    <div>
      <Grid container direction="column">
        <Grid item>
          <Header cartItems={addToCart}/>
        </Grid>
        <Grid item container>
          <Grid item xs={false} sm={3} />
          <Grid item xs={12} sm={8}>
            <Divider variant="inset" />
            <Box mt={8}>
              {!cartDisplay && (
                <Content
                  cartStatus={cartStatusHandler}
                  addToCart={addCartHandler}
                  products={Products}
                />
              )}
              {cartDisplay && (
                <Cart
                  cartStatus={cartStatusHandler}
                  cart={addToCart}
                  onDelete={onDeleteHandler}
                />
              )}
            </Box>
          </Grid>
          <Grid item xs={false} sm={1} />
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
