import { React, useState } from "react";
import PaymentPage from "./PaymentPage";
import { Grid, Box, Toolbar } from "@material-ui/core";
import Logo from "../Logo";
import Divider from "@mui/material/Divider";
import Checkout from "./Checkout";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

const steps = ["Enter Information ", "Review and Pay"];

const Check = () => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <Checkout handleNext={handleNext} />;
      case 1:
        return <PaymentPage handleNext={handleNext} handleBack={handleBack} />;
      default:
        throw new Error("Unknown step");
    }
  }

  return (
    <>
      <Toolbar>
        <Grid container justifyContent="center">
          <Logo />
        </Grid>
      </Toolbar>

      <Grid container>
        <Grid item xs={1} />
        <Grid item xs={10}>
          <Box mb={2}>
            <Divider variant="middle" />
          </Box>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <>
            {getStepContent(activeStep)}
          </>
        </Grid>
        <Grid item xs={1} />
      </Grid>
      <Box mb={20}></Box>
    </>
  );
};

export default Check;
