import React from "react";
import { Grid, Box } from "@material-ui/core";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import NumberFormat from "react-number-format";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  info: {
    width: "100ch",
  },
  addressTextField: {
    width: "35ch",
  },
  accordionRoot: {
    width: "90%",
  },
}));

const CartSandbox = () => {
  const classes = useStyles();

  return (
    <>
      <Grid container>
        <Grid item xs={2} sm={2} />
        <Grid item xs={8} sm={8}>
          <Accordion className={classes.accordionRoot}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              Contact Info
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    id="standard-basic"
                    variant="filled"
                    label="First Name"
                    required
                    // value={enteredFirstName}
                    // onChange={firstNameChangeHandler}
                    // error={firstNameValidError}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    id="standard-basic"
                    variant="filled"
                    label="Last Name"
                    required
                    // value={enteredLastName}
                    // onChange={lastNameChangeHandler}
                    // error={lastNameValidError}
                  />
                </Grid>
              </Grid>
            </AccordionDetails>
            <AccordionDetails>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    id="standard-basic"
                    variant="filled"
                    label="Email"
                    required
                    // value={enteredFirstName}
                    // onChange={firstNameChangeHandler}
                    // error={firstNameValidError}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    id="standard-basic"
                    variant="filled"
                    label="Phone"
                    required
                    // value={enteredLastName}
                    // onChange={lastNameChangeHandler}
                    // error={lastNameValidError}
                  />
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
          <Accordion className={classes.accordionRoot}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              Shipping Address
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={7}>
                  <TextField
                    fullWidth
                    id="standard-basic"
                    variant="filled"
                    label="Address"
                    required
                    // value={enteredFirstName}
                    // onChange={firstNameChangeHandler}
                    // error={firstNameValidError}
                  />
                </Grid>
                <Grid item xs={12} sm={5}>
                  <TextField
                    fullWidth
                    id="standard-basic"
                    variant="filled"
                    label="Address 2"
                    // value={enteredLastName}
                    // onChange={lastNameChangeHandler}
                    // error={lastNameValidError}
                  />
                </Grid>
              </Grid>
            </AccordionDetails>
            <AccordionDetails>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    id="standard-basic"
                    variant="filled"
                    label="City"
                    required
                    // value={enteredLastName}
                    // onChange={lastNameChangeHandler}
                    // error={lastNameValidError}
                  />
                </Grid>
                <Grid item xs={12} sm={2}>
                  <TextField
                    fullWidth
                    id="standard-basic"
                    variant="filled"
                    label="State"
                    required
                    // value={enteredLastName}
                    // onChange={lastNameChangeHandler}
                    // error={lastNameValidError}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    id="standard-basic"
                    variant="filled"
                    label="Postal Code"
                    required
                    // value={enteredFirstName}
                    // onChange={firstNameChangeHandler}
                    // error={firstNameValidError}
                  />
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Grid>
        <Grid item xs={2} sm={2} />
      </Grid>
    </>
  );
};

export default CartSandbox;
