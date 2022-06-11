import { makeStyles } from "@material-ui/core/styles";
import { Grid, Box, Typography, Card, CardMedia } from "@mui/material";
import LocalCafeOutlinedIcon from "@mui/icons-material/LocalCafeOutlined";

const useStyles = makeStyles({
  root: {
    backgroundColor: "#4E4B61",
    color: "#FFFFFF",
    marginBottom: 80,
  },
  about: {
    paddingTop: "60px",
    paddingBottom: "60px",
    paddingLeft: "30px",
    paddingRight: "30px",
  },
  aboutPic: { padding: "0px" },
});

const Coffee = () => {
  const classes = useStyles();

  return (
    <>
      <Grid container justifyContent="center" mt={7}>
        <Typography align="center" variant="h4" color="text.secondary">
          Coming Soon!
          <LocalCafeOutlinedIcon sx={{ marginBottom: -0.5, marginLeft: 1 }} />
        </Typography>
      </Grid>
      <Box mt={7}>
        <Card
          sx={{
            borderRadius: 0,
            boxShadow: "none",
            "&:hover": {
              opacity: 0.95,
            },
          }}
        >
          <CardMedia
            height={575}
            component="img"
            image="https://images.unsplash.com/photo-1524350876685-274059332603?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=871"
            alt="item"
          />
        </Card>
        <Box mt={20} mb={20}>
          <Typography align="center" variant="h4" color="text.secondary">
            Subscribe to our coffee beans
          </Typography>
        </Box>
      </Box>
      <Box mt={10} mb={10}>
        <Grid item container className={classes.root} mb={30}>
          <Grid item xs={12}>
            <Grid item container>
              <Grid item xs={12} sm={6} className={classes.about}>
                <Box mt={3}>
                  <Typography
                    variant="h5"
                    align="center"
                    sx={{ letterSpacing: 2, marginBottom: 5, marginTop: 3 }}
                  >
                    Ethically sourced from local regions
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ letterSpacing: 2, marginBottom: 3 }}
                  >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} className={classes.aboutPic}>
                <Card
                  sx={{
                    borderRadius: 0,
                    boxShadow: "none",
                    opacity: 0.9,
                    "&:hover": {
                      opacity: 1,
                    },
                  }}
                >
                  <CardMedia
                    height={400}
                    component="img"
                    image="https://images.unsplash.com/photo-1552346989-e069318e20a5?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1474"
                    alt="item"
                  />
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Coffee;
