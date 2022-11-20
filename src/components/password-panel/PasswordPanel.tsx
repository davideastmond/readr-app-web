import { Alert, FormControl, styled, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useRef, useState } from "react";
import { useAppSelector } from "../../hooks";
import { selectSessionUser } from "../../reducers/app.reducer";
import { UserClient } from "../../services/client/user-client";
import { pallet } from "../../themes/theme";
import { allFieldsAreValidated } from "../../validators/validator";
import { UPDATE_PASSWORD_VALIDATOR } from "../../validators/validators-functions";
import { StyledButton } from "../buttons/styled-button";
import { SnackBarAlert } from "../snack-alert";
import { Spinner } from "../spinner";
import { StyledTextField } from "../text-input";

interface IUserSettingsPanelProps {
  hasSession?: boolean;
}

const StyledSettingsBox = styled(Box)((props) => ({
  marginBottom: "20px",
}));

/**
 * This component allows user to update their password
 * As well as first and last name. E-mail will appear as a static readonly label
 */
function PasswordPanel(props: IUserSettingsPanelProps) {
  const [userEmail, setUserEmail] = useState<string>("");
  const sessionUser = useAppSelector(selectSessionUser);
  const [hasError, setHasError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [snackBarIsOpen, setSnackBarIsOpen] = useState<boolean>(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [hasValidationError, setHasValidationError] = useState<boolean>(false);
  useEffect(() => {
    getEmailAddress();
  }, []);

  const inputRefs = useRef<any>({});

  const getEmailAddress = async () => {
    const userClient = new UserClient();
    const emailData = await userClient.getEmailAddress();
    setUserEmail(emailData.email);
  };

  const handleTextInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    inputRefs.current = {
      ...inputRefs.current,
      [event.target.id]: event.target.value,
    };
  };

  const onSubmitUpdatePassword = async () => {
    // Do some validation
    // Do a put request to update user password
    clearErrors();
    const userClient = new UserClient();
    const plainTextPassword = inputRefs.current["update-password1"];
    if (!validatePasswordFields()) return;
    if (plainTextPassword) {
      try {
        setIsLoading(true);
        await userClient.putUpdatePassword(plainTextPassword);
        // Display a success message
        setSnackBarIsOpen(true);
        setIsLoading(false);
      } catch (err: any) {
        setHasError(true);
        setErrorMessage(err.message);
        console.log(err);
      }
    }
  };

  const validatePasswordFields = (): boolean => {
    const result = allFieldsAreValidated(
      UPDATE_PASSWORD_VALIDATOR,
      inputRefs.current
    );
    if (result.success) return true;
    setValidationErrors(result.validationMessages);
    setHasValidationError(true);
    return result.success;
  };

  const clearErrors = () => {
    setHasValidationError(false);
    setValidationErrors([]);
    setErrorMessage("");
    setHasError(false);
    setIsLoading(false);
    setSnackBarIsOpen(false);
  };

  const handleSnackBarClose = () => {
    setSnackBarIsOpen(false);
  };
  return (
    <Box width="100%">
      {isLoading && (
        <div className="Spinner__enclosure">
          <Spinner />
        </div>
      )}
      {hasError && (
        <Box
          component={"div"}
          display="flex"
          justifyContent={"center"}
          marginTop="10px"
        >
          <Alert severity="error" sx={{ backgroundColor: pallet.White }}>
            {errorMessage}
          </Alert>
        </Box>
      )}
      <SnackBarAlert
        isOpen={snackBarIsOpen}
        onClose={handleSnackBarClose}
        text="Password updated successfully"
      />
      <StyledSettingsBox mb={"20px"}>
        {sessionUser && (
          <Typography variant="h3">
            {`${sessionUser.firstName} ${sessionUser.lastName}`}
          </Typography>
        )}
      </StyledSettingsBox>
      <StyledSettingsBox>
        <Typography color={pallet.DarkCharcoalGrey}>{userEmail}</Typography>
      </StyledSettingsBox>
      <StyledSettingsBox>
        <form>
          <header>Update your password</header>
          <Box>
            <FormControl>
              <StyledTextField
                id="update-password1"
                label="Enter a Password"
                onChange={handleTextInputChange}
                maxLength={255}
                type="password"
                required={true}
              />
            </FormControl>
          </Box>
          <Box>
            <FormControl>
              <StyledTextField
                id="update-password2"
                label="Confirm Password"
                onChange={handleTextInputChange}
                maxLength={255}
                type="password"
                required={true}
              />
            </FormControl>
          </Box>
          <Box>
            <FormControl>
              <StyledButton
                textLabel="Update"
                id="submit-update-password"
                buttonFillColor={pallet.WoodsGreen}
                buttonTextColor={pallet.White}
                onClick={onSubmitUpdatePassword}
                squared={true}
                disabled={isLoading}
              />
            </FormControl>
          </Box>
        </form>
      </StyledSettingsBox>
      <Box>
        {hasValidationError &&
          validationErrors &&
          validationErrors.map((msg) => (
            <Alert sx={{ backgroundColor: pallet.White }} severity="error">
              {msg}
            </Alert>
          ))}
      </Box>
    </Box>
  );
}

export default PasswordPanel;
