import { Grid } from "@material-ui/core";

const FinalCart = () => {
  return (
    <Grid container>
      <Grid item xs={3} />
      <Grid item xs={6}>
        <h1> Checkout </h1>
      </Grid>
      <Grid item xs={3} />
    </Grid>
  );
};

export default FinalCart;
