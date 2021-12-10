import { useContext } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Grid, Typography } from "@material-ui/core";

import Link from "@material-ui/core/Link";
import CartContext from "../store/cart-context";
import Button from "@material-ui/core/Button";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { styled } from "@material-ui/styles";
import CartCheck from "../Cart/CartCheck";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { makeStyles } from "@material-ui/core/styles";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ShoppingBasketTwoToneIcon from "@mui/icons-material/ShoppingBasketTwoTone";

const useStyles = makeStyles((theme) => ({
  button: {
    backgroundColor: "#41166c",
    "&:hover": {
      backgroundColor: "#290052",
    },
  },
}));

const drawerWidth = 360;

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-start",
}));

// const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
//   ({ theme, open }) => ({
//     flexGrow: 1,
//     padding: theme.spacing(3),
//     transition: theme.transitions.create("margin", {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.leavingScreen,
//     }),
//     marginRight: -drawerWidth,
//     ...(open && {
//       transition: theme.transitions.create("margin", {
//         easing: theme.transitions.easing.easeOut,
//         duration: theme.transitions.duration.enteringScreen,
//       }),
//       marginRight: 0,
//     }),
//   })
// );

const CartDrawer = (props) => {
  const cartCtx = useContext(CartContext);
  const classes = useStyles();
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2).replace("-0", "0")}`;
  const cartTotalItems = cartCtx.items.length;

  const cartItemDeleteHandler = (id) => {
    cartCtx.deleteItem(id);
  };
  const cartItemAddHandler = (product, amount) => {
    cartCtx.addItem({ ...product, amount: amount });
  };

  return (
    <Box sx={{ display: "flex" }}>
      {/* <Main open={props.opened}>
        <DrawerHeader />
      </Main> */}
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

        {/* <CartCheck />  */}

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
            // <Grid item xs={12} key={product.id}>
            <CartCheck
              key={product.id}
              name={product.name}
              price={product.price}
              image={product.img}
              amount={product.amount}
              onAdd={cartItemAddHandler.bind(null, product)}
              onDelete={cartItemDeleteHandler.bind(null, product.id)}
            />
            // </Grid>
          ))}
        </Grid>
        <ListItem secondaryAction={`${totalAmount}`}>Subtotal:</ListItem>
        <ListItem secondaryAction={`${totalAmount}`}>Total:</ListItem>
        <Box mt={2}>
          <Typography align="center" variant="h5">
            Total: {totalAmount}
          </Typography>
        </Box>
        <Box mt={3} mb={2}>
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
              style={{
                color: "white",
                backgroundColor: "#290052",
                "&:hover": {
                  backgroundColor: "#290052",
                },
              }}
            >
              Go to Cart
            </Button>
          </Link>
        </Box>
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
              style={{
                color: "white",
                backgroundColor: "#290052",
                "&:hover": {
                  backgroundColor: "#290052",
                },
              }}
            >
              Checkout
            </Button>
          </Link>
        </Box>
      </SwipeableDrawer>
    </Box>
  );
};

export default CartDrawer;
