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
import useMediaQuery from "@mui/material/useMediaQuery";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles({
  menuText: {
    marginRight: 50,
    fontSize: 14,
  },
  logo: {
    "&:hover": { backgroundColor: "#290052" },
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
  const matches = useMediaQuery("(min-width:750px)");
  const linkTarget = () => {
    if (window.location.pathname === "/shop") {
      window.location.reload();
    }
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <ScrollTop {...props}>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar style={{ backgroundColor: "#290052", height: 60 }}>
            <Toolbar>
              {matches && (
                <Box display="flex">
                  <Link
                    component={RouterLink}
                    to="/"
                    color="inherit"
                    underline="none"
                  >
                    <IconButton
                      className={classes.logo}
                      color="inherit"
                      disableRipple={true}
                    >
                      <CakeOutlinedIcon />
                      <Box ml={2}>
                        <Typography variant="body1" noWrap>
                          Da Bakeshop
                        </Typography>
                      </Box>
                    </IconButton>
                  </Link>
                </Box>
              )}

              <Grid container justifyContent="center">
                {matches ? (
                  <>
                    <Box display="flex">
                      <Typography className={classes.menuText}>
                        ABOUT
                      </Typography>

                      <Typography className={classes.menuText}>
                        <Link
                          component={RouterLink}
                          to="/shop"
                          onClick={linkTarget}
                          color="inherit"
                          underline="none"
                          className={classes.hover}
                        >
                          SHOP
                        </Link>
                      </Typography>
                      <Typography className={classes.menuText}>
                        CONTACT
                      </Typography>

                      <Typography className={classes.menuText}>
                        CATERING
                      </Typography>
                    </Box>
                  </>
                ) : (
                  <>
                    <Box display="flex">
                      <CakeOutlinedIcon />
                      <Box ml={2}>
                        <Typography variant="body1" noWrap>
                          Da Bakeshop
                        </Typography>
                      </Box>
                    </Box>
                  </>
                )}
              </Grid>
              <Edge />
            </Toolbar>
          </AppBar>
        </Box>
      </ScrollTop>
    </React.Fragment>
  );
};

export default ScrollNavBar;
