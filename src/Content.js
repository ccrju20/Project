import React, { useContext } from "react";

import ProductCard from "./ProductCard";
import { Grid } from "@material-ui/core";
import logo from "./Images/logo.png";
import cookies from "./Images/cookies.jpeg";
import cupcakes from "./Images/cupcakes.jpg";
import doughnuts from "./Images/doughnuts.jpg";
import CartContext from "./store/cart-context";

const PRODUCTS = [
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

const Content = () => {
  const productList = PRODUCTS.map((product) => (
    <Grid item xs={12} sm={4} key={product.id}>
      <ProductCard
        id={product.id}
        title={product.name}
        subtitle={product.price}
        avatarSrc={logo}
        imgSrc={product.img}
        description={product.desc}
      />
    </Grid>
  ));

  return (
    <Grid container spacing={4}>
      {productList}
    </Grid>
  );
};

export default Content;
