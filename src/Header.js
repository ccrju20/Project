import React from "react";

import { AppBar, Toolbar, Typography } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { makeStyles, withStyles } from "@material-ui/styles";
import IconButton from "@material-ui/core/IconButton";
import { Grid } from "@material-ui/core";
import Hidden from "@material-ui/core/Hidden";
import logo from "./Images/logo.png";
import Badge from "@material-ui/core/Badge";

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
    marginRight: 16,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  logo: {
    marginTop: 8,
  },
}));

const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -8,
    top: 2,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}))(Badge);

const Header = (props) => {
  const classes = useStyles();
  const { cartItems } = props;

  let cartAmount = cartItems.length

  return (
    <AppBar className={classes.root} position="static">
      <Grid>
        <Toolbar>
          <img src={logo} alt="logo" className={classes.logo} />
          <Hidden only="xs">
            <Grid container direction="row" justify="flex-end">
              <Typography className={classes.menuText}>Home</Typography>
              <Typography className={classes.menuText}>About</Typography>
              <Typography className={classes.menuText}>Shop</Typography>
              <Typography className={classes.menuText}>Contact</Typography>
            </Grid>
          </Hidden>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          <IconButton>
            <StyledBadge badgeContent={cartAmount} color="secondary">
              <ShoppingCartIcon />
            </StyledBadge>
          </IconButton>
        </Toolbar>
      </Grid>
    </AppBar>
  );
};

export default Header;
