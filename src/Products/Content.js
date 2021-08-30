import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import { Grid } from "@material-ui/core";
import logo from "../Images/logo.png";
// import cookies from "./Images/cookies.jpeg";
// import cupcakes from "./Images/cupcakes.jpg";
// import doughnuts from "./Images/doughnuts.jpg";
import CartContext from "../store/cart-context";

// const PRODUCTS = [
//   {
//     name: "Cookies",
//     price: 49.99,
//     id: "123",
//     img: cookies,
//     desc: "Chocolate chip cookies.",
//   },
//   {
//     name: "Cupcakes",
//     price: 49.99,
//     id: "124",
//     img: cupcakes,
//     desc: "Mocha frosted cupcakes.",
//   },
//   {
//     name: "Doughnuts",
//     price: 49.99,
//     id: "125",
//     img: doughnuts,
//     desc: "Vegan glazed doughnuts.",
//   },
// ];

const PRODUCTS_REST_API_URL = "http://localhost:8080/api/products";

const Content = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get(PRODUCTS_REST_API_URL)
      .then((response) => setProducts(response.data))
      .catch((err) => {
        // throw Error(err.message);
        console.log(err.message);
      });
  }, []);

  const productList = products.map((product) => (
    <Grid item xs={12} sm={4} key={product.id}>
      <ProductCard
        id={product.id}
        title={product.title}
        subtitle={product.price}
        avatarSrc={logo}
        imgSrc={product.img}
        description={product.description}
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
