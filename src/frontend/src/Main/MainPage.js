import { Grid, Box } from "@material-ui/core";
import AboutSection from "./AboutSection";
import Hidden from "@material-ui/core/Hidden";
import MainSwiper from "./Swiper";
import ButtonSection from "./ButtonSection";
import ImageList from "./ImageList";

const MainPage = () => {
  return (
    <>
      <Grid item container>
        <Grid item xs={1} sm={1} />
        <Grid item xs={10} sm={10}>
          <Box mt={5}>
            <Hidden only="xs">
              <MainSwiper />
            </Hidden>
          </Box>
          <Box mt={10} mb={10}>
            <ButtonSection />
          </Box>
        </Grid>
        <Grid item xs={1} sm={1} />
        <AboutSection />
        <Grid container justifyContent="center">
          <Box mt={10} mb={5}>
            <ImageList />
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default MainPage;
