import { Grid } from "@material-ui/core";

const NotFound = () => {
  return (
    <Grid container>
      <Grid item xs={1} sm={1} />
      <Grid item xs={10} sm={10}>
        <Grid container justifyContent="center">
          <h3>Sorry, we couldn't find what you were looking for</h3>
        </Grid>
      </Grid>
      <Grid item xs={1} sm={1} />
    </Grid>
  );
};

export default NotFound;
