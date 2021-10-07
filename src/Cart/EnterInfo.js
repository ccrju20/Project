import React from "react";
import useForm from "./useForm";
import validate from "./validateInfo";

import { Grid } from "@material-ui/core";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
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
  accordionRoot: {
    width: "95%",
  },
  button: {
    border: "3px solid",
    width: "180px",
    color: "#837D7D",
  },
}));

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      format="+1 (###) ###-####"
      mask="_"
    />
  );
}

const EnterInfo = ({ submitForm }) => {
  const { handleChange, values, handleSubmit, errors } = useForm(
    submitForm,
    validate
  );

  const classes = useStyles();

  return (
    <>
      <h3>Please enter your info </h3>
      <form onSubmit={handleSubmit}>
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
                  name="firstname"
                  // required
                  value={values.firstname}
                  onChange={handleChange}
                />
                {errors.firstname && <p>{errors.firstname}</p>}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="standard-basic"
                  variant="filled"
                  label="Last Name"
                  name="lastname"
                  // required
                  value={values.lastname}
                  onChange={handleChange}
                />
                {errors.lastname && <p>{errors.lastname}</p>}
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
                  type="email"
                  name="email"
                  // required
                  value={values.email}
                  onChange={handleChange}
                />
                {errors.email && <p>{errors.email}</p>}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  // id="standard-basic"
                  id="formatted-numberformat-input"
                  variant="filled"
                  label="Phone"
                  name="phone"
                  // required
                  InputProps={{
                    inputComponent: NumberFormatCustom,
                  }}
                  value={values.phone}
                  onChange={handleChange}
                />
                {errors.phone && <p>{errors.phone}</p>}
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
                  name="address"
                  // required
                  value={values.address}
                  onChange={handleChange}
                />
                {errors.address && <p>{errors.address}</p>}
              </Grid>
              <Grid item xs={12} sm={5}>
                <TextField
                  fullWidth
                  id="standard-basic"
                  variant="filled"
                  label="Address 2"
                  name="addresstwo"
                  value={values.addresstwo}
                  onChange={handleChange}
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
                  name="city"
                  // required
                  value={values.city}
                  onChange={handleChange}
                />
                {errors.city && <p>{errors.city}</p>}
              </Grid>
              <Grid item xs={12} sm={2}>
                <TextField
                  fullWidth
                  id="standard-basic"
                  variant="filled"
                  label="State"
                  name="state"
                  // required
                  value={values.state}
                  onChange={handleChange}
                />
                {errors.state && <p>{errors.state}</p>}
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  id="standard-basic"
                  variant="filled"
                  label="Postal Code"
                  name="postal"
                  // required
                  value={values.postal}
                  onChange={handleChange}
                />
                {errors.postal && <p>{errors.postal}</p>}
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
            Payment
          </AccordionSummary>
        </Accordion>
        <br></br>
        <Button
          variant="outlined"
          size="small"
          className={classes.button}
          type="submit"
        >
          Order
        </Button>
      </form>
    </>
  );
};

export default EnterInfo;
