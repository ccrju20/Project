import logo from "./Images/logo.png";
import { makeStyles } from "@material-ui/styles";
import { Link as RouterLink } from "react-router-dom";
import Link from "@material-ui/core/Link";

const useStyles = makeStyles((theme) => ({
  logo: {
    marginTop: 20,
    marginRight: 10,
    marginBottom: 10,
  },
}));

export default function Logo() {
  const classes = useStyles();
  return (
    <Link component={RouterLink} to="/">
      <img src={logo} alt="logo" className={classes.logo} />
    </Link>
  );
}
