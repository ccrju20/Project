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
  addressTextField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "35ch",
  },
  accordionRoot: {
    width: "90%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
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

const EnterInfo = () => {
  const classes = useStyles();

  const onSubmitHandler = (event) => {
    event.preventDefault();
    console.log("submitted");
  };

  return (
    <>
      <h3>Please enter your info </h3>
      <div className={classes.accordionRoot}>
        <form onSubmit={onSubmitHandler}>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={classes.heading}>Contact Info</Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.root}>
              <TextField
                id="standard-basic"
                label="First Name"
                required
                // value={enteredFirstName}
                // onChange={firstNameChangeHandler}
                // error={firstNameValidError}
              />
              <TextField
                id="standard-basic"
                label="Last Name"
                required
                // value={enteredLastName}
                // onChange={lastNameChangeHandler}
                // error={lastNameValidError}
              />
            </AccordionDetails>

            <AccordionDetails className={classes.root} xs={12}>
              <TextField
                id="standard-basic"
                type="email"
                label="Email"
                required
                // value={enteredEmail}
                // onChange={emailChangeHandler}
                // error={emailValidError}
              />
              <TextField
                label="Phone"
                name="numberformat"
                id="formatted-numberformat-input"
                required
                // value={enteredNumber}
                // onChange={numberChangeHandler}
                // error={numberValidError}
                InputProps={{
                  inputComponent: NumberFormatCustom,
                }}
              />
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={classes.heading}>
                Shipping Address
              </Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.root}>
              <TextField
                className={classes.addressTextField}
                label="Address"
                id="standard-basic"
                required
              />
              <TextField
                // className={classes.addressTextField}
                label="Address 2 (optional)"
                id="standard-basic"
              />
            </AccordionDetails>
            <AccordionDetails className={classes.root}>
              <TextField label="City" id="standard-basic" required />
              <TextField label="Postal Code" id="standard-basic" required />
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              Payment info
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
      </div>
    </>
  );
};

export default EnterInfo;
