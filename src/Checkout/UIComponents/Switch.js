import { styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 210,
  height: 90,
  padding: 7,
  "& .MuiSwitch-switchBase": {
    margin: 1,
    padding: 0,
    transform: "translateX(6px)",
    "&.Mui-checked": {
      color: "#fff",
      transform: "translateX(97px)",
      "& .MuiSwitch-thumb:before": {
        content: "'Pickup'",
      },
      "& + .MuiSwitch-track": {
        "&:before": {
          content: "'Delivery'",
          fontSize: 16,
          position: "absolute",
          width: "100%",
          height: "100%",
          left: 30,
          top: 35,
        },
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#c0bec2",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: theme.palette.mode === "dark" ? "#003892" : "#290052",
    width: 110,
    height: 76,
    borderRadius: 40,
    marginTop: 6,
    "&:before": {
      content: "'Delivery'",
      fontSize: 18,
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 25,
      top: 30,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
    },
  },
  "& .MuiSwitch-track": {
    "&:after": {
      content: "'Pickup'",
      fontSize: 16,
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 127,
      top: 35,
    },
    opacity: 1,
    backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#c0bec2",
    borderRadius: 80 / 2,
  },
}));

export default MaterialUISwitch;
