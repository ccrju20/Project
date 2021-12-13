import { React, useState } from "react";
import Content from "./Content";
import { Grid, Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Divider from "@mui/material/Divider";
import Search from "./Search";

const useStyles = makeStyles({
  root: {
    boxShadow: "none",
    backgroundColor: "#9B89A4",
    color: "#837D7D",
  },
  divider: {
    borderRight: "2px solid lightgrey",
    height: "50em",
    // marginTop: 100,
    marginRight: 30,
    marginBottom: 50,
  },
});

const Shop = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const matches = useMediaQuery("(min-width:800px)");

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <Grid container>
      <Grid item xs={1} sm={1} />
      <Grid item xs={10} sm={10}>
        <Box mt={3} mb={4}>
          <Typography variant="h4">Baked Goods</Typography>
        </Box>
        <Grid container>
          <Grid item xs={12} sm={matches ? 2 : false}>
            <Box>
              <List
                subheader={
                  <ListSubheader component="div" id="nested-list-subheader">
                    Category
                  </ListSubheader>
                }
              >
                <ListItemButton>
                  <ListItemText primary="Shop All" />
                </ListItemButton>
                <Divider variant="middle" />
                <ListItemButton>
                  <ListItemText primary="Cookies" />
                </ListItemButton>
                <Divider variant="middle" />
                <ListItemButton onClick={handleClick}>
                  <ListItemText primary="Cakes" />
                  {open ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={open} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }}>
                      <ListItemText primary={`6" Cakes`} />
                    </ListItemButton>
                    <ListItemButton sx={{ pl: 4 }}>
                      <ListItemText primary={`8" Cakes`} />
                    </ListItemButton>
                    <ListItemButton sx={{ pl: 4 }}>
                      <ListItemText primary={`10" Cakes`} />
                    </ListItemButton>
                  </List>
                </Collapse>
              </List>
            </Box>
          </Grid>

          {matches && <Grid item className={classes.divider} />}

          <Grid item xs={12} sm={matches ? 9 : 12}>
            <Content />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={1} sm={1} />
    </Grid>
  );
};

export default Shop;
