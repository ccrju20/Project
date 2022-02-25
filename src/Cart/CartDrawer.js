import { useContext } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Grid, Typography } from "@material-ui/core";
import Link from "@material-ui/core/Link";
import CartContext from "../store/cart-context";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import IconButton from "@material-ui/core/IconButton";
import { styled } from "@material-ui/styles";
import CartCheck from "../Cart/CartCheck";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ShoppingBasketTwoToneIcon from "@mui/icons-material/ShoppingBasketTwoTone";

const drawerWidth = 360;

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-start",
}));

const CartDrawer = (props) => {
  const cartCtx = useContext(CartContext);
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2).replace("-0", "0")}`;
  const cartTotalItems = cartCtx.items.length;

  const cartItemDeleteHandler = (option) => {
    cartCtx.deleteItem(option);
  };
  const cartItemAddHandler = (product, amount) => {
    cartCtx.addItem({ ...product, amount: amount });
  };

  return (
    <Box sx={{ display: "flex" }}>
      <SwipeableDrawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
          },
        }}
        anchor="right"
        open={props.opened}
        onClose={props.handleDrawerClose}
        onOpen={props.handleDrawerOpen}
      >
        <DrawerHeader>
          <IconButton onClick={props.handleDrawerClose}>
            <ArrowForwardIosIcon />
          </IconButton>
        </DrawerHeader>

        <Grid container justifyContent="center">
          <Box>
            <Typography variant="h4">
              Cart <ShoppingBasketTwoToneIcon fontSize="large" />
            </Typography>
          </Box>

          <Grid item xs={12}>
            <Grid container justifyContent="center">
              <Box mt={2} mb={5}>
                <Typography variant="body1">
                  You have {cartTotalItems} item(s) in your cart
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Grid>

        <Grid container>
          {cartCtx.items.map((product) => (
            <CartCheck
              key={product.option}
              name={product.name}
              price={product.price}
              image={product.img}
              amount={product.amount}
              onAdd={cartItemAddHandler.bind(null, product)}
              onDelete={cartItemDeleteHandler.bind(null, product.option)}
            />
          ))}
        </Grid>

        {cartTotalItems === 0 ? (
          <Grid container>
            <Grid item xs={1} />
            <Grid item xs={10}>
              <Link
                component={RouterLink}
                to="/shop"
                color="inherit"
                underline="none"
              >
                <Button
                  onClick={props.handleDrawerClose}
                  variant="contained"
                  fullWidth
                  type="submit"
                  sx={{
                    backgroundColor: "#290052",
                    "&:hover": {
                      backgroundColor: "#430085",
                    },
                  }}
                >
                  Continue Shopping
                </Button>
              </Link>
            </Grid>
            <Grid item xs={1} />
          </Grid>
        ) : (
          <>
            <ListItem secondaryAction={`${totalAmount}`}>Subtotal:</ListItem>
            <ListItem secondaryAction={`${totalAmount}`}>Total:</ListItem>
            <Box mt={2}>
              <Typography align="center" variant="h5">
                Total: {totalAmount}
              </Typography>
            </Box>
          </>
        )}

        <Box mt={3} mb={2}>
          <Grid container>
            <Grid item xs={1} />
            <Grid item xs={10}>
              <Link
                component={RouterLink}
                to="/cart"
                color="inherit"
                underline="none"
              >
                <Button
                  onClick={props.handleDrawerClose}
                  variant="contained"
                  fullWidth
                  type="submit"
                  sx={{
                    backgroundColor: "#290052",
                    "&:hover": {
                      backgroundColor: "#430085",
                    },
                  }}
                >
                  Go to Cart
                </Button>
              </Link>

              {cartTotalItems > 0 && (
                <Box mt={1} mb={2}>
                  <Link
                    component={RouterLink}
                    to="/check"
                    color="inherit"
                    underline="none"
                  >
                    <Button
                      onClick={props.handleDrawerClose}
                      variant="contained"
                      fullWidth
                      type="submit"
                      sx={{
                        backgroundColor: "#290052",
                        "&:hover": {
                          backgroundColor: "#430085",
                        },
                      }}
                    >
                      Checkout
                    </Button>
                  </Link>
                </Box>
              )}
            </Grid>
            <Grid item xs={1} />
          </Grid>
        </Box>
      </SwipeableDrawer>
    </Box>
  );
};

export default CartDrawer;
