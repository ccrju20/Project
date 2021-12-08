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
import MobileDatePicker from "@mui/lab/MobileDatePicker";
// import DateTimePicker from "@mui/lab/DateTimePicker";
// import MobileDateTimePicker from "@mui/lab/MobileDateTimePicker";
// import InputLabel from "@mui/material/InputLabel";
// import MenuItem from "@mui/material/MenuItem";
// import Select from "@mui/material/Select";

const ScheduleForm = () => {
  const {
    control,
    unregister,
    formState: { errors },
  } = useFormContext();

  const [asapOrScheduled, setAsapOrScheduled] = useState("ASAP");
  const [dateValue, setDateValue] = useState();
  const [age, setAge] = useState("");

  useEffect(() => {
    const minDate = new Date();
    minDate.setDate(minDate.getDate() + 2);
    minDate.setHours(10, 0);
    setDateValue(minDate);
  }, []);

  return (
    <Box mb={2}>
      <FormControl component="fieldset">
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
                {event.target.value === "ASAP" && unregister("scheduled")}
                // console.log(event.target.value);
                // console.log(asapOrScheduled);
              }}
              // {...field}
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
          <Controller
            control={control}
            name={"scheduled"}
            defaultValue={dateValue}
            render={({ field }) => (
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <MobileDatePicker
                  {...field}
                  label="Date Picker"
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            )}
          />
        )}

        {/* <Box ml={2} mt={2}> */}
        {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
            <MobileDatePicker
              label="Date"
              value={dateValue}
              onChange={(newValue) => {
                setDateValue(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            /> */}

        {/* <MobileDateTimePicker
                value={dateValue}
                onChange={(newValue) => {
                  setDateValue(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
                /> */}
        {/* </LocalizationProvider> */}
        {/* </Box> */}

        {/* <FormControl sx={{ m: 1, minWidth: 80 }}>
          <InputLabel id="demo-simple-select-label">Time</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={age}
            label="Age"
            onChange={handleChange}
          >
            <MenuItem value={1}>10:00 AM</MenuItem>
            <MenuItem value={2}>10:30 AM</MenuItem>
            <MenuItem value={3}>11:00 AM</MenuItem>
            <MenuItem value={4}>11:30 AM</MenuItem>
            <MenuItem value={5}>12:00 PM</MenuItem>
          </Select>
        </FormControl> */}
      </FormControl>
    </Box>
  );
};

export default ScheduleForm;
