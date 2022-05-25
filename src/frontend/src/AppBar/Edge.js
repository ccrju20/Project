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
import MenuDrawer from "./MenuDrawer";
import AccountMenu from "./AccountMenu";

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
  hoverSmall: {
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
}));

const Edge = () => {
  const authCtx = useContext(AuthContext);
  const cartCtx = useContext(CartContext);
  const [opened, setOpened] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const classes = useStyles();

  const hideAll = useMediaQuery("(min-width:650px)");
  const matchesAbout = useMediaQuery("(min-width:800px)");
  const matches = useMediaQuery("(min-width:750px)");
  const matchesContact = useMediaQuery("(min-width:960px)");
  const matchesCatering = useMediaQuery("(min-width:1280px)");

  const cartTotalItems = cartCtx.items.length;

  const open = Boolean(anchorEl);
  const [menuDrawerOpen, setMenuDrawerOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpened(true);
  };

  const handleDrawerClose = () => {
    setOpened(false);
  };

  const handleMenu = (event) => {
    matches ? setAnchorEl(event.currentTarget) : setMenuDrawerOpen(true);
  };

  const handleMenuClose = () => {
    setMenuDrawerOpen(false);
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
      <MenuDrawer
        opened={menuDrawerOpen}
        handleMenuClose={handleMenuClose}
        handleMenuOpen={handleMenu}
      />
      {authCtx.isLoggedIn && <AccountMenu />}
      <IconButton
        edge="start"
        className={!hideAll ? classes.hoverSmall : classes.menuButton}
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
        {!authCtx.isLoggedIn && (
          <Link
            component={RouterLink}
            to="/account"
            color="inherit"
            underline="none"
          >
            <MenuItem onClick={handleClose}>Log In</MenuItem>
          </Link>
        )}

        {!authCtx.isLoggedIn && (
          <Link
            component={RouterLink}
            to="/signup"
            color="inherit"
            underline="none"
          >
            <MenuItem onClick={handleClose}>Sign Up</MenuItem>
          </Link>
        )}

        {!matchesAbout && (
          <Link
            component={RouterLink}
            to="/cart"
            color="inherit"
            underline="none"
          >
            <MenuItem onClick={handleClose}>About</MenuItem>
          </Link>
        )}

        {!matches && (
          <Link
            component={RouterLink}
            to="/shop"
            color="inherit"
            underline="none"
          >
            <MenuItem onClick={handleClose}> Shop</MenuItem>
          </Link>
        )}

        {!matchesContact && (
          <Link
            component={RouterLink}
            to="/contact"
            color="inherit"
            underline="none"
          >
            <MenuItem onClick={handleClose}>Contact</MenuItem>
          </Link>
        )}

        {!matchesCatering && (
          <Link
            component={RouterLink}
            to="/coffee"
            color="inherit"
            underline="none"
          >
            <MenuItem onClick={handleClose}>Coffee</MenuItem>
          </Link>
        )}
      </Menu>
      <IconButton
        className={!hideAll ? classes.hoverSmall : classes.carticon}
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
