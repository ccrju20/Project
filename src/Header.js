import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { makeStyles } from "@material-ui/styles";
import IconButton from "@material-ui/core/IconButton";
import { Grid } from "@material-ui/core";
import Hidden from "@material-ui/core/Hidden";

const useStyles = makeStyles((theme) => ({
  typographyStyles: {
    flex: 1,
  },
  menuText: {
    marginRight: 16,
  },
  appBar: {
    alignItems: "center",
  },
  toolBar: {
    justifyContent: "center",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));

const Header = () => {
  const classes = useStyles();

  return (
    <AppBar position="static">
      <Grid xs={12}>
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit">
            <MenuIcon />
          </IconButton>
          <Hidden only="xs">
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
            >
              <Typography className={classes.menuText}>Home</Typography>
              <Typography className={classes.menuText}>About</Typography>
              <Typography className={classes.menuText}>Shop</Typography>
              <Typography className={classes.menuText}>Contact</Typography>
            </Grid>
          </Hidden>
          <ShoppingCartIcon />
        </Toolbar>
      </Grid>
    </AppBar>
  );
};

export default Header;
