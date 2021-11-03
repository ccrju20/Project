import { React, useState, useEffect } from "react";
import useForm from "./useForm";
import validate from "./validateInfo";

import { Grid, Box, Typography } from "@material-ui/core";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import NumberFormat from "react-number-format";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import BasicDateTimePicker from "./DateTimePicker";
import BasicDatePicker from "./DatePicker";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import CustomizedSwitch from "./Switch";
import DirectionsCarFilledOutlinedIcon from "@mui/icons-material/DirectionsCarFilledOutlined";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  accordionRoot: {
    width: "100%",
  },
  button: {
    border: "3px solid",
    width: "180px",
    color: "#837D7D",
  },
  divider: {
    marginTop: 50,
    marginBottom: 50,
    width: "80%",
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

const EnterInfo = ({ submitForm }, props) => {
  const {
    handleChange,
    values,
    handleSubmit,
    errors,
    handlePickup,
    handleDateTime,
  } = useForm(submitForm, validate);

  const [pickup, setPickup] = useState(false);
  const [contactInfoError, setContactInfoError] = useState(false);
  const [shippingInfoError, setShippingInfoError] = useState(false);
  const [asapOrScheduled, setAsapOrScheduled] = useState("ASAP");
  const [dateValue, setDateValue] = useState(null);

  const handleDateVal = (newValue) => {
    setDateValue(newValue);
    handleDateTime(newValue);
  };

  const handleSwitch = (event) => {
    setPickup(event.target.checked);
    handlePickup(event.target.checked);
  };

  const handleRadio = (event) => {
    setAsapOrScheduled(event.target.value);
  };
  console.log(asapOrScheduled);

  const classes = useStyles();

  useEffect(() => {
    if (errors.firstname || errors.lastname || errors.email || errors.phone) {
      setContactInfoError(true);
    } else {
      setContactInfoError(false);
    }

    if (errors.address || errors.city || errors.state || errors.postal) {
      setShippingInfoError(true);
    } else {
      setShippingInfoError(false);
    }
  }, [
    errors.firstname,
    errors.lastname,
    errors.email,
    errors.phone,
    errors.address,
    errors.city,
    errors.state,
    errors.postal,
  ]);

  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 2);
  minDate.setHours(8, 0);

  useEffect(() => {
    setDateValue(minDate);
  }, []);

  return (
    <>
      <h3>Please enter your info </h3>
      <form onSubmit={handleSubmit}>
        <Accordion className={classes.accordionRoot} defaultExpanded={true}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            Contact Info
            {contactInfoError && (
              <ErrorOutlineIcon sx={{ marginLeft: 2, marginTop: -0.25 }} />
            )}
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
                  value={values.firstname}
                  onChange={handleChange}
                />
                {errors.firstname && (
                  <Typography color="error" variant="subtitle2">
                    {errors.firstname}
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="standard-basic"
                  variant="filled"
                  label="Last Name"
                  name="lastname"
                  value={values.lastname}
                  onChange={handleChange}
                />
                {errors.lastname && (
                  <Typography color="error" variant="subtitle2">
                    {errors.lastname}
                  </Typography>
                )}
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
                  value={values.email}
                  onChange={handleChange}
                />
                {errors.email && (
                  <Typography color="error" variant="subtitle2">
                    {errors.email}
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="formatted-numberformat-input"
                  variant="filled"
                  label="Phone"
                  name="phone"
                  InputProps={{
                    inputComponent: NumberFormatCustom,
                  }}
                  value={values.phone}
                  onChange={handleChange}
                />
                {errors.phone && (
                  <Typography color="error" variant="subtitle2">
                    {errors.phone}
                  </Typography>
                )}
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>

        <Grid container justify="center">
          <Grid item sm={4}>
            <Box mt={2}>
              <Typography variant="body2">Please Select:</Typography>
            </Box>
            <Box ml={3} mt={1}>
              {!pickup ? (
                <DirectionsCarFilledOutlinedIcon fontSize="large" />
              ) : (
                <StorefrontOutlinedIcon fontSize="large" />
              )}
            </Box>
          </Grid>

          <Grid item sm={8}>
            <Box mt={2}>
              <CustomizedSwitch checked={pickup} onChange={handleSwitch} />
            </Box>
          </Grid>
        </Grid>

        {!pickup && (
          <>
            <h3>Deliver to: </h3>
            <Accordion
              className={classes.accordionRoot}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                Shipping Address
                {shippingInfoError && (
                  <ErrorOutlineIcon sx={{ marginLeft: 2, marginTop: -0.25 }} />
                )}
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
                      value={values.address}
                      onChange={handleChange}
                    />
                    {errors.address && (
                      <Typography color="error" variant="subtitle2">
                        {errors.address}
                      </Typography>
                    )}
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
                  <Grid item xs={12} sm={5}>
                    <TextField
                      fullWidth
                      id="standard-basic"
                      variant="filled"
                      label="City"
                      name="city"
                      value={values.city}
                      onChange={handleChange}
                    />
                    {errors.city && (
                      <Typography color="error" variant="subtitle2">
                        {errors.city}
                      </Typography>
                    )}
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      fullWidth
                      id="standard-basic"
                      variant="filled"
                      label="State"
                      name="state"
                      value={values.state}
                      onChange={handleChange}
                    />
                    {errors.state && (
                      <Typography color="error" variant="subtitle2">
                        {errors.state}
                      </Typography>
                    )}
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      id="standard-basic"
                      variant="filled"
                      label="Postal Code"
                      name="postal"
                      value={values.postal}
                      onChange={handleChange}
                    />
                    {errors.postal && (
                      <Typography color="error" variant="subtitle2">
                        {errors.postal}
                      </Typography>
                    )}
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
          </>
        )}
        {pickup && (
          <Grid container justify="center">
            <Box>
              <h3>
                <LocationOnOutlinedIcon sx={{ marginRight: 2 }} />
                Pickup location:
              </h3>
              <p>87878 Ocean St. Los Angeles, CA</p>
            </Box>
          </Grid>
        )}

        <Box mt={2}>
          <FormControl component="fieldset">
            {asapOrScheduled == "Scheduled" && (
              <FormLabel component="legend">Select Delivery Date:</FormLabel>
            )}
            <RadioGroup
              row
              aria-label="schedule"
              name="row-radio-buttons-group"
              value={asapOrScheduled}
              onChange={handleRadio}
            >
              <FormControlLabel value="ASAP" control={<Radio />} label="ASAP" />
              <FormControlLabel
                value="Scheduled"
                control={<Radio />}
                label="Scheduled"
              />
              <Box ml={2} mt={2}>
                <BasicDatePicker
                  // val={handleDateTime}
                  handleval={handleDateVal}
                  value={dateValue}
                  minDate={minDate}
                  read={asapOrScheduled == "ASAP"}
                />
                {/* <BasicDateTimePicker
                  val={handleDateTime}
                  read={asapOrScheduled == "ASAP"}
                /> */}
              </Box>
            </RadioGroup>
          </FormControl>
        </Box>

        {/* if ASAP, we'll contact you for delivery updates */}
        {/* pickup times between 8:00 am to 5:00 pm */}

        <Grid container>
          <Box mt={5} mb={5}>
            <Typography variant="body2">
              *For events and catering, please select intended delivery date.
              <br></br>
              <br></br>
              *Please allow at least 1 to 2 days from time of order for earliest
              availability. Delivery and pickup times may vary depending on
              product.
            </Typography>
          </Box>
        </Grid>
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
          Review Info
        </Button>
        <br></br>
        <br></br>
        <br></br>
      </form>
    </>
  );
};

export default EnterInfo;
