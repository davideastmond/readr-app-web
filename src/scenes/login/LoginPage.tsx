import { Alert, Box, FormControl, Typography } from "@mui/material";
import { useRef, useState } from "react";
import { StyledButton } from "../../components/buttons/styled-button";
import { StyledFormContainer } from "../../components/container";
import { Spinner } from "../../components/spinner";
import StyledTextField from "../../components/text-input/styled-text-field";
import { pallet } from "../../themes/theme";
import { LOGIN_RULES } from "../../validators/validator-rules";
import { AppDispatch } from "../../store";
import {
  ILoginData,
  ILoginResponseData,
} from "../../services/client/definitions/definitions";
import { useDispatch } from "react-redux";
import { setAuthSessionUser } from "../../reducers/app/app.reducer";
import { AuthClient } from "../../services/client/auth-client";
import { useNavigate } from "react-router-dom";
import { AppLogo } from "../../components/app-logo";
import { createFriendlyErrorMessage } from "../../utils/friendly-error-message-factory";
import { motion } from "framer-motion";
import { isSessionActiveAsync } from "../../reducers/app/thunks/app.thunks";
import { FormFields } from "../../definitions/form-fields";
import { FormInputValidator } from "../../validators/form-input-validator/form-input-validator";

const MotionStyledFormContainer = motion(StyledFormContainer);

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
    return errorMessages.map((errorMessage, index) => (
      <Alert
        key={`${index}_errorMessage`}
        sx={{ backgroundColor: pallet.White }}
        severity="error"
      >
        {errorMessage}
      </Alert>
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
    const loginValidator: FormInputValidator = new FormInputValidator();
    const result = loginValidator.validate(inputValuesRef.current, LOGIN_RULES);

    if (result.success) {
      const loginData: ILoginData = {
        email: inputValuesRef.current[FormFields.SignInEmail],
        plainTextPassword: inputValuesRef.current[FormFields.SignInPassword],
      };
      try {
        await loginUser(loginData);
        resetAllStatuses();
        navigate("/hub");
      } catch (err: any) {
        setHasActionError(true);
        const errors = [];
        errors.push(err.message);
        setActionErrorMessages(errors);
      } finally {
        setIsBusy(false);
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
    <MotionStyledFormContainer
      component={"form"}
      display="grid"
      pt={5}
      animate={{ opacity: [0, 1] }}
    >
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
          id={FormFields.SignInEmail}
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
          id={FormFields.SignInPassword}
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
          actionErrorMessages.map((msg, index) => (
            <Alert
              key={`${index}_msg`}
              sx={{ backgroundColor: pallet.White }}
              severity="error"
            >
              {createFriendlyErrorMessage(msg)}
            </Alert>
          ))}
      </Box>
    </MotionStyledFormContainer>
  );
}

export default LoginPage;
