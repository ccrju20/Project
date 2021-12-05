import { useState, useContext } from "react";
import { Link as RouterLink } from "react-router-dom";
import { AppBar, Grid, Toolbar, Typography } from "@material-ui/core";
import Link from "@material-ui/core/Link";
import MenuIcon from "@material-ui/icons/Menu";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { makeStyles, withStyles } from "@material-ui/styles";
import IconButton from "@material-ui/core/IconButton";
import Hidden from "@material-ui/core/Hidden";
import logo from "./Images/logo.png";
import Badge from "@material-ui/core/Badge";
import InstagramIcon from "@material-ui/icons/Instagram";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import AuthContext from "../store/auth-context.js";
import CartContext from "../store/cart-context";

const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: "none",
    backgroundColor: "#FFFFFF",
    color: "#837D7D",
  },
  menuText: {
    marginRight: 50,
    fontSize: 14,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    padding: 1,
  },
  logo: {
    marginTop: 20,
    marginRight: 10,
    marginBottom: 10,
  },
  hover: {
    "&:hover": {
      borderBottom: "3px solid #9B89A4",
    },
  },
  links: {
    marginLeft: 50,
  },
  carticon: {
    padding: 1,
  },
}));

const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -8,
    top: 2,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}))(Badge);

const Header = (props) => {
  const classes = useStyles();
  const authCtx = useContext(AuthContext);
  const cartCtx = useContext(CartContext);

  const numberOfCartItems = cartCtx.items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar className={classes.root} position="static">
      <Toolbar>
        <Link component={RouterLink} to="/">
          <img src={logo} alt="logo" className={classes.logo} />
        </Link>
        <Hidden smDown={true}>
          <IconButton>
            <InstagramIcon />
          </IconButton>
        </Hidden>

        <Hidden only="xs">
          <Grid container className={classes.links} justifyContent="center">
            <Grid item>
              <Typography className={classes.menuText}>ABOUT</Typography>
            </Grid>

            <Grid item>
              <Typography className={classes.menuText}>
                <Link
                  component={RouterLink}
                  to="/shop"
                  color="inherit"
                  underline="none"
                  className={classes.hover}
                >
                  SHOP
                </Link>
              </Typography>
            </Grid>

            <Hidden smDown={true}>
              <Grid item>
                <Typography className={classes.menuText}>CONTACT</Typography>
              </Grid>
            </Hidden>

            <Hidden smDown={true}>
              <Grid item>
                <Typography className={classes.menuText}>CATERING</Typography>
              </Grid>
            </Hidden>
          </Grid>
        </Hidden>
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

          <Hidden smUp={true}>
            <Link component={RouterLink} to="/cart" color="inherit">
              <MenuItem onClick={handleClose}>About</MenuItem>
            </Link>
            <Link component={RouterLink} to="/shop" color="inherit">
              <MenuItem onClick={handleClose}> Shop</MenuItem>
            </Link>
            <Link component={RouterLink} to="/cart" color="inherit">
              <MenuItem onClick={handleClose}>Contact</MenuItem>
            </Link>
          </Hidden>
        </Menu>
        <IconButton className={classes.carticon}>
          <Link component={RouterLink} to="/cart" color="inherit">
            <StyledBadge badgeContent={numberOfCartItems} color="secondary">
              <ShoppingCartIcon />
            </StyledBadge>
          </Link>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
