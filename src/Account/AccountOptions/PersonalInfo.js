import React, { useState, useContext, useEffect } from "react";

import { Grid, Box, Typography } from "@material-ui/core";
import ServiceContext from "../../service/service-context";
import Link from "@mui/material/Link";
import Card from "@material-ui/core/Card";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const PersonalInfo = (props) => {
  const serviceCtx = useContext(ServiceContext);
  const [data, setData] = useState({});

  useEffect(() => {
    serviceCtx.getUserInfo().then(
      (response) => {
        console.log(response);
        setData(response.data);
      },
      (error) => {
        console.log(error);
        // setData(error);
      }
    );
  }, [serviceCtx]);

  return (
    <div>
      <Box mb={3} textAlign="center">
        <Typography variant="h5">Welcome, {data.firstname}</Typography>
      </Box>

      <Box mb={2}>
        <Card>
          <Box mt={2}>
            <Typography variant="h6" align="center">
              Basic Info
            </Typography>
            <Typography align="center"></Typography>
          </Box>
          <Grid container>
            <Grid item xs={12}>
              <List>
                <ListItem>
                  <Grid container>
                    <Typography variant="body1">
                      Name: {data.firstname} {data.lastname}
                    </Typography>
                  </Grid>
                  <Grid container justify="flex-end">
                    {/* <Button float="right">Edit</Button> */}
                    <Button>
                      <ArrowForwardIosIcon fontSize="small" />
                    </Button>
                  </Grid>
                </ListItem>
                <Divider variant="middle" />
                <ListItem>
                  <Typography variant="body1">
                    Login: <Link href="#">{data.email}</Link>
                  </Typography>
                </ListItem>
              </List>
            </Grid>
          </Grid>
        </Card>
      </Box>

      <Box mb={2}>
        <Card>
          <Box mt={2}>
            <Typography variant="h6" align="center">
              Contact Info
            </Typography>
            <Typography align="center"></Typography>
          </Box>
          <Grid container>
            <Grid item xs={12}>
              <List>
                <ListItem>
                  <Grid container>
                    <Typography variant="body1">Email: {data.email}</Typography>
                  </Grid>
                  <Grid container justify="flex-end">
                    {/* <Button float="right">Edit</Button> */}
                    <Button>
                      <ArrowForwardIosIcon fontSize="small" />
                    </Button>
                  </Grid>
                </ListItem>
                <Divider variant="middle" />
                <ListItem>
                  <Typography variant="body1">Phone: {data.phone}</Typography>
                  <Grid container justify="flex-end">
                    {/* <Button float="right">Edit</Button> */}
                    <Button>
                      <ArrowForwardIosIcon fontSize="small" />
                    </Button>
                  </Grid>
                </ListItem>
                <Divider variant="middle" />
                <ListItem>
                  <Typography variant="body1">
                    Address: {data.address} {data.addresstwo}{" "}
                  </Typography>
                  <Typography variant="body1">
                    {data.city} {data.state} {data.postal}
                  </Typography>
                  <Grid container justify="flex-end">
                    {/* <Button float="right">Edit</Button> */}
                    <Button>
                      <ArrowForwardIosIcon fontSize="small" />
                    </Button>
                  </Grid>
                </ListItem>
              </List>
            </Grid>
          </Grid>
        </Card>
      </Box>
    </div>
  );
};

export default PersonalInfo;
