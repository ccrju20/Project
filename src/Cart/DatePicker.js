import {React, useState, useEffect} from 'react';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';

export default function BasicDatePicker(props) {
//   const [value, setValue] = useState(null);

//   const minDate = new Date();
//   minDate.setDate(minDate.getDate() + 2);

//   useEffect(() => {
//     setValue(minDate);   
//   }, []);

//   console.log(value);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        label="Schedule"
        value={props.value}
        disabled={props.read}
        minDate={props.minDate}
        onChange={(newValue) => {
        //   setValue(newValue);
          props.handleval(newValue);

        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
}
