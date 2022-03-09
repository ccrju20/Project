import { React, useState, useEffect, useContext } from "react";
import { Controller, useFormContext } from "react-hook-form";
import TextField from "@material-ui/core/TextField";
import { Grid } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import ServiceContext from "../../service/service-context";

const ContactForm = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const serviceCtx = useContext(ServiceContext);
  const [data, setData] = useState({firstname: "", lastname: "", email: ""});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (localStorage.getItem("user")) {
      serviceCtx.getUserInfo().then(
        (response) => {
          setData(response.data);
          setIsLoading(false);
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      setIsLoading(false);
    }
  }, [serviceCtx]);

  // console.log(errors);

  return (
    <>
      {isLoading ? (
        "loading"
      ) : (
        <Card elevation={3}>
          <CardHeader title="Contact Info" />
          <CardContent>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="firstname"
                  control={control}
                  defaultValue={data.firstname}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="First Name"
                      variant="outlined"
                      error={!!errors.firstname}
                      helperText={
                        errors.firstname ? errors.firstname?.message : ""
                      }
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="lastname"
                  control={control}
                  defaultValue={data.lastname}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Last Name"
                      variant="outlined"
                      error={!!errors.lastname}
                      helperText={
                        errors.lastname ? errors.lastname?.message : ""
                      }
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="email"
                  control={control}
                  defaultValue={data.email}
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
              <Grid item xs={12} sm={6}>
                <Controller
                  name="phone"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Phone"
                      variant="outlined"
                      error={!!errors.phone}
                      helperText={errors.phone ? errors.phone?.message : ""}
                    />
                  )}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default ContactForm;
