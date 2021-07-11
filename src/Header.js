import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";

import { AppBar, Toolbar, Typography } from "@material-ui/core";
import Link from "@material-ui/core/Link";
import MenuIcon from "@material-ui/icons/Menu";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { makeStyles, withStyles } from "@material-ui/styles";
import IconButton from "@material-ui/core/IconButton";
import { Grid } from "@material-ui/core";
import Hidden from "@material-ui/core/Hidden";
import logo from "./Images/logo.png";
import Badge from "@material-ui/core/Badge";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: "none",
    backgroundColor: "#FFFFFF",
    color: "#837D7D",
  },
  typographyStyles: {
    flex: 1,
  },
  menuText: {
    marginRight: 60,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  logo: {
    marginTop: 20,
    marginRight: 10,
    marginBottom: 10,
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
  const { cartItems } = props;

  let cartAmount = cartItems.length;

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
      <Grid>
        <Toolbar>
          <img src={logo} alt="logo" className={classes.logo} />
          <Hidden only="xs">
            <IconButton>
              <InstagramIcon />
            </IconButton>
            <IconButton>
              <FacebookIcon />
            </IconButton>
            <Grid container direction="row" justify="center">
              <Typography className={classes.menuText}>
                <Link component={RouterLink} to="/" color="inherit">
                  Home
                </Link>
              </Typography>
              <Typography className={classes.menuText}>About</Typography>
              <Typography className={classes.menuText}>Shop</Typography>
              <Typography className={classes.menuText}>Contact</Typography>
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
          </IconButton>{" "}
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={open}
            onClose={handleClose}
          >
            {" "}
            <Link component={RouterLink} to="/account" color="inherit">
              <MenuItem onClick={handleClose}>My account</MenuItem>{" "}
            </Link>
          </Menu>
          <IconButton>
            <Link component={RouterLink} to="/cart" color="inherit">
              <StyledBadge badgeContent={cartAmount} color="secondary">
                <ShoppingCartIcon />
              </StyledBadge>
            </Link>
          </IconButton>
        </Toolbar>
      </Grid>
    </AppBar>
  );
};

export default Header;
