import { useState, useContext } from "react";
import { Link as RouterLink } from "react-router-dom";
import Link from "@material-ui/core/Link";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import MenuIcon from "@material-ui/icons/Menu";
import { styled, useTheme, makeStyles, withStyles } from "@material-ui/styles";
import IconButton from "@material-ui/core/IconButton";
import Hidden from "@material-ui/core/Hidden";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Badge from "@material-ui/core/Badge";
import AuthContext from "../store/auth-context.js";
import CartContext from "../store/cart-context";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import Cart from '../Cart/Cart'

const drawerWidth = 240;

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-start",
}));

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -drawerWidth,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginRight: 0,
    }),
  })
);

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
    padding: 1,
  },
  carticon: {
    padding: 1,
  },
}));

const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -8,
    top: 2,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}))(Badge);

const Edge = () => {
  const [opened, setOpened] = useState(false);
  const classes = useStyles();
  const authCtx = useContext(AuthContext);
  const cartCtx = useContext(CartContext);
  const cartTotalItems = cartCtx.items.length;
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleDrawerOpen = () => {
    setOpened(true);
  };

  const handleDrawerClose = () => {
    setOpened(false);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Main open={opened}>
          <DrawerHeader />
        </Main>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
            },
          }}
          variant='temporary'
          anchor="right"
          open={opened}
        >
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon /> <ChevronRightIcon />
            </IconButton>
          </DrawerHeader>
          <Divider />
          component
          <Cart />
          <List>
            {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {["All mail", "Trash", "Spam"].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Drawer>
      </Box>

      <IconButton
        edge="start"
        className={classes.menuButton}
        aria-label="menu"
        onClick={handleMenu}
        color="inherit"
      >
        <MenuIcon />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        open={open}
        onClose={handleClose}
      >
        <Link component={RouterLink} to="/account" color="inherit">
          <MenuItem onClick={handleClose}>Account</MenuItem>
        </Link>

        {!authCtx.isLoggedIn && (
          <Link component={RouterLink} to="/signup" color="inherit">
            <MenuItem onClick={handleClose}>Sign Up</MenuItem>
          </Link>
        )}

        <Hidden smUp={true}>
          <Link component={RouterLink} to="/cart" color="inherit">
            <MenuItem onClick={handleClose}>About</MenuItem>
          </Link>
          <Link component={RouterLink} to="/shop" color="inherit">
            <MenuItem onClick={handleClose}> Shop</MenuItem>
          </Link>
          <Link component={RouterLink} to="/cart" color="inherit">
            <MenuItem onClick={handleClose}>Contact</MenuItem>
          </Link>
        </Hidden>
      </Menu>
      <IconButton className={classes.carticon} onClick={handleDrawerOpen}>
        {/* <Link component={RouterLink} to="/cart" color="inherit"> */}
          <StyledBadge badgeContent={cartTotalItems} color="secondary">
            <ShoppingCartIcon />
          </StyledBadge>
        {/* </Link> */}
      </IconButton>
    </>
  );
};

export default Edge;
