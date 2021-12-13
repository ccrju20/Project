import * as React from "react";
import PropTypes from "prop-types";
import { Grid, Box, Typography } from "@material-ui/core";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Slide from "@mui/material/Slide";
import { Link as RouterLink } from "react-router-dom";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Edge from "./Edge";
import CakeOutlinedIcon from "@mui/icons-material/CakeOutlined";

const useStyles = makeStyles({
  menuText: {
    marginRight: 50,
    fontSize: 14,
  },
});

function ScrollTop(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  return (
    <Slide direction="down" in={trigger}>
      {children}
    </Slide>
  );
}

ScrollTop.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};

const ScrollNavBar = (props) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <ScrollTop {...props}>
        <AppBar style={{ backgroundColor: "#290052", height: 50 }}>
          <Toolbar sx={{ marginTop: -1}}>
            <CakeOutlinedIcon />
            <Box ml={2}>
              <Typography variant="body1" noWrap>
                Da Bakeshop
              </Typography>
            </Box>
            <Grid container justifyContent="center">
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

              <Grid item>
                <Typography className={classes.menuText}>CONTACT</Typography>
              </Grid>

              <Grid item>
                <Typography className={classes.menuText}>CATERING</Typography>
              </Grid>
            </Grid>
            <Edge />
          </Toolbar>
        </AppBar>
      </ScrollTop>
    </React.Fragment>
  );
};

export default ScrollNavBar;
