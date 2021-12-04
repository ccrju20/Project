import { Grid, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AboutSection from "./Main/AboutSection";
import Hidden from "@material-ui/core/Hidden";
import Section from "./Main/Section";

const useStyles = makeStyles({
  divider: {
    marginTop: "-70px",
    marginBottom: "50px",
  },
});

const MainPage = () => {
  const classes = useStyles();

  return (
    <Grid item container>
      <Grid item xs={1} sm={1} />
      <Grid item xs={10} sm={10}>
        <Box mt={10}>
          <div className={classes.divider}>
            <Hidden only="xs">
              <Section />
            </Hidden>
          </div>
        </Box>
      </Grid>
      <Grid item xs={1} sm={1} />
      <AboutSection />
    </Grid>
  );
};

export default MainPage;
