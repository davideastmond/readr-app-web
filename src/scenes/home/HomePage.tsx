import { Box, styled } from "@mui/material";
import { AppLogo } from "../../components/app-logo";
import { RegisterSignInControls } from "../../components/register-signin-controls";
import { pallet } from "../../themes/theme";
import { HomeTags } from "./HomeTags";

const ResponsiveMainBoxContainer = styled(Box)((props) => ({
  [props.theme.breakpoints.down("md")]: {
    display: "block",
  },
  [props.theme.breakpoints.up("md")]: {
    display: "flex",
    justifyContent: "space-evenly",
  },
}));

const StyledSecondSquare = styled(Box)((props) => ({
  [props.theme.breakpoints.down("sm")]: {
    height: "200px",
  },
  [props.theme.breakpoints.up("md")]: {
    paddingTop: "180px",
  },
}));

const StyledHomeTags = styled(HomeTags)((props) => ({
  [props.theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

// Home page with app logo
function HomePage() {
  return (
    <>
      <ResponsiveMainBoxContainer>
        <Box mt={5} width={"100%"} display={"flex"} justifyContent={"center"}>
          <AppLogo width={"100%"} />
        </Box>
        <StyledSecondSquare width={"100%"}>
          <RegisterSignInControls square backgroundFillColor={pallet.White} />
        </StyledSecondSquare>
      </ResponsiveMainBoxContainer>
      <StyledHomeTags />
    </>
  );
}

export default HomePage;
