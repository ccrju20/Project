import React from "react";
import {
  Container,
  Box,
  Typography,
  Grid,
  TextField,
  Button,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  email: yup.string().email().required("*Email is required"),
  name: yup.string().required("*Name is required"),
  message: yup.string().required("*Message is required"),
});

const ContactUs = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const formSubmitHandler = (data) => {
    console.log(data);
  };

  return (
    <Container maxWidth="sm">
      <Box mt={7} mb={3}>
        <Typography align="center" variant="h4" mb={3}>
          Contact Bakeshop
        </Typography>
        <Typography align="center" variant="overline" color="text.secondary">
          Custom Inquiries, Catering questions, Comments or Suggestions?
        </Typography>
        <Typography align="center" variant="body2" color="text.secondary">
          We'd love to hear from you! Please send us a message
        </Typography>
      </Box>
      <form onSubmit={handleSubmit(formSubmitHandler)}>
        <Grid container spacing={3} direction="column">
          <Grid item>
            <Controller
              name="email"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Email"
                  variant="outlined"
                  error={!!errors.email}
                  helperText={errors.email ? errors.email?.message : ""}
                />
              )}
            />
          </Grid>

          <Grid item>
            <Controller
              name="name"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Name"
                  variant="outlined"
                  error={!!errors.name}
                  helperText={errors.name ? errors.name?.message : ""}
                />
              )}
            />
          </Grid>

          <Grid item>
            <Controller
              name="message"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  multiline
                  rows={4}
                  label="Message"
                  variant="outlined"
                  error={!!errors.message}
                  helperText={errors.message ? errors.message?.message : ""}
                />
              )}
            />
          </Grid>

          <Grid item>
            <Button
              variant="contained"
              fullWidth
              type="submit"
              sx={{
                backgroundColor: "#290052",
                "&:hover": {
                  backgroundColor: "#41166c",
                },
                marginBottom: 10,
              }}
              data-cy="contact-submit"
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default ContactUs;
