import logo from "./Images/logo-updated.png";
import { makeStyles } from "@material-ui/styles";
import { Link as RouterLink } from "react-router-dom";
import Link from "@material-ui/core/Link";
import useMediaQuery from "@mui/material/useMediaQuery";

const useStyles = makeStyles((theme) => ({
  logo: {
    marginLeft: 20,
    marginTop: 20,
    marginRight: 10,
    marginBottom: 10,
  },
  smallLogo: {
    marginTop: 20,
    height: "180px",
    width: "188px",
    marginLeft: -18,
  },
}));

export default function Logo() {
  const classes = useStyles();
  const smallLogo = useMediaQuery("(min-width:650px)");

  return (
    <Link component={RouterLink} to="/">
      <img
        src={logo}
        alt="logo"
        className={smallLogo ? classes.logo : classes.smallLogo}
      />
    </Link>
  );
}
