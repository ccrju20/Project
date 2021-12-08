import { React } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ContactForm from "./ContactForm";
import ShippingForm from "./ShippingForm";
import ScheduleForm from "./ScheduleForm";
import { Grid, Box, Typography } from "@material-ui/core";
import CheckoutCartList from "./OrderSummary/CheckoutCartList";
import Button from "@mui/material/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: "#f4f2f5",
  },
}));

const schema = yup
  .object()
  .shape({
    firstname: yup.string().required(),
    lastname: yup.string().required(),
    email: yup.string().email().required(),
    phone: yup.string().min(10).required(),
    //
    pickup: yup.boolean().required(),
    address: yup.string().when(
      "pickup", {is: false, then: yup.string().required()}
    ),
    addresstwo: yup.string(),
    city: yup.string().when(
      "pickup", {is: false, then: yup.string().required()}
    ),
    state: yup.string().when(
      "pickup", {is: false, then: yup.string().min(2).required()}
    ),
    postal: yup.string().when(
      "pickup", {is: false, then: yup.string().min(5).required()}
    ),
    // when: yup.string().required(),
    // scheduled: yup.date().when(
    //   "when", {is: "Scheduled", then: yup.date().required()}
    // )
  })
  .required();

const Check = () => {
  const classes = useStyles();
  const methods = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) => console.log(data);

  return (
    <Grid container>
      <Grid item xs={1} />
      <Grid item xs={10}>
        <Grid container>
          <Grid item xs={12} sm={12} md={7}>
            <Box mt={2} mb={3}>
              <Typography variant="h5">Form</Typography>
            </Box>
            <FormProvider {...methods}>
              <form onSubmit={methods.handleSubmit(onSubmit)}>
                <ContactForm />
                <br />
                <br />
                <ShippingForm />
                <br />
                <br />
                <ScheduleForm />
                {/* <input type="submit" /> */}
                <Button
                  variant="contained"
                  fullWidth
                  type="submit"
                  sx={{
                    backgroundColor: "#41166c",
                    "&:hover": {
                      backgroundColor: "#290052",
                    },
                  }}
                >
                  Review Order
                </Button>
              </form>
            </FormProvider>
          </Grid>

          <Grid item xs={12} sm={12} md={1} />

          <Grid item xs={12} sm={12} md={4}>
            <Box mt={2} mb={3}>
              <Typography variant="h5">Order Summary</Typography>
            </Box>

            <CheckoutCartList />
            <Button
              variant="contained"
              fullWidth
              type="submit"
              sx={{
                backgroundColor: "#41166c",
                "&:hover": {
                  backgroundColor: "#290052",
                },
              }}
            >
              Review Order
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={1} />
    </Grid>
  );
};

export default Check;
