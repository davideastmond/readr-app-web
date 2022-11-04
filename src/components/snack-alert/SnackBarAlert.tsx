import { Snackbar, Alert } from "@mui/material";

interface ISnackBarAlertProps {
  isOpen: boolean;
  onClose: () => void;
  text: string;
}

function SnackBarAlert(props: ISnackBarAlertProps) {
  return (
    <Snackbar
      open={props.isOpen}
      autoHideDuration={10000}
      onClose={props.onClose}
    >
      <Alert onClose={props.onClose} severity="success" sx={{ width: "100%" }}>
        {props.text}
      </Alert>
    </Snackbar>
  );
}

export default SnackBarAlert;
