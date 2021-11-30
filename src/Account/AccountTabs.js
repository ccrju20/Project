import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import OrderHistory from "./OrderHistory";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    width: "350px",
  },
});

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  const classes = useStyles();

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
          {/* <Typography>{children}</Typography> */}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function VerticalTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: "background.paper",
        display: "flex",
        height: 224,
      }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: "divider", width: 200 }}
      >
        <Tab label="Order History" {...a11yProps(0)} />
        <Tab label="Personal Info" {...a11yProps(1)} />
        <Tab label="Account Settings" {...a11yProps(2)} />
      </Tabs>
      <Grid container>
        <Grid item xs={12}>
          <TabPanel value={value} index={0}>
            <OrderHistory />
          </TabPanel>
          <TabPanel value={value} index={1}>
            Personal Info: First Name: Last Name: Email: Phone: Address: City:
            State: Postal:
          </TabPanel>
          <TabPanel value={value} index={2}>
            Account Settings: Change Password Delete Account
          </TabPanel>
        </Grid>
      </Grid>
    </Box>
  );
}
