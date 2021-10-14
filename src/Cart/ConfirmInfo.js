import { React, useContext } from "react";

import Button from "@material-ui/core/Button";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import UserInfoContext from "../store/userinfo-context";

const useStyles = makeStyles((theme) => ({
  button: {
    border: "3px solid",
    width: "180px",
    color: "#837D7D",
  },
}));

const ConfirmInfo = (props) => {
  const classes = useStyles();
  const userContext = useContext(UserInfoContext);

  const {
    firstname,
    lastname,
    email,
    phone,
    address,
    city,
    state,
    postal,
  } = userContext.info;

  const onConfirmHandler = () => {
    props.confirmation(true);
    console.log(userContext.info);
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <h2>Please confirm your information below</h2>
      </Grid>
      <br></br>
      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={5}>
            <h5>
              Name: {firstname} {lastname}
            </h5>
            <h5>Email: {email}</h5>
            <h5>Phone: {phone}</h5>
          </Grid>

          <Grid item xs={7}>
            <h5>Shipping Address: </h5>
            <h5>{address}</h5>
            <h5>
              {city}, {state} {postal}
            </h5>
          </Grid>
        </Grid>
      </Grid>
      <Button
        onClick={onConfirmHandler}
        variant="outlined"
        size="small"
        className={classes.button}
        type="submit"
      >
        Order
      </Button>
    </Grid>
  );
};

export default ConfirmInfo;
