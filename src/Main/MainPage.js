import { Grid, Box } from "@material-ui/core";
import AboutSection from "./AboutSection";
import Hidden from "@material-ui/core/Hidden";
import MainSwiper from "./Swiper";
import ButtonSection from "./ButtonSection";

const MainPage = () => {

  return (
    <Grid item container>
      <Grid item xs={1} sm={1} />
      <Grid item xs={10} sm={10}>
        <Box mt={5}>
            <Hidden only="xs">
              <MainSwiper />
            </Hidden>
        </Box>
        <ButtonSection />
      </Grid>
      <Grid item xs={1} sm={1} />
      <AboutSection />
    </Grid>
  );
};

export default MainPage;
