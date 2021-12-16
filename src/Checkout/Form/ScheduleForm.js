import { React, useState, useEffect } from "react";
import { Grid, Box, Typography } from "@material-ui/core";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { useFormContext, Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import MobileDateTimePicker from "@mui/lab/MobileDateTimePicker";

const ScheduleForm = () => {
  const {
    control,
    unregister,
    formState: { errors },
  } = useFormContext();

  const [asapOrScheduled, setAsapOrScheduled] = useState("ASAP");
  const [dateValue, setDateValue] = useState();

  useEffect(() => {
    const minDate = new Date();
    minDate.setDate(minDate.getDate() + 2);
    minDate.setHours(10, 0);
    setDateValue(minDate);
  }, []);

  return (
    <>
    <Grid container justifyContent="center">
      <Controller
        control={control}
        name={"when"}
        defaultValue="ASAP"
        render={({ field: { onChange, value } }) => (
          <RadioGroup
            defaultValue="ASAP"
            onChange={(event) => {
              onChange(event.target.value);
              setAsapOrScheduled(event.target.value);
              {
                event.target.value === "ASAP" && unregister("scheduled");
              }
            }}
            row
          >
            <FormControlLabel value="ASAP" control={<Radio />} label="ASAP" />
            <FormControlLabel
              value="Scheduled"
              control={<Radio />}
              label="Scheduled"
            />
          </RadioGroup>
        )}
      />

      {asapOrScheduled === "Scheduled" && (
        <Box mt={2}>
          <Controller
            control={control}
            name={"scheduled"}
            defaultValue={dateValue}
            render={({ field }) => (
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <MobileDateTimePicker
                  {...field}
                  minutesStep={15}
                  label="Select Date and Time"
                  renderInput={(params) => (
                    <TextField {...params} sx={{ width: "250px" }} />
                  )}
                />
              </LocalizationProvider>
            )}
          />
        </Box>
      )}
      </Grid>
    </>
  );
};

export default ScheduleForm;
