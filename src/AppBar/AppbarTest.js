import * as React from "react";
import PropTypes from "prop-types";
import { Grid } from "@material-ui/core";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Slide from "@mui/material/Slide";
import { Link as RouterLink } from "react-router-dom";
import Link from "@material-ui/core/Link";

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

export default function BackToTop(props) {
  return (
    <React.Fragment>
      <CssBaseline />
      <ScrollTop {...props}>
        <AppBar style={{ backgroundColor: "#290052", height: 50 }}>
          <Grid container justifyContent="center">
            <Toolbar>
              <Typography variant="h6" component="div">
                <Grid container spacing={3}>
                  <Grid item>
                    <Typography>ABOUT</Typography>
                  </Grid>

                  <Grid item>
                    <Typography>SHOP</Typography>
                  </Grid>

                  <Grid item>
                    <Typography>CONTACT</Typography>
                  </Grid>

                  <Grid item>
                    <Typography>CATERING</Typography>
                  </Grid>
                </Grid>
              </Typography>
            </Toolbar>
          </Grid>
        </AppBar>
      </ScrollTop>
    </React.Fragment>
  );
}
