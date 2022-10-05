import { Box, styled, Typography } from "@mui/material";
import { AppLogo } from "../../components/app-logo";
import { RegisterSignInControls } from "../../components/register-signin-controls";
import { pallet } from "../../themes/theme";
import { HomeTags } from "./HomeTags";

import { NavLink } from "../../components/nav-link/NavLink";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  const handleRegisterSignInControlsButtonClicked = (
    value: "register" | "signIn"
  ) => {
    if (value === "signIn") {
      navigate("/login");
    } else if (value === "register") {
      navigate("/register");
    }
  };

  return (
    <>
      <ResponsiveMainBoxContainer>
        <Box mt={5} width={"100%"} display={"flex"} justifyContent={"center"}>
          <AppLogo width={"100%"} />
        </Box>
        <StyledSecondSquare width={"100%"}>
          <div style={{ textAlign: "center" }}>
            <Typography>
              Register a new account or log in with your existing account.
            </Typography>
            <NavLink
              text="Check latest headlines here"
              onClick={() => navigate("/headlines")}
            />
          </div>
          <RegisterSignInControls
            square
            backgroundFillColor={pallet.White}
            onButtonClicked={handleRegisterSignInControlsButtonClicked}
          />
        </StyledSecondSquare>
      </ResponsiveMainBoxContainer>
      <StyledHomeTags />
    </>
  );
}

export default HomePage;
