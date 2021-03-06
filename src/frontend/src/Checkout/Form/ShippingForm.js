import { React, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import TextField from "@material-ui/core/TextField";
import { Grid, Box } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import CustomizedSwitch from "../UIComponents/Switch";

const ContactForm = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const [pickup, setPickup] = useState(false);

  return (
    <>
      <Grid container>
        <Grid container justifyContent="center">
          <Box mt={1} mb={1}>
            <Controller
              name="pickup"
              control={control}
              defaultValue={pickup}
              render={({ field: { onChange, value } }) => (
                <CustomizedSwitch
                  checked={pickup}
                  onChange={(event, value) => {
                    onChange(value);
                    setPickup(value);
                  }}
                  data-cy="switch"
                />
              )}
            />
          </Box>
        </Grid>
      </Grid>

      {!pickup && (
        <Card elevation={3}>
          <CardHeader title="Shipping" />
          <CardContent>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={7}>
                <Controller
                  name="address"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Address"
                      variant="outlined"
                      error={!!errors.address}
                      helperText={errors.address ? errors.address?.message : ""}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={5}>
                <Controller
                  name="addresstwo"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Address 2"
                      variant="outlined"
                      error={!!errors.addresstwo}
                      helperText={
                        errors.addresstwo ? errors.addresstwo?.message : ""
                      }
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={5}>
                <Controller
                  name="city"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="City"
                      variant="outlined"
                      error={!!errors.city}
                      helperText={errors.city ? errors.city?.message : ""}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <Controller
                  name="state"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="State"
                      variant="outlined"
                      error={!!errors.state}
                      helperText={errors.state ? errors.state?.message : ""}
                      inputProps={{
                        maxLength: 2,
                        style: { textTransform: "uppercase" },
                      }}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Controller
                  name="postal"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Postal"
                      variant="outlined"
                      error={!!errors.postal}
                      helperText={errors.postal ? errors.postal?.message : ""}
                      inputProps={{ maxLength: 5 }}
                    />
                  )}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      )}

      {pickup && (
        <Grid container>
          <Grid item xs={12}>
            <Card>
              <CardHeader title="Pickup Location:" />
              <CardContent>
                <LocationOnOutlinedIcon sx={{ marginRight: 2 }} />
                123 Test Address Los Angeles, CA 90232
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default ContactForm;
