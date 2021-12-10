import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import { Grid } from "@material-ui/core";
import Skeleton from "@mui/material/Skeleton";
import useMediaQuery from "@mui/material/useMediaQuery";

const PRODUCTS_REST_API_URL = "http://localhost:8080/api/products";

const Content = () => {
  const [products, setProducts] = useState([]);
  const [loadError, setLoadError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const matches = useMediaQuery("(min-width:900px)");
  
  const getProducts = useCallback(() => {
    axios
    .get(PRODUCTS_REST_API_URL)
    .then((response) => {
      setProducts(response.data);
      setIsLoading(false);
      console.log(response.data);
    })
    .catch((err) => {
      setLoadError(true);
      console.log(err.message);
    });
  }, [])

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  const productList = products.map((product) => (
    <Grid item xs={12} sm={matches ? 4 : 4} key={product.id}>
      <ProductCard
        id={product.id}
        title={product.title}
        subtitle={product.price}
        imgSrc={product.img}
        description={product.description}
      />
    </Grid>
  ));

  const skeletonArray = Array(9).fill("");
  const itemsLoading = skeletonArray.map((item, index) => (
    <Grid item xs={12} sm={4} key={index}>
      <div>
        <Skeleton variant="rectangular" width={200} height={360} />
      </div>
    </Grid>
  ));

  return (
    <Grid container spacing={4}>
      {!loadError ? (
        productList
      ) : (
        <Grid container justifyContent="center">
          <h2>Unable to load items</h2>
        </Grid>
      )}
      {isLoading && !loadError && itemsLoading}
    </Grid>
  );
};

export default Content;
