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
import { useLocation } from "react-router-dom";

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

const PRODUCTS_REST_API_URL = "api/v1/products";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loadError, setLoadError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageDisplay, setPageDisplay] = useState();
  const [allProducts, setAllProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const location = useLocation();
  const classes = useStyles();
  const matches = useMediaQuery("(min-width:800px)");

  const getProducts = useCallback(() => {
    axios
      .get(PRODUCTS_REST_API_URL, {
        params: { category: selectedCategory, page: page },
      })
      .then((response) => {
        // console.log(response.data);
        const activeProducts = response.data.products.filter(
          (product) => product.active === 1
        );
        setProducts(activeProducts);
        // setProducts(response.data.products);
        response.data.totalItems < 10
          ? setPageDisplay(false)
          : setPageDisplay(true);
        setIsLoading(false);
      })
      .catch((err) => {
        setLoadError(true);
        console.log(err);
      });
  }, [selectedCategory, page]);

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  useEffect(() => {
    setSelectedCategory("all");
    setPage(1);
    setSearchTerm("");
    axios
      .get(PRODUCTS_REST_API_URL + "/all")
      .then((response) => {
        // console.log(response.data);
        setAllProducts(response.data);
      })
      .catch((err) => {
        setLoadError(true);
        console.log(err);
      });
  }, [location.key]);

  const handleClick = () => {
    setOpen(!open);
  };

  const handlePageChange = (event, value) => {
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
                    setSelectedCategory("all");
                    setPage(1);
                    setSearchTerm("");
                  }}
                >
                  <ListItemText data-cy="all" primary="Shop All" />
                </ListItemButton>
                <Divider variant="middle" />
                <ListItemButton
                  onClick={() => {
                    setSelectedCategory("cookie");
                    setPage(1);
                    setSearchTerm("");
                  }}
                >
                  <ListItemText data-cy="cookie" primary="Cookies" />
                </ListItemButton>
                <Divider variant="middle" />
                <ListItemButton
                  onClick={() => {
                    setSelectedCategory("cupcake");
                    setPage(1);
                    setSearchTerm("");
                  }}
                >
                  <ListItemText data-cy="cupcake" primary="Cupcakes" />
                </ListItemButton>
                <Divider variant="middle" />
                <ListItemButton
                  onClick={() => {
                    handleClick();
                    setSelectedCategory("cake");
                    setPage(1);
                    setSearchTerm("");
                  }}
                >
                  <ListItemText data-cy="cake" primary="Cakes" />
                  {open ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={open} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <ListItemButton
                      sx={{ pl: 4 }}
                      onClick={() => {
                        setSelectedCategory("6");
                        setPage(1);
                        setSearchTerm("");
                      }}
                    >
                      <ListItemText primary={`6" Cakes`} />
                    </ListItemButton>
                    <ListItemButton
                      sx={{ pl: 4 }}
                      onClick={() => {
                        setSelectedCategory("8");
                        setPage(1);
                        setSearchTerm("");
                      }}
                    >
                      <ListItemText primary={`8" Cakes`} />
                    </ListItemButton>
                    <ListItemButton
                      sx={{ pl: 4 }}
                      onClick={() => {
                        setSelectedCategory("10");
                        setPage(1);
                        setSearchTerm("");
                      }}
                    >
                      <ListItemText primary={`10" Cakes`} />
                    </ListItemButton>
                  </List>
                </Collapse>
                <Divider variant="middle" />
                <ListItemButton
                  onClick={() => {
                    setSelectedCategory("other");
                    setPage(1);
                    setSearchTerm("");
                  }}
                >
                  <ListItemText primary="Other" />
                </ListItemButton>
              </List>
            </Box>
          </Grid>

          {matches && <Grid item className={classes.divider} />}

          <Grid item xs={12} sm={matches ? 9 : 12}>
            {pageDisplay && (
              <Grid container justifyContent="flex-end">
                <Pagination count={2} onChange={handlePageChange} page={page} />
              </Grid>
            )}
            <Content
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              products={products}
              allProducts={allProducts}
              loadError={loadError}
              isLoading={isLoading}
            />
            <Box mb={10} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={1} sm={1} />
    </Grid>
  );
};

export default Shop;
