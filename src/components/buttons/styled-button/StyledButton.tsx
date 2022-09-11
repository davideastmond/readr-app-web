import { styled } from "@mui/material";
import Button, { ButtonProps } from "@mui/material/Button";
import { pallet } from "../../../themes/theme";

interface IStyledButtonProps extends ButtonProps {
  textLabel: string;
  buttonTextColor?: string;
  buttonFillColor?: string;
  squared?: boolean;
  onClick?: () => void;
}

const CustomButton = styled(Button)<IStyledButtonProps>(
  ({ theme, ...props }) => ({
    color: props.buttonTextColor || pallet.White,
    backgroundColor: props.buttonFillColor || pallet.White,
    borderRadius: `${props.squared && "0px"}`,
    "&:hover": {
      color: pallet.DarkCharcoalGrey,
    },
  })
);

function StyledButton(props: IStyledButtonProps) {
  return (
    <CustomButton {...{ ...props }} onClick={props.onClick}>
      {props.textLabel}
    </CustomButton>
  );
}

export default StyledButton;
