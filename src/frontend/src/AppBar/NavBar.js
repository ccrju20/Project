import { AppBar, Grid, Toolbar } from "@mui/material";
import ScrollNavBar from "./ScrollNavBar";
import Header from "./Header";

const NavBar = () => {
  return (
    <>
      <ScrollNavBar />
      <Grid container>
        <Grid item xs={1} sm={1} />
        <Grid item xs={10} sm={10} mt={10}>
          <Header />
          <AppBar
            sx={{
              boxShadow: "none",
              backgroundColor: "#594B61",
              borderRadius: "3px",
            }}
            position="static"
          >
            <Toolbar></Toolbar>
          </AppBar>
        </Grid>
        <Grid item xs={1} sm={1} />
      </Grid>
    </>
  );
};

export default NavBar;
