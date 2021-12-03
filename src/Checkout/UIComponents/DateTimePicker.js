import { React, useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";

export default function BasicDateTimePicker(props) {
  const [value, setValue] = useState(new Date());

  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 2);
  minDate.setHours(8,0)
  // console.log(minDate);

  useEffect(() => {
    setValue(minDate);   
  }, [minDate]);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateTimePicker
        renderInput={(props) => <TextField {...props} />}
        label="Schedule"
        disabled={props.read}
        value={value}
        minDate={minDate}
        minTime={new Date(0, 0, 0, 8)}
        maxTime={new Date(0, 0, 0, 17, 30)}
        onChange={(newValue) => {
          setValue(newValue);
          props.val(newValue);
        }}
      />
    </LocalizationProvider>
  );
}
