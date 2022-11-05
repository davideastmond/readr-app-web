import {
  ButtonBase,
  Dialog,
  DialogTitle,
  Paper,
  styled,
  Tooltip,
} from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import { pallet } from "../../../themes/theme";
import { StyledTextField } from "../../text-input";

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
    <>
      <Tooltip title="Share article">
        <ButtonBase>
          <StyledShareIcon />
        </ButtonBase>
      </Tooltip>
      <Dialog onClose={() => {}} open={true} fullWidth>
        <DialogTitle>Share</DialogTitle>
        <Box>
          <StyledTextField label="" id="link"></StyledTextField>
        </Box>
      </Dialog>
    </>
  );
}

export default ShareButton;
