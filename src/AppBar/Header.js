import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { AppBar, Grid, Toolbar, Typography } from "@material-ui/core";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/styles";
import IconButton from "@material-ui/core/IconButton";
import Hidden from "@material-ui/core/Hidden";
import logo from "../Images/logo.png";
import InstagramIcon from "@material-ui/icons/Instagram";
import Edge from "./Edge";

const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: "none",
    backgroundColor: "#FFFFFF",
    color: "#837D7D",
  },
  logo: {
    marginTop: 20,
    marginRight: 10,
    marginBottom: 10,
  },
  menuText: {
    marginRight: 50,
    fontSize: 14,
  },
  hover: {
    "&:hover": {
      borderBottom: "3px solid #9B89A4",
    },
  },
  links: {
    marginLeft: 50,
  },
}));

const Header = (props) => {
  const classes = useStyles();
  return (
    <>
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
          <Edge />
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
