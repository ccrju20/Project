import { React, useState, useEffect, useCallback } from "react";
import axios from "axios";
import Content from "./Content";
import { Grid, Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Divider from "@mui/material/Divider";
import Pagination from "@mui/material/Pagination";

const useStyles = makeStyles({
  root: {
    boxShadow: "none",
    backgroundColor: "#9B89A4",
    color: "#837D7D",
  },
  divider: {
    borderRight: "2px solid lightgrey",
    height: "50em",
    marginRight: 30,
    marginBottom: 50,
  },
});

const PRODUCTS_REST_API_URL = "http://localhost:8080/api/products";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loadError, setLoadError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);

  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const matches = useMediaQuery("(min-width:800px)");

  const getProducts = useCallback(() => {
    axios
      .get(PRODUCTS_REST_API_URL, { params: { title: selectedCategory, page: page } })
      .then((response) => {
        setProducts(response.data.products);
        if (selectedCategory !== null) {
          const filteredProducts = response.data.products.filter((product) =>
            product.title.toLowerCase().includes(selectedCategory)
          );
          setProducts(filteredProducts);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        setLoadError(true);
        console.log(err.message);
      });
  }, [selectedCategory, page]);

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  const handleClick = () => {
    setOpen(!open);
  };

  const handlePageChange = (event, value) => {
    console.log(value);
    setPage(value);
  };

  return (
    <Grid container>
      <Grid item xs={1} sm={1} />
      <Grid item xs={10} sm={10}>
        <Box mt={3} mb={4}>
          <Typography variant="h4">Baked Goods</Typography>
        </Box>
        <Grid container>
          <Grid item xs={12} sm={matches ? 2 : false}>
            <Box>
              <List
                subheader={
                  <ListSubheader component="div" id="nested-list-subheader">
                    Category
                  </ListSubheader>
                }
              >
                <ListItemButton
                  onClick={() => {
                    console.log("all");
                    setSelectedCategory(null);
                  }}
                >
                  <ListItemText primary="Shop All" />
                </ListItemButton>
                <Divider variant="middle" />
                <ListItemButton
                  onClick={() => {
                    setSelectedCategory("cookiez");
                  }}
                >
                  <ListItemText primary="Cookies" />
                </ListItemButton>
                <Divider variant="middle" />
                <ListItemButton
                  onClick={() => {
                    setSelectedCategory("cupcake");
                  }}
                >
                  <ListItemText primary="Cupcakes" />
                </ListItemButton>
                <Divider variant="middle" />
                <ListItemButton
                  onClick={() => {
                    handleClick();
                    setSelectedCategory("cake");
                  }}
                >
                  <ListItemText primary="Cakes" />
                  {open ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={open} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }}>
                      <ListItemText primary={`6" Cakes`} />
                    </ListItemButton>
                    <ListItemButton sx={{ pl: 4 }}>
                      <ListItemText primary={`8" Cakes`} />
                    </ListItemButton>
                    <ListItemButton sx={{ pl: 4 }}>
                      <ListItemText primary={`10" Cakes`} />
                    </ListItemButton>
                  </List>
                </Collapse>
                <Divider variant="middle" />
                <ListItemButton>
                  <ListItemText primary="Other" />
                </ListItemButton>
              </List>
            </Box>
          </Grid>

          {matches && <Grid item className={classes.divider} />}

          <Grid item xs={12} sm={matches ? 9 : 12}>
            <Content
              products={products}
              loadError={loadError}
              isLoading={isLoading}
            />
            <br />
            <Pagination count={2} onChange={handlePageChange} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={1} sm={1} />
    </Grid>
  );
};

export default Shop;
