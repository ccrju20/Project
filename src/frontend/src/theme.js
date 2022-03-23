import { unstable_createMuiStrictModeTheme as createMuiTheme } from '@material-ui/core/styles';
import { blue, red } from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: blue[500],
    },
    secondary: {
      main: red[500],
    },
  },
});

export default theme;