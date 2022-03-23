import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { styled } from "@material-ui/styles";
import IconButton from "@material-ui/core/IconButton";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import Divider from "@mui/material/Divider";
import { makeStyles } from "@material-ui/styles";
import ListItemText from "@mui/material/ListItemText";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-start",
}));

const useStyles = makeStyles((theme) => ({
  drawerHeight: {
    height: "100px",
  },
}));
export default function TemporaryDrawer(props) {
  const classes = useStyles();

  return (
    <Box sx={{ display: "flex" }}>
      <SwipeableDrawer
        className={classes.drawerHeight}
        anchor="bottom"
        open={props.opened}
        onClose={props.handleMenuClose}
        onOpen={props.handleMenuOpen}
      >
        <DrawerHeader>
          <IconButton onClick={props.handleMenuClose}>
            <KeyboardArrowDownIcon />
          </IconButton>
        </DrawerHeader>

        <Box
          role="presentation"
          onClick={props.handleMenuClose}
          onKeyDown={props.handleMenuClose}
        >
          <List>
            <ListItemButton onClick={() => console.log("clicked")}>
              <ListItemText
                primary="About"
                style={{ display: "flex", justifyContent: "center" }}
              />
            </ListItemButton>
          </List>
          <Divider />
          <List>
            <ListItemButton onClick={() => console.log("clicked")}>
              <ListItemText
                primary="Shop"
                style={{ display: "flex", justifyContent: "center" }}
              />
            </ListItemButton>
          </List>
          <Divider />
          <List>
            <ListItemButton onClick={() => console.log("clicked")}>
              <ListItemText
                primary="Contact"
                style={{ display: "flex", justifyContent: "center" }}
              />
            </ListItemButton>
          </List>
          <Divider />
          <List>
            <ListItemButton onClick={() => console.log("clicked")}>
              <ListItemText
                primary="Catering"
                style={{ display: "flex", justifyContent: "center" }}
              />
            </ListItemButton>
          </List>
        </Box>
      </SwipeableDrawer>
    </Box>
  );
}
