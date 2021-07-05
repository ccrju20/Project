import "./App.css";
import { Button, Typography } from "@material-ui/core";
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
          <Grid item xs={0} sm={2} />
            <Grid item xs={12} sm={8}>
              <Content />
            </Grid>
          <Grid item xs={0} sm={2} />
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
