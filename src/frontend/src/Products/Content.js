import React, { useState } from "react";
import ProductCard from "./ProductCard";
import { Grid, Box } from "@material-ui/core";
import Skeleton from "@mui/material/Skeleton";
import useMediaQuery from "@mui/material/useMediaQuery";
import Search from "./Search";

const Content = (props) => {
  const [searchResults, setSearchResults] = useState([]);
  const matches = useMediaQuery("(min-width:900px)");

  const searchHandler = (searchTerm) => {
    props.setSearchTerm(searchTerm);
    if (searchTerm !== "") {
      const productList = props.allProducts.filter((product) => {
        return product.title.toLowerCase().includes(searchTerm.toLowerCase());
      });
      setSearchResults(productList);
    } 
    else {
      setSearchResults([]);
    }
  };

  const productList = props.products.map((product) => (
    <Grid item xs={12} sm={matches ? 4 : 4} key={product.id}>
      <ProductCard
        id={product.id}
        title={product.title}
        subtitle={product.options[0].price.toFixed(2)}
        imgSrc={product.img}
        description={product.description}
        category={product.category}
        options={product.options}
      />
    </Grid>
  ));

  const productSearch = searchResults.map((product) => (
    <Grid item xs={12} sm={matches ? 4 : 4} key={product.id}>
      <ProductCard
        id={product.id}
        title={product.title}
        subtitle={product.options[0].price.toFixed(2)}
        imgSrc={product.img}
        description={product.description}
        category={product.category}
        options={product.options}
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
          products={props.allProducts}
          term={props.searchTerm}
          searchHandler={searchHandler}
        />
      </Box>
      <Grid container spacing={4}>
        {!props.loadError ? (
          <>{props.searchTerm.length > 0 ? productSearch : productList}</>
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
