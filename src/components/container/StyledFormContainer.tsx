import { Box, styled } from "@mui/material";

const StyledFormContainer = styled(Box)((props) => ({
  padding: "2rem",
  [props.theme.breakpoints.up("sm")]: {
    marginLeft: "20%",
    marginRight: "20%",
    boxShadow: "6px 4px 4px grey",
    borderRadius: "4px",
    marginTop: "10%",
  },
  [props.theme.breakpoints.up("lg")]: {
    marginLeft: "30%",
    marginRight: "30%",
  },
}));

export default StyledFormContainer;
