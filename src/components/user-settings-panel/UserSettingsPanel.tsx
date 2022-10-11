import { FormControl, styled, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useRef, useState } from "react";
import { useAppSelector } from "../../hooks";
import { selectSessionUser } from "../../reducers/app-reducer";
import { UserClient } from "../../services/client/user-client";
import { pallet } from "../../themes/theme";
import { StyledButton } from "../buttons/styled-button";
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
function UserSettingsPanel(props: IUserSettingsPanelProps) {
  const [userEmail, setUserEmail] = useState<string>("");
  const sessionUser = useAppSelector(selectSessionUser);
  useEffect(() => {
    getEmailAddress();
  }, []);

  const inputRefs = useRef({});

  const getEmailAddress = async () => {
    const userClient = new UserClient();
    const emailData = await userClient.getEmailAddress();
    setUserEmail(emailData.email);
  };

  const handleTextInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    inputRefs.current = {
      ...inputRefs,
      [event.target.id]: event.target.value,
    };
  };
  return (
    <Box width="100%">
      <StyledSettingsBox mb={"20px"}>
        {sessionUser && (
          <Typography>
            {`${sessionUser.firstName} ${sessionUser.lastName}`}
          </Typography>
        )}
      </StyledSettingsBox>
      <StyledSettingsBox>
        <Typography>Your e-mail address:</Typography>
        <Typography>{userEmail}</Typography>
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
          <FormControl>
            <StyledButton
              textLabel="Update"
              id="submit-update-password"
              buttonTextColor={pallet.DarkCharcoalGrey}
            />
          </FormControl>
        </form>
      </StyledSettingsBox>
    </Box>
  );
}

export default UserSettingsPanel;
