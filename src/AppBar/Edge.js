import { useState, useContext } from "react";
import { Link as RouterLink } from "react-router-dom";
import Link from "@material-ui/core/Link";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import MenuIcon from "@material-ui/icons/Menu";
import { makeStyles } from "@material-ui/styles";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Badge from "@material-ui/core/Badge";
import AuthContext from "../store/auth-context.js";
import CartContext from "../store/cart-context";
import CartDrawer from "../Cart/CartDrawer";
import useMediaQuery from "@mui/material/useMediaQuery";

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
    padding: 5,
  },
  carticon: {
    padding: 7,
  },
  badge: {
    height: 15,
  },
}));

const Edge = () => {
  const authCtx = useContext(AuthContext);
  const cartCtx = useContext(CartContext);
  const [opened, setOpened] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const classes = useStyles();

  const matches = useMediaQuery("(min-width:750px)");
  const matchesContact = useMediaQuery("(min-width:960px)");
  const matchesCatering = useMediaQuery("(min-width:1280px)");

  const cartTotalItems = cartCtx.items.length;

  const open = Boolean(anchorEl);

  const handleDrawerOpen = () => {
    setOpened(true);
  };

  const handleDrawerClose = () => {
    setOpened(false);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <CartDrawer
        opened={opened}
        handleDrawerClose={handleDrawerClose}
        handleDrawerOpen={handleDrawerOpen}
      />
      <IconButton
        edge="start"
        className={classes.menuButton}
        aria-label="menu"
        onClick={handleMenu}
        color="inherit"
      >
        <MenuIcon />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        open={open}
        onClose={handleClose}
      >
        <Link component={RouterLink} to="/account" color="inherit">
          <MenuItem onClick={handleClose}>Account</MenuItem>
        </Link>

        {!authCtx.isLoggedIn && (
          <Link component={RouterLink} to="/signup" color="inherit">
            <MenuItem onClick={handleClose}>Sign Up</MenuItem>
          </Link>
        )}

        {!matches && (
          <Link component={RouterLink} to="/cart" color="inherit">
            <MenuItem onClick={handleClose}>About</MenuItem>
          </Link>
        )}

        {!matches && (
          <Link component={RouterLink} to="/shop" color="inherit">
            <MenuItem onClick={handleClose}> Shop</MenuItem>
          </Link>
        )}

        {!matchesContact && (
          <Link component={RouterLink} to="/cart" color="inherit">
            <MenuItem onClick={handleClose}>Contact</MenuItem>
          </Link>
        )}

        {!matchesCatering && (
          <Link component={RouterLink} to="/cart" color="inherit">
            <MenuItem onClick={handleClose}>Catering</MenuItem>
          </Link>
        )}
      </Menu>
      <IconButton
        className={classes.carticon}
        onClick={handleDrawerOpen}
        color="inherit"
      >
        <Badge
          badgeContent={cartTotalItems}
          color="secondary"
          classes={{ badge: classes.badge }}
        >
          <ShoppingCartIcon />
        </Badge>
      </IconButton>
    </>
  );
};

export default Edge;
