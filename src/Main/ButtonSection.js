import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Grid, Box } from "@material-ui/core";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  button: {
    border: "3px solid",
    width: "180px",
    color: "#837D7D",
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20
  },
}));

const ButtonSection = () => {
  const classes = useStyles();

  return (
    <Box mt={5} mb={12}>
      <Grid container>
        <Grid item xs={2} sm={1} />
        <Grid item xs={8} sm={10}>
          <Grid item container justifyContent="center">
            <Grid item>
              <Button
                variant="outlined"
                size="small"
                className={classes.button}
              >
                Catering
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="outlined"
                size="small"
                className={classes.button}
              >
                Baked Goods
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="outlined"
                size="small"
                className={classes.button}
              >
                Cafe Shop
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={2} sm={1} />
      </Grid>
    </Box>
  );
};

export default ButtonSection;
