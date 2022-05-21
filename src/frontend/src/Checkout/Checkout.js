import { React, useContext } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import UserInfoContext from "../store/userinfo-context";
import { Grid, Box, Typography } from "@material-ui/core";
import ContactForm from "./Form/ContactForm";
import ShippingForm from "./Form/ShippingForm";
import ScheduleForm from "./Form/ScheduleForm";
import CheckoutCartList from "./OrderSummary/CheckoutCartList";
import Button from "@mui/material/Button";

const schema = yup
  .object()
  .shape({
    firstname: yup.string().trim().required("*First name is required"),
    lastname: yup.string().trim().required("*Last name is required"),
    email: yup
      .string()
      .email("*Must be a valid email")
      .required("*Email is required"),
    phone: yup
      .string()
      .min(10, "*Must be at least 10 characters")
      .trim()
      .required(),
    //
    pickup: yup.boolean().required(),
    address: yup
      .string()
      .trim()
      .when("pickup", {
        is: false,
        then: yup.string().required("*Address is required"),
      }),
    addresstwo: yup.string().trim(),
    city: yup
      .string()
      .trim()
      .when("pickup", {
        is: false,
        then: yup.string().required("*City is required"),
      }),
    state: yup
      .string()
      .trim()
      .when("pickup", {
        is: false,
        then: yup.string().min(2, "*Must be 2 characters").required(),
      }),
    postal: yup
      .string()
      .trim()
      .when("pickup", {
        is: false,
        then: yup.string().min(5, "*Must be at least 5 characters").required(),
      }),
  })
  .required();

const Checkout = (props) => {
  const userCtx = useContext(UserInfoContext);
  const methods = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) => {
    userCtx.saveInfo(data);
    props.handleNext();
  };

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Grid container>
            <Grid item xs={12} sm={12} md={7}>
              <Box mt={2} mb={3}>
                <Typography variant="h4">Checkout</Typography>
                <Typography variant="subtitle1">
                  Please enter your information below
                </Typography>
              </Box>

              <ContactForm />
              <br />
              <br />
              <ShippingForm />
              <br />
              <br />
              <ScheduleForm />
            </Grid>
            <Grid item xs={12} sm={12} md={1} />
            <Grid item xs={12} sm={12} md={4}>
              <Box mt={3}>
                <CheckoutCartList />
              </Box>
              <Box mt={5}>
                <Button
                  variant="contained"
                  fullWidth
                  type="submit"
                  sx={{
                    backgroundColor: "#290052",
                    "&:hover": {
                      backgroundColor: "#430085",
                    },
                  }}
                >
                  Continue to Payment
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </FormProvider>
    </>
  );
};

export default Checkout;
