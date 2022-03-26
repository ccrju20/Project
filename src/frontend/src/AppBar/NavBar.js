import { AppBar, Grid, Toolbar } from "@material-ui/core";
import ScrollNavBar from "./ScrollNavBar";
import Header from "./Header";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    boxShadow: "none",
    backgroundColor: "#594B61",
    borderRadius: "7px", //#9B89A4
  },
});

const NavBar = () => {
  const classes = useStyles();

  return (
    <>
      <ScrollNavBar />
      <Grid container>
        <Grid item xs={1} sm={1} />
        <Grid item xs={10} sm={10}>
          <Header />
          <AppBar className={classes.root} position="static">
            <Toolbar></Toolbar>
          </AppBar>
        </Grid>
        <Grid item xs={1} sm={1} />
      </Grid>
    </>
  );
};

export default NavBar;
