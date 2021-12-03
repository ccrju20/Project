import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { makeStyles } from "@material-ui/core/styles";
import StickyNote2OutlinedIcon from "@mui/icons-material/StickyNote2Outlined";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

const useStyles = makeStyles((theme) => ({
  root: {
    "&$expanded": {
      margin: 0,
    },
  },
}));

export default function SimpleAccordion() {
  const [expanded, setExpanded] = React.useState(false);
  const classes = useStyles();

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  return (
    <div>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary
          expandIcon={
            expanded === "panel1" ? (
              <RemoveIcon fontSize="small" />
            ) : (
              <AddIcon fontSize="small" />
            )
          }
          aria-controls="panel1a-content"
          id="panel1a-header"
          sx={{ backgroundColor: "#e0e0e0" }}
        >
          <Typography>
            <LocalDiningIcon fontSize="small" sx={{ marginRight: 1 }} />
            Description
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        <AccordionSummary
          expandIcon={
            expanded === "panel2" ? (
              <RemoveIcon fontSize="small" />
            ) : (
              <AddIcon fontSize="small" />
            )
          }
          aria-controls="panel2a-content"
          id="panel2a-header"
          sx={{ backgroundColor: "#e0e0e0" }}
        >
          <Typography>
            <StickyNote2OutlinedIcon fontSize="small" sx={{ marginRight: 1 }} />
            Nutrition Info
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
      >
        <AccordionSummary
          expandIcon={
            expanded === "panel3" ? (
              <RemoveIcon fontSize="small" />
            ) : (
              <AddIcon fontSize="small" />
            )
          }
          aria-controls="panel3a-content"
          id="panel3a-header"
          sx={{ backgroundColor: "#e0e0e0" }}
        >
          <Typography>
            <EditOutlinedIcon fontSize="small" sx={{ marginRight: 1 }} />
            Custom Options
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
