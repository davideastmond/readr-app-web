import { Alert, Box, FormControl, Typography } from "@mui/material";
import { useRef, useState } from "react";
import { StyledButton } from "../../components/buttons/styled-button";
import { StyledFormContainer } from "../../components/container";
import { Spinner } from "../../components/spinner";
import StyledTextField from "../../components/text-input/styled-text-field";
import { pallet } from "../../themes/theme";
import { allFieldsAreValidated } from "../../validators/validator";
import { LOGIN_VALIDATOR } from "../../validators/validators-functions";
import { AppDispatch } from "../../store";
import {
  ILoginData,
  ILoginResponseData,
} from "../../services/client/definitions/definitions";
import { useDispatch } from "react-redux";
import {
  setAuthSessionUser,
  isSessionActiveAsync,
} from "../../reducers/app-reducer";
import { AuthClient } from "../../services/client/auth-client";
import { useNavigate } from "react-router-dom";
import { AppLogo } from "../../components/app-logo";
import { createFriendlyErrorMessage } from "../../utils/friendly-error-message-factory";
function LoginPage() {
  const [isBusy, setIsBusy] = useState<boolean>(false);
  const inputValuesRef = useRef<{ [keyof: string]: string }>({});
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [hasValidationError, setHasValidationError] = useState<boolean>(false);
  const [hasActionError, setHasActionError] = useState<boolean>(false);
  const [actionErrorMessages, setActionErrorMessages] = useState<
    string[] | null
  >(null);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const handleTextInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    inputValuesRef.current = {
      ...inputValuesRef.current,
      [event.target.id]: event.target.value,
    };
  };

  const resetAllStatuses = () => {
    setIsBusy(false);
    setHasActionError(false);
    setActionErrorMessages(null);
  };

  const generateValidationErrors = (errorMessages: string[]) => {
    return errorMessages.map((errorMessage) => (
      <Alert severity="error">{errorMessage}</Alert>
    ));
  };

  const handleActionButtonClicked = async (event: any) => {
    resetAllStatuses();

    if (event.target.id.includes("-cancel")) {
      inputValuesRef.current = {};
      // Go back home?
      navigate("/");
      return;
    }
    setIsBusy(true);
    const result = allFieldsAreValidated(
      LOGIN_VALIDATOR,
      inputValuesRef.current
    );

    if (result.success) {
      const loginData: ILoginData = {
        email: inputValuesRef.current["sign-in-email"],
        plainTextPassword: inputValuesRef.current["sign-in-password"],
      };
      try {
        await loginUser(loginData);
        resetAllStatuses();
        navigate("/hub");
      } catch (err: any) {
        setHasActionError(true);
        setActionErrorMessages(err.message);
        const errors = actionErrorMessages || [];
        errors.push(err.message);
        setActionErrorMessages(errors);
      }
    } else {
      setIsBusy(false);
      setHasValidationError(true);
      setValidationErrors(result.validationMessages);
    }
  };

  const loginUser = async (
    loginData: ILoginData
  ): Promise<ILoginResponseData> => {
    const authClient = new AuthClient();
    const response = await authClient.login(loginData);
    dispatch(setAuthSessionUser(response));
    dispatch(isSessionActiveAsync());
    return response;
  };

  return (
    <StyledFormContainer component={"form"} display="grid" pt={5}>
      <Box display="flex" justifyContent={"center"}>
        <AppLogo width="200" />
      </Box>
      <Box>
        <Typography variant="h3" textAlign={"center"} mb={4}>
          Login
        </Typography>
      </Box>
      {isBusy && <Spinner />}
      <FormControl>
        <StyledTextField
          id="sign-in-email"
          label="E-mail"
          onChange={handleTextInputChange}
          maxLength={255}
          type="email"
          required={true}
          disabled={isBusy}
        />
      </FormControl>
      <FormControl>
        <StyledTextField
          id="sign-in-password"
          label="Password"
          onChange={handleTextInputChange}
          maxLength={255}
          type="password"
          required={true}
          disabled={isBusy}
        />
      </FormControl>
      <FormControl>
        <StyledButton
          textLabel="Cancel"
          onClick={handleActionButtonClicked}
          id="sign-in-cancel"
          buttonTextColor={pallet.White}
          buttonFillColor={pallet.IceCreamPink}
          disabled={isBusy}
          sx={{ marginTop: "5px" }}
        />
      </FormControl>
      <FormControl>
        <StyledButton
          textLabel="Go"
          onClick={handleActionButtonClicked}
          id="sign-in-go"
          buttonTextColor={pallet.White}
          buttonFillColor={pallet.WoodsGreen}
          type="submit"
          disabled={isBusy}
          sx={{ marginTop: "5px" }}
        />
      </FormControl>
      <Box>
        {hasValidationError &&
          validationErrors &&
          generateValidationErrors(validationErrors)}
        {hasActionError &&
          actionErrorMessages &&
          actionErrorMessages.map((msg) => (
            <Alert severity="error">{createFriendlyErrorMessage(msg)}</Alert>
          ))}
      </Box>
    </StyledFormContainer>
  );
}

export default LoginPage;
