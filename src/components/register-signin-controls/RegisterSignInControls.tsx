import { BoxProps, styled } from "@mui/material";
import { pallet } from "../../themes/theme";
import { StyledButton } from "../buttons/styled-button";
import "./style.css";

const StyledDiv = styled("div")<BoxProps & ISignInControlsProps>((props) => ({
  backgroundColor: props.backgroundFillColor,
  marginLeft: "10%",
  marginRight: "10%",
  [props.theme.breakpoints.down("sm")]: {
    margin: "0",
    borderRadius: "0",
  },
  [props.theme.breakpoints.up("sm")]: {
    marginTop: "50px",
  },
  [props.theme.breakpoints.down("md")]: {
    margin: "0",
  },
}));

interface ISignInControlsProps {
  square?: boolean;
  backgroundFillColor?: string;
  onButtonClicked: (value: "register" | "signIn") => void;
}

function RegisterSignInControls(props: ISignInControlsProps) {
  return (
    <StyledDiv {...{ ...props }}>
      <div className="RegisterSignInControls__controlButtons">
        <StyledButton
          textLabel="Sign in"
          variant="outlined"
          buttonFillColor={pallet.WoodsGreen}
          buttonTextColor={pallet.White}
          onClick={() => props.onButtonClicked("signIn")}
          id="sign-in-button"
        />
        <StyledButton
          textLabel="New account"
          variant="outlined"
          buttonFillColor={pallet.OrangeTangerine}
          buttonTextColor={pallet.White}
          onClick={() => props.onButtonClicked("register")}
          id="register-button"
        />
      </div>
    </StyledDiv>
  );
}

export default RegisterSignInControls;
