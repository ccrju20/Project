import "./App.css";
import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import Header from "./Header";
import Content from "./Content";

const useStyles = makeStyles({
  myOwnStyle: {
    fontSize: "30px",
  },
});

function App() {
  const classes = useStyles();

  return (
    <div>
      <Grid container direction="column">
        <Grid item>
          <Header />
        </Grid>
        <Grid item container>
          <Grid item xs={false} sm={2} />
          <Grid item xs={12} sm={8}>
            <Box mt={8}>
              <Content />
            </Box>
          </Grid>
          <Grid item xs={false} sm={2} />
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
