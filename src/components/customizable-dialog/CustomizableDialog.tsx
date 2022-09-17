import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  styled,
  DialogProps,
  FormControl,
  Box,
} from "@mui/material";
import React, { useRef } from "react";
import { StyledButton } from "../buttons/styled-button";
import { StyledTextField } from "../text-input";

interface ICustomizableDialogProps {
  open: boolean;
  handleClose: () => void;
  onActionButtonClicked: ({
    event,
    textInputValues,
  }: {
    event?: any;
    textInputValues: { [keyof: string]: string };
  }) => void;
  dialogTitle: string;
  dialogContentText?: string;
  inputFields?: {
    label: string;
    id: string;
    type?: string;
    required?: boolean;
    validationErrorMessage?: string;
  }[];
  actionButtons?: {
    label: string;
    id: string;
    stylings?: { buttonTextColor?: string; buttonFillColor?: string };
    type?: "normal" | "cancel";
    isSubmit?: boolean;
  }[];
  dialogBackgroundColor?: string;
}

const StyledDialog = styled(Dialog)(({ theme, ...props }) => ({
  "&& .MuiDialogContent-root": {
    paddingTop: "5px",
  },
}));

function CustomizableDialog(props: ICustomizableDialogProps) {
  // const [ textInputValues, setTextInputValues ] = useState<{ [keyof: string]: string }>({});
  const textInputValuesRef = useRef<{ [keyof: string]: string }>({});

  const handleTextInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    textInputValuesRef.current = {
      ...textInputValuesRef.current,
      [event.target.id]: event.target.value,
    };
  };

  return (
    <StyledDialog open={props.open} onClose={props.handleClose}>
      <DialogTitle>{props.dialogTitle}</DialogTitle>
      <DialogContent>
        <Box component={"form"}>
          <FormControl>
            {props.dialogContentText && (
              <DialogContentText>{props.dialogContentText}</DialogContentText>
            )}
            {props.inputFields &&
              props.inputFields.map((fieldData) => (
                <StyledTextField
                  id={fieldData.id}
                  label={fieldData.label}
                  onChange={handleTextInputChange}
                  key={`inputField_${fieldData.id}`}
                  type={fieldData.type}
                  required={fieldData.required}
                />
              ))}
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions>
        {props.actionButtons &&
          props.actionButtons.map((fieldData) => (
            <StyledButton
              textLabel={fieldData.label}
              onClick={(event: any) =>
                props.onActionButtonClicked({
                  event,
                  textInputValues: textInputValuesRef.current,
                })
              }
              id={fieldData.id}
              buttonTextColor={fieldData.stylings?.buttonTextColor}
              buttonFillColor={fieldData.stylings?.buttonFillColor}
              key={`actionButtonField_${fieldData.id}`}
              type={fieldData.isSubmit ? "submit" : undefined}
            />
          ))}
      </DialogActions>
    </StyledDialog>
  );
}

export default CustomizableDialog;
