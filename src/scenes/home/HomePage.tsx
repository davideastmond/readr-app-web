import { useState } from "react";
import { Box, styled, Typography } from "@mui/material";
import { AppLogo } from "../../components/app-logo";
import { RegisterSignInControls } from "../../components/register-signin-controls";
import { pallet } from "../../themes/theme";
import { HomeTags } from "./HomeTags";
import { useDispatch } from "react-redux";
import LoginCustomizableDialog from "../../components/customizable-dialog";
import RegistrationCustomizableDialog from "../../components/customizable-dialog";
import { SUPPORTED_COUNTRIES } from "../../definitions/supported-countries";
import {
  LOGIN_VALIDATOR,
  REGISTRATION_VALIDATOR,
} from "../../validators/validators";
import { NavLink } from "../../components/nav-link/NavLink";
import { useNavigate } from "react-router-dom";
import { DialogActionType } from "../../components/customizable-dialog/dialog-action-types";
import { AuthClient } from "../../services/client/auth-client";
import {
  ILoginData,
  ILoginResponseData,
  IRegistrationSubmissionData,
} from "../../services/client/definitions/definitions";
import { generateErrors } from "../../utils/error-generator";
import { setSessionUser } from "../../reducers/app-reducer";

interface IModalRegistrationData {
  "register-email": string;
  "register-fn": string;
  "register-ln": string;
  "register-country": string;
  "register-password1": string;
}

interface IModalLoginData {
  "sign-in-email": string;
  "sign-in-password": string;
}

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
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleRegisterSignInControlsButtonClicked = (
    value: "register" | "signIn"
  ) => {
    setMode(value);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setMode(null);
  };

  const registrationActionFunction = async ({
    onError,
    onSuccess,
    data,
  }: {
    onError: (message: string[]) => void;
    onSuccess: (data?: any) => void;
    data: IModalRegistrationData;
  }) => {
    const registrationRequest: IRegistrationSubmissionData = {
      email: data["register-email"],
      firstName: data["register-fn"],
      lastName: data["register-ln"],
      countryCode: data["register-country"],
      plainTextPassword: data["register-password1"],
    };

    try {
      await registerUser(registrationRequest);
      // We should immediately log in here
      const loginData: ILoginData = {
        email: registrationRequest.email,
        plainTextPassword: registrationRequest.plainTextPassword,
      };
      await loginUser(loginData);
      onSuccess();
      closeDialog();
    } catch (err: any) {
      onError(err.message);
    }
  };

  const loginActionFunction = async ({
    onError,
    onSuccess,
    data,
  }: {
    onError: (message: string[]) => void;
    onSuccess: (data?: any) => void;
    data: IModalLoginData;
  }) => {
    const loginData: ILoginData = {
      email: data["sign-in-email"],
      plainTextPassword: data["sign-in-password"],
    };
    try {
      await loginUser(loginData);
      onSuccess();
      closeDialog();
    } catch (err: any) {
      const errors = generateErrors(err);
      onError(errors);
    }
  };

  const loginUser = async (
    loginData: ILoginData
  ): Promise<ILoginResponseData> => {
    const authClient = new AuthClient();
    const response = await authClient.login(loginData);
    dispatch(setSessionUser(response));
    return response;
  };

  const registerUser = async (
    registrationData: IRegistrationSubmissionData
  ) => {
    const authClient = new AuthClient();
    const response = await authClient.registerUser(registrationData);
    console.log("reg response", response);
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
      <LoginCustomizableDialog
        open={isDialogOpen && mode === "signIn"}
        actionType={DialogActionType.SignIn}
        handleClose={closeDialog}
        dialogTitle="Sign In"
        validationFunctions={LOGIN_VALIDATOR}
        actionFunction={loginActionFunction}
        inputFields={[
          {
            label: "E-mail",
            id: "sign-in-email",
            htmlInputType: "email",
            required: true,
            inputFieldType: "text",
          },
          {
            label: "Password",
            id: "sign-in-password",
            htmlInputType: "password",
            required: true,
            inputFieldType: "text",
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
      />
      <RegistrationCustomizableDialog
        open={isDialogOpen && mode === "register"}
        handleClose={closeDialog}
        dialogTitle="Sign up"
        actionType={DialogActionType.Register}
        validationFunctions={REGISTRATION_VALIDATOR}
        actionFunction={registrationActionFunction}
        inputFields={[
          {
            label: "E-mail",
            id: "register-email",
            htmlInputType: "email",
            required: true,
            inputFieldType: "text",
          },
          {
            label: "First name",
            id: "register-fn",
            htmlInputType: "text",
            required: true,
            inputFieldType: "text",
          },
          {
            label: "Last name",
            id: "register-ln",
            htmlInputType: "text",
            required: true,
            inputFieldType: "text",
          },
          {
            label: "Country",
            id: "register-country",
            required: true,
            inputFieldType: "select",
            listItems: SUPPORTED_COUNTRIES.map((country) => {
              return { label: country.label, value: country.id };
            }),
          },
          {
            label: "Password",
            id: "register-password1",
            htmlInputType: "password",
            maxLength: 255,
            required: true,
            inputFieldType: "text",
          },
          {
            label: "Confirm Password",
            id: "register-password2",
            htmlInputType: "password",
            maxLength: 255,
            required: true,
            inputFieldType: "text",
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
