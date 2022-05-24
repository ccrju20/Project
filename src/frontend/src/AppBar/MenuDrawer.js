import { useNavigate } from "react-router-dom";
import { styled, makeStyles } from "@material-ui/styles";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import IconButton from "@material-ui/core/IconButton";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";


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
  const navigate = useNavigate();

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
            <ListItemButton onClick={() => navigate("/about")}>
              <ListItemText
                primary="About"
                style={{ display: "flex", justifyContent: "center" }}
              />
            </ListItemButton>
          </List>

          <Divider />
          <List>
            <ListItemButton onClick={() => navigate("/shop")}>
              <ListItemText
                primary="Shop"
                style={{ display: "flex", justifyContent: "center" }}
              />
            </ListItemButton>
          </List>

          <Divider />
          <List>
            <ListItemButton onClick={() => navigate("/account")}>
              <ListItemText
                primary="Account"
                style={{ display: "flex", justifyContent: "center" }}
              />
            </ListItemButton>
          </List>

          <Divider />
          <List>
            <ListItemButton onClick={() => navigate("/contact")}>
              <ListItemText
                primary="Contact"
                style={{ display: "flex", justifyContent: "center" }}
              />
            </ListItemButton>
          </List>
          <Divider />
          <List>
            <ListItemButton onClick={() => navigate("/coffee")}>
              <ListItemText
                primary="Coffee"
                style={{ display: "flex", justifyContent: "center" }}
              />
            </ListItemButton>
          </List>
        </Box>
      </SwipeableDrawer>
    </Box>
  );
}
