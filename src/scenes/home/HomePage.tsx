import { useState } from "react";
import { Box, styled } from "@mui/material";
import { AppLogo } from "../../components/app-logo";
import { RegisterSignInControls } from "../../components/register-signin-controls";
import { pallet } from "../../themes/theme";
import { HomeTags } from "./HomeTags";

import LoginCustomizableDialog from "../../components/customizable-dialog";
import RegistrationCustomizableDialog from "../../components/customizable-dialog";

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
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [mode, setMode] = useState<"register" | "signIn" | null>(null);

  const handleRegisterSignInControlsButtonClicked = (
    value: "register" | "signIn"
  ) => {
    setMode(value);
    setIsDialogOpen(true);
  };

  const handleActionButtonClicked = ({
    event,
    textInputValues,
  }: {
    event?: any;
    textInputValues: { [keyof: string]: string };
  }) => {
    if (event.target.id && event.target.id.includes("cancel")) {
      closeDialog();
    }
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setMode(null);
  };

  return (
    <>
      <ResponsiveMainBoxContainer>
        <Box mt={5} width={"100%"} display={"flex"} justifyContent={"center"}>
          <AppLogo width={"100%"} />
        </Box>
        <StyledSecondSquare width={"100%"}>
          <RegisterSignInControls
            square
            backgroundFillColor={pallet.White}
            onButtonClicked={handleRegisterSignInControlsButtonClicked}
          />
        </StyledSecondSquare>
      </ResponsiveMainBoxContainer>
      <StyledHomeTags />
      <LoginCustomizableDialog
        open={isDialogOpen && mode === "signIn"}
        handleClose={closeDialog}
        dialogTitle="Sign In"
        inputFields={[
          {
            label: "E-mail",
            id: "sign-in-email",
            type: "email",
            required: true,
          },
          {
            label: "Password",
            id: "sign-in-password",
            type: "password",
            required: true,
          },
        ]}
        actionButtons={[
          {
            label: "Cancel",
            id: "sign-in-cancel",
            type: "cancel",
            stylings: {
              buttonFillColor: pallet.IceCreamPink,
              buttonTextColor: pallet.White,
            },
          },
          {
            label: "Go",
            id: "sign-in-go",
            stylings: {
              buttonFillColor: pallet.WoodsGreen,
              buttonTextColor: pallet.White,
            },
            isSubmit: true,
          },
        ]}
        onActionButtonClicked={handleActionButtonClicked}
      />
      <RegistrationCustomizableDialog
        open={isDialogOpen && mode === "register"}
        handleClose={closeDialog}
        dialogTitle="Sign up"
        onActionButtonClicked={handleActionButtonClicked}
        inputFields={[
          {
            label: "E-mail",
            id: "register-email",
            type: "email",
            required: true,
          },
          {
            label: "First name",
            id: "register-fn",
            type: "text",
            required: true,
          },
          {
            label: "Last name",
            id: "register-ln",
            type: "text",
            required: true,
          },
          {
            label: "Password",
            id: "register-password1",
            type: "password",
            required: true,
          },
          {
            label: "Confirm Password",
            id: "register-password2",
            type: "password",
            required: true,
          },
        ]}
        actionButtons={[
          {
            label: "Cancel",
            id: "register-cancel",
            type: "cancel",
            stylings: {
              buttonFillColor: pallet.IceCreamPink,
              buttonTextColor: pallet.White,
            },
          },
          {
            label: "Go",
            id: "register-go",
            stylings: {
              buttonFillColor: pallet.WoodsGreen,
              buttonTextColor: pallet.White,
            },
            isSubmit: true,
          },
        ]}
      />
    </>
  );
}

export default HomePage;
