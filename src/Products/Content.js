import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import { Grid, Box } from "@material-ui/core";
import Skeleton from "@mui/material/Skeleton";
import useMediaQuery from "@mui/material/useMediaQuery";
import Search from "./Search";

const PRODUCTS_REST_API_URL = "http://localhost:8080/api/products";

const Content = (props) => {
  const [products, setProducts] = useState([]);
  const [loadError, setLoadError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const matches = useMediaQuery("(min-width:900px)");

  // const getProducts = useCallback(() => {
  //   axios
  //     .get(PRODUCTS_REST_API_URL)
  //     .then((response) => {
  //       setProducts(response.data);
  //       if (props.category !== "all") {
  //         console.log('not all')
  //         const filteredProducts = response.data.filter(
  //           (product) => product.title.toLowerCase() === props.category
  //         );
  //         console.log(filteredProducts)
  //         setProducts(filteredProducts);
  //       }
  //       setIsLoading(false);
  //       console.log(response.data);
  //     })
  //     .catch((err) => {
  //       setLoadError(true);
  //       console.log(err.message);
  //     });
  // }, []);

  // useEffect(() => {
  //   getProducts();
  // }, [getProducts]);

  const searchHandler = (searchTerm) => {
    setSearchTerm(searchTerm);
    if (searchTerm !== "") {
      const productList = props.products.filter((product) => {
        return product.title.toLowerCase().includes(searchTerm.toLowerCase());
      });
      setSearchResults(productList);
    } else {
      setSearchResults(products);
    }
  };

  const productList = props.products.map((product) => (
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

  const productSearch = searchResults.map((product) => (
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
    <>
      <Box mb={2}>
        <Search
          products={props.products}
          term={searchTerm}
          searchHandler={searchHandler}
        />
      </Box>
      <Grid container spacing={4}>
        {!props.loadError ? (
          <>{searchTerm.length > 0 ? productSearch : productList}</>
        ) : (
          <Grid container justifyContent="center">
            <h2>Unable to load items</h2>
          </Grid>
        )}
        {props.isLoading && !props.loadError && itemsLoading}
      </Grid>
    </>
  );
};

export default Content;
