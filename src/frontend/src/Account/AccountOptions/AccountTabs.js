import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import OrderHistory from "./OrderHistory";
import { Grid, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import PersonalInfo from "./PersonalInfo";
import Home from "./Home";

const useStyles = makeStyles((theme) => ({
  vertical: {
    borderRight: "1px solid lightgrey",
    width: 200,
  },
  horizontal: {
    borderBottom: "1px solid lightgrey",
    marginBottom: "20px",
  },
  verticalBox: {
    flexGrow: 1,
    bgcolor: "background.paper",
    display: "flex",
    height: 224,
  },
}));

function TabPanel(props) {
  const { children, value, index } = props;

  return <div>{value === index && <Box sx={{ p: 3 }}>{children}</Box>}</div>;
}

export default function VerticalTabs() {
  const [value, setValue] = React.useState(0);
  const classes = useStyles();
  const matches = useMediaQuery("(min-width:750px)");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Box className={matches ? classes.verticalBox : ""}>
        <Box className={!matches ? classes.horizontal : ""}>
          <Tabs
            orientation={matches ? "vertical" : "horizontal"}
            variant="scrollable"
            value={value}
            onChange={handleChange}
            className={matches ? classes.vertical : ""}
            TabIndicatorProps={{
              style: {
                backgroundColor: "#430085",
              },
            }}
          >
            <Tab
              sx={{
                "&.Mui-selected": {
                  color: "#430085",
                },
              }}
              label="Home"
            />
            <Tab
              sx={{
                "&.Mui-selected": {
                  color: "#430085",
                },
              }}
              label="Personal Info"
            />
            <Tab
              sx={{
                "&.Mui-selected": {
                  color: "#430085",
                },
              }}
              label="Order History"
            />
            <Tab
              sx={{
                "&.Mui-selected": {
                  color: "#430085",
                },
              }}
              label="Manage Account"
            />
          </Tabs>
        </Box>

        <Grid container>
          <Grid item xs={false} sm={1} />
          <Grid item xs={12} sm={10}>
            <TabPanel value={value} index={0}>
              <Home />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <PersonalInfo />
            </TabPanel>
            <TabPanel value={value} index={2}>
              <OrderHistory />
            </TabPanel>
            <TabPanel value={value} index={3}></TabPanel>
          </Grid>
          <Grid item xs={false} sm={1} />
        </Grid>
      </Box>
    </>
  );
}
