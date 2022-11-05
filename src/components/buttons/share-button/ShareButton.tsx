import { ButtonBase, styled, Tooltip } from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import { pallet } from "../../../themes/theme";

const StyledShareIcon = styled(ShareIcon)((props) => ({
  color: pallet.WoodsGreen,
  width: "20px",
  "&:hover": {
    cursor: "pointer",
  },
}));

interface IShareButtonProps {
  onClick?: () => void;
}
function ShareButton(props: IShareButtonProps) {
  return (
    <Tooltip title="Share article">
      <ButtonBase>
        <StyledShareIcon />
      </ButtonBase>
    </Tooltip>
  );
}

export default ShareButton;
