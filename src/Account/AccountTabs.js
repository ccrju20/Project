import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import OrderHistory from "./OrderHistory";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Hidden from "@material-ui/core/Hidden";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "350px",
  },
  vertical: {
    borderRight: "1px solid lightgrey",
    width: 200,
  },
  horizontal: {
    borderBottom: "1px solid lightgrey",
  },
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

// TabPanel.propTypes = {
//   children: PropTypes.node,
//   index: PropTypes.number.isRequired,
//   value: PropTypes.number.isRequired,
// };

export default function VerticalTabs() {
  const [value, setValue] = React.useState(0);
  const classes = useStyles();
  const matches = useMediaQuery("(min-width:600px)");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={
        matches
          ? {
              flexGrow: 1,
              bgcolor: "background.paper",
              display: "flex",
              height: 224,
            }
          : { width: "100%" }
      }
    >
      {/* <Box sx={{ borderBottom: 1, borderColor: "divider" }}> */}
      <Box className={!matches ? classes.horizontal : ""}>
        <Tabs
          orientation={matches ? "vertical" : "horizontal"}
          variant="scrollable"
          value={value}
          onChange={handleChange}
          className={matches ? classes.vertical : ""}
          // sx={{ borderRight: 1, borderColor: "divider", width: 200 }}
        >
          <Tab label="Personal Info" />
          <Tab label="Order History" />
          <Tab label="Manage Account" />
        </Tabs>
      </Box>

      <Grid container>
        <Grid item xs={12}>
          <TabPanel value={value} index={0}>
            Personal Info: First Name: Last Name: Email: Phone: Address: City:
            State: Postal:
          </TabPanel>
          <TabPanel value={value} index={1}>
            <OrderHistory />
          </TabPanel>
          <TabPanel value={value} index={2}>
            Account Settings: Change Password Delete Account
          </TabPanel>
        </Grid>
      </Grid>
    </Box>
  );
}
