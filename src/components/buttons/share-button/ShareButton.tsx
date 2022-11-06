import {
  Box,
  ButtonBase,
  Dialog,
  DialogTitle,
  styled,
  TextField,
  Tooltip,
} from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import { pallet } from "../../../themes/theme";
import ContentCopySharpIcon from "@mui/icons-material/ContentCopySharp";
import { useState } from "react";
import { ClipboardManager } from "../../../services/clipboard-manager/clipboard-manager";
import { SnackBarAlert } from "../../snack-alert";

const StyledShareIcon = styled(ShareIcon)((props) => ({
  color: pallet.WoodsGreen,
  width: "20px",
  "&:hover": {
    cursor: "pointer",
  },
}));

interface IShareButtonProps {
  onClick?: () => void;
  url?: string;
}
function ShareButton(props: IShareButtonProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isReactionAlertOpen, setIsReactionAlertOpen] =
    useState<boolean>(false);
  const handleShareButtonClicked = () => {
    setIsOpen(true);
  };

  const handleClickCopyButton = async () => {
    if (props.url) {
      try {
        // Use the clipboard manager
        await ClipboardManager.writeText(props.url);
        setIsReactionAlertOpen(true);
      } catch (err: any) {
        console.error(err.message);
      }
    }
  };

  return (
    <>
      <ButtonBase onClick={handleShareButtonClicked}>
        <Tooltip title="Share article">
          <StyledShareIcon />
        </Tooltip>
      </ButtonBase>
      <Dialog onClose={() => setIsOpen(false)} open={isOpen} fullWidth>
        <DialogTitle>Share</DialogTitle>
        <Box component="div" padding={3}>
          <TextField
            id="link"
            sx={{ width: "100%" }}
            inputProps={{ readOnly: true }}
            value={props.url}
          />
          <Box
            component="footer"
            display={"flex"}
            justifyContent={"flex-end"}
            pt={0.5}
          >
            <ButtonBase onClick={handleClickCopyButton}>
              <ContentCopySharpIcon />
            </ButtonBase>
          </Box>
        </Box>
      </Dialog>
      <SnackBarAlert
        isOpen={isReactionAlertOpen}
        onClose={() => setIsReactionAlertOpen(false)}
        text={"Copied"}
      />
    </>
  );
}

export default ShareButton;
