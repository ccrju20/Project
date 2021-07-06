import React from "react";

import { AppBar, Toolbar, Typography } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { makeStyles } from "@material-ui/styles";
import IconButton from "@material-ui/core/IconButton";
import { Grid } from "@material-ui/core";
import Hidden from "@material-ui/core/Hidden";
import logo from './Images/logo.png';


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
  }
}));

const Header = () => {
  const classes = useStyles();

  return (
    <AppBar className={classes.root} position="static">
      <Grid>
        <Toolbar>
        <img src={logo} alt="logo" className={classes.logo}/>
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
          <ShoppingCartIcon />
        </Toolbar>
      </Grid>
    </AppBar>
  );
};

export default Header;
