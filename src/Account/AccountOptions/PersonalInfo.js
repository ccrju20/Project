import React, { useState, useContext, useEffect } from "react";
import { Grid, Box, Typography } from "@material-ui/core";
import ServiceContext from "../../service/service-context";
import Card from "@material-ui/core/Card";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItemButton from "@mui/material/ListItemButton";
import { makeStyles } from "@material-ui/styles";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CircularProgress from "@mui/material/CircularProgress";

const useStyles = makeStyles((theme) => ({
  listItemText: {
    fontSize: 16,
    color: "grey",
  },
}));

const PersonalInfo = (props) => {
  const serviceCtx = useContext(ServiceContext);
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const classes = useStyles();

  useEffect(() => {
    serviceCtx.getUserInfo().then(
      (response) => {
        console.log(response);
        setData(response.data);

        setIsLoading(false);
      },
      (error) => {
        console.log(error);
        // setData(error);
      }
    );
  }, [serviceCtx]);

  return (
    <>
      {isLoading ? (
        <Grid container justifyContent="center">
          <CircularProgress />
        </Grid>
      ) : (
        <>
          <Box mb={3} textAlign="center">
            <Typography variant="h5">Account Details</Typography>
          </Box>

          <Box mb={2}>
            <Card>
              <Box mt={2} mb={1} ml={3}>
                <Typography variant="h6">Basic Info</Typography>
                <Typography align="center"></Typography>
              </Box>

              <List sx={{ padding: 3 }}>
                <ListItemButton>
                  <Grid container>
                    <Grid item xs={12} sm={3}>
                      <Typography className={classes.listItemText}>
                        Name:
                      </Typography>
                    </Grid>
                    <Grid item xs={11} sm={8} sx={{ maxWidth: "100px" }}>
                      <Typography style={{ wordWrap: "break-word" }}>
                        {data.firstname} {data.lastname}
                      </Typography>
                    </Grid>
                    <Grid item xs={1}>
                      <Grid container justifyContent="flex-end">
                        <ArrowForwardIosIcon
                          fontSize="small"
                          style={{ color: "grey" }}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </ListItemButton>
                <Divider variant="middle" />

                <ListItemButton>
                  <Grid container>
                    <Grid item xs={12} sm={3}>
                      <Typography className={classes.listItemText}>
                        Login:
                      </Typography>
                    </Grid>
                    <Grid item xs={11} sm={8} sx={{ maxWidth: "100px" }}>
                      <Typography style={{ wordWrap: "break-word" }}>
                        {data.email}
                      </Typography>
                    </Grid>
                    <Grid item xs={1}>
                      <Grid container justifyContent="flex-end">
                        <ArrowForwardIosIcon
                          fontSize="small"
                          style={{ color: "grey" }}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </ListItemButton>
              </List>
            </Card>
          </Box>

          <Box mb={2}>
            <Card>
              <Box mt={2} mb={1} ml={3}>
                <Typography variant="h6">Contact Info</Typography>
                <Typography align="center"></Typography>
              </Box>

              <List sx={{ padding: 3 }}>
                <ListItemButton>
                  <Grid container>
                    <Grid item xs={12} sm={3}>
                      <Typography className={classes.listItemText}>
                        Email:
                      </Typography>
                    </Grid>
                    <Grid item xs={11} sm={8} sx={{ maxWidth: "100px" }}>
                      <Typography style={{ wordWrap: "break-word" }}>
                        {data.email}
                      </Typography>
                    </Grid>
                    <Grid item xs={1}>
                      <Grid container justifyContent="flex-end">
                        <ArrowForwardIosIcon
                          fontSize="small"
                          style={{ color: "grey" }}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </ListItemButton>
                <Divider variant="middle" />

                <ListItemButton>
                  <Grid container>
                    <Grid item xs={12} sm={3}>
                      <Typography className={classes.listItemText}>
                        Phone:
                      </Typography>
                    </Grid>
                    <Grid item xs={11} sm={8} sx={{ maxWidth: "100px" }}>
                      <Typography style={{ wordWrap: "break-word" }}>
                        {data.phone}
                      </Typography>
                    </Grid>
                    <Grid item xs={1}>
                      <Grid container justifyContent="flex-end">
                        <ArrowForwardIosIcon
                          fontSize="small"
                          style={{ color: "grey" }}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </ListItemButton>
                <Divider variant="middle" />

                <ListItemButton>
                  <Grid container>
                    <Grid item xs={12} sm={3}>
                      <Typography className={classes.listItemText}>
                        Address:
                      </Typography>
                    </Grid>
                    <Grid item xs={11} sm={8} sx={{ maxWidth: "100px" }}>
                      <Typography style={{ wordWrap: "break-word" }}>
                        {data.address} {data.addresstwo}
                      </Typography>
                      <Typography style={{ wordWrap: "break-word" }}>
                        {data.city} {data.state} {data.postal}
                      </Typography>
                    </Grid>
                    <Grid item xs={1}>
                      <Grid container justifyContent="flex-end">
                        <ArrowForwardIosIcon
                          fontSize="small"
                          style={{ color: "grey" }}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </ListItemButton>
              </List>
            </Card>
          </Box>
        </>
      )}
    </>
  );
};

export default PersonalInfo;
