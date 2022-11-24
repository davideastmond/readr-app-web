import {
  Alert,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { useRef, useState } from "react";
import { StyledButton } from "../../components/buttons/styled-button";
import { StyledFormContainer } from "../../components/container";
import { Spinner } from "../../components/spinner";
import StyledTextField from "../../components/text-input/styled-text-field";
import { pallet } from "../../themes/theme";
import { allFieldsAreValidated } from "../../validators/validator";
import { REGISTRATION_VALIDATOR } from "../../validators/validators-functions";
import { AppDispatch } from "../../store";
import {
  ILoginData,
  ILoginResponseData,
  IRegistrationSubmissionData,
} from "../../services/client/definitions/definitions";
import { useDispatch } from "react-redux";
import { setAuthSessionUser } from "../../reducers/app/app.reducer";
import { AuthClient } from "../../services/client/auth-client";
import { useNavigate } from "react-router-dom";
import { SUPPORTED_COUNTRIES } from "../../definitions/supported-countries";
import { createFriendlyErrorMessage } from "../../utils/friendly-error-message-factory";
import { AppLogo } from "../../components/app-logo";
import { isSessionActiveAsync } from "../../reducers/app/thunks/app.thunks";
function RegisterPage() {
  const [isBusy, setIsBusy] = useState<boolean>(false);
  const inputValuesRef = useRef<{ [keyof: string]: string }>({});
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [hasValidationError, setHasValidationError] = useState<boolean>(false);
  const [hasActionError, setHasActionErrors] = useState<boolean>(false);
  const [actionErrorMessage, setActionErrorMessages] = useState<
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
    setHasActionErrors(false);
    setActionErrorMessages(null);
  };

  const generateValidationErrors = (errorMessages: string[]) => {
    return errorMessages.map((errorMessage) => (
      <Alert sx={{ backgroundColor: pallet.White }} severity="error">
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
    const result = allFieldsAreValidated(
      REGISTRATION_VALIDATOR,
      inputValuesRef.current
    );

    if (result.success) {
      const registrationRequest: IRegistrationSubmissionData = {
        email: inputValuesRef.current["register-email"],
        firstName: inputValuesRef.current["register-fn"],
        lastName: inputValuesRef.current["register-ln"],
        countryCode: inputValuesRef.current["register-country"],
        plainTextPassword: inputValuesRef.current["register-password1"],
      };
      try {
        await registerUser(registrationRequest);
        resetAllStatuses();
        const loginData: ILoginData = {
          email: inputValuesRef.current["register-email"],
          plainTextPassword: inputValuesRef.current["register-password1"],
        };
        // We should immediately log them in and then push them to the hub
        await loginUser(loginData);
        navigate("/hub");
      } catch (err: any) {
        setIsBusy(false);
        setHasActionErrors(true);
        const errors = actionErrorMessage || [];
        errors.push(err.message);
        setActionErrorMessages(errors);
      }
    } else {
      setIsBusy(false);
      setHasValidationError(true);
      setValidationErrors(result.validationMessages);
    }
  };

  const registerUser = async (
    registrationData: IRegistrationSubmissionData
  ) => {
    const authClient = new AuthClient();
    await authClient.registerUser(registrationData);
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
  const handleSelectChange = (event: SelectChangeEvent) => {
    inputValuesRef.current = {
      ...inputValuesRef.current,
      [event.target.name]: event.target.value,
    };
  };
  return (
    <StyledFormContainer component={"form"} display="grid" pt={5}>
      <Box display="flex" justifyContent={"center"}>
        <AppLogo width="200" />
      </Box>
      <Box>
        <Typography variant="h3" textAlign={"center"} mb={4}>
          Sign up
        </Typography>
      </Box>
      {isBusy && (
        <div className="Spinner__enclosure">
          <Spinner />
        </div>
      )}
      <FormControl>
        <StyledTextField
          id="register-email"
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
          id="register-fn"
          label="First Name"
          onChange={handleTextInputChange}
          maxLength={65}
          type="text"
          required={true}
          disabled={isBusy}
        />
      </FormControl>
      <FormControl>
        <StyledTextField
          id="register-ln"
          label="Last Name"
          onChange={handleTextInputChange}
          maxLength={65}
          type="text"
          required={true}
          disabled={isBusy}
        />
      </FormControl>
      <FormControl>
        <InputLabel>Select your country</InputLabel>
        <Select
          id="register-country"
          key={`selectField_register-country`}
          required={true}
          onChange={handleSelectChange}
          name="register-country"
          value={undefined}
          disabled={isBusy}
        >
          {SUPPORTED_COUNTRIES.map((country) => {
            return { label: country.label, value: country.id };
          }).map((listItem) => (
            <MenuItem value={listItem.value}>{listItem.label}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl>
        <StyledTextField
          id="register-password1"
          label="Enter a Password"
          onChange={handleTextInputChange}
          maxLength={255}
          type="password"
          required={true}
          disabled={isBusy}
        />
      </FormControl>
      <FormControl>
        <StyledTextField
          id="register-password2"
          label="Confirm Password"
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
          id="register-cancel"
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
          id="register-go"
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
          actionErrorMessage &&
          actionErrorMessage.map((msg) => (
            <Alert sx={{ backgroundColor: pallet.White }} severity="error">
              {createFriendlyErrorMessage(msg)}
            </Alert>
          ))}
      </Box>
    </StyledFormContainer>
  );
}

export default RegisterPage;
