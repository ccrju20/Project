import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import { Grid } from "@material-ui/core";
import logo from "../Images/logo.png";
import CartContext from "../store/cart-context";


const PRODUCTS_REST_API_URL = "http://localhost:8080/api/products";

const Content = () => {
  const [products, setProducts] = useState([]);
  const [loadError, setLoadError] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    axios
      .get(PRODUCTS_REST_API_URL)
      .then((response) => setProducts(response.data))
      .catch((err) => {
        setLoadError(true);
        console.log(err.message);
      });
  }, []);

  const productList = products.map((product) => (
    <Grid item xs={12} sm={4} key={product.id}>
          <div>
            <ProductCard
              id={product.id}
              title={product.title}
              subtitle={product.price}
              avatarSrc={logo}
              imgSrc={product.img}
              description={product.description}
            />
          </div>
    </Grid>
  ));

  return (
    <Grid container spacing={4}>
      {!loadError ? (
        productList
      ) : (
        <Grid container justify="center">
          <Grid item xs={10} align="center">
            <h2>Unable to load items</h2>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};

export default Content;
