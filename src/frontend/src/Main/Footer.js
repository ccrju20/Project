import { Grid, Box, Container, Typography, Link } from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";

function Copyright() {
  return (
    <Typography variant="body2" color="inherit">
      {`© ${new Date().getFullYear()} `}
      Bakeshop
    </Typography>
  );
}

const Footer = () => {
  return (
    <>
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: "auto",
          backgroundColor: "#594B61",
          color: "#FFFFFF",
        }}
      >
        <Container maxWidth="lg">
          <Grid container>
            <Grid item xs={1} />
            <Grid
              container
              item
              xs={12}
              sm={5}
              sx={{ marginTop: 3 }}
            >
              <Typography
                variant="h6"
                sx={{ letterSpacing: 2, marginBottom: 2 }}
              >
                <LocationOnOutlinedIcon
                  sx={{ marginBottom: -0.5, marginRight: 1 }}
                />
                Location & Hours
              </Typography>
              <Box justifyContent="center">
                <Typography variant="overline">
                  123 Test Address, Los Angeles CA 92831
                  <br />
                  Phone: (310) 555-5555
                  <br />
                  Hours:
                  <br />
                  Mon - Fri 9AM to 7:30PM
                  <br />
                  Sat & Sun 8AM to 7:30PM
                </Typography>
              </Box>
            </Grid>
            <Grid
              container
              item
              xs={12}
              sm={3}
              sx={{ marginTop: 3 }}
            >
              <Typography variant="h6" sx={{ letterSpacing: 2 }}>
                <MailOutlineIcon sx={{ marginBottom: -0.5, marginRight: 1 }} />
                Contact
              </Typography>

              <Grid container item xs={12}>
                <Box justifyContent="center">
                  <Typography variant="overline">Send us a message!</Typography>
                  <br />
                  bakeshop@bakeshop.com
                </Box>
              </Grid>
            </Grid>
            <Grid
              item
              xs={12}
              sm={2}
              container
              justifyContent="center"
              spacing={2}
              sx={{ marginTop: 1 }}
            >
              <Grid item>
                <InstagramIcon fontSize="large" />
              </Grid>

              <Grid item>
                <FacebookOutlinedIcon fontSize="large" />
              </Grid>
            </Grid>
            <Grid item xs={1} />
          </Grid>
        </Container>
        <Grid container justifyContent="center">
          <Box mt={3}>
            <Copyright />
          </Box>
        </Grid>
      </Box>
    </>
  );
};

export default Footer;
