import { Link as RouterLink } from "react-router-dom";
import { AppBar, Grid, Toolbar, Typography } from "@material-ui/core";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/styles";
import Edge from "./Edge";
import Logo from "../Logo";
import useMediaQuery from "@mui/material/useMediaQuery";

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
  hover: {
    "&:hover": {
      borderBottom: "3px solid #9B89A4",
    },
  },
}));

const Header = (props) => {
  const classes = useStyles();
  const smallToolbar = useMediaQuery("(min-width:345px)");
  const hideAll = useMediaQuery("(min-width:650px)");
  const matchesAbout = useMediaQuery("(min-width:800px)");
  const matchesContact = useMediaQuery("(min-width:960px)");
  const matchesCatering = useMediaQuery("(min-width:1280px)");

  return (
    <>
      <AppBar className={classes.root} position="static">
        {!hideAll && (
          <Grid container justifyContent="center">
            <Logo />
            {!smallToolbar ? (
              <Toolbar>
                <Edge />
              </Toolbar>
            ) : (
              <Edge />
            )}
          </Grid>
        )}
        {hideAll && (
          <Toolbar>
            {hideAll && <Logo />}

            <>
              <Grid container justifyContent="center">
                {matchesAbout && (
                  <Grid item>
                    <Typography className={classes.menuText}>ABOUT</Typography>
                  </Grid>
                )}

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

                {matchesContact && (
                  <Grid item>
                    <Typography className={classes.menuText}>
                      CONTACT
                    </Typography>
                  </Grid>
                )}

                {matchesCatering && (
                  <Grid item>
                    <Typography className={classes.menuText}>
                      CATERING
                    </Typography>
                  </Grid>
                )}
              </Grid>
              {hideAll && <Edge />}
            </>
          </Toolbar>
        )}
      </AppBar>
    </>
  );
};

export default Header;
