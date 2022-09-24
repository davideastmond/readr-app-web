import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  styled,
  FormControl,
  Box,
  Select,
  SelectChangeEvent,
  MenuItem,
  Typography,
  Alert,
} from "@mui/material";
import { DialogActionType } from "./dialog-action-types";
import React, { useRef, useState } from "react";
import { IValidationRule } from "../../validators/validators.definitions";
import { StyledButton } from "../buttons/styled-button";
import { StyledTextField } from "../text-input";
import { Spinner } from "../spinner";

interface IInputTextFieldData {
  label: string;
  id: string;
  inputFieldType: "text";
  required?: boolean;
  htmlInputType: string;
  placeholder?: string;
  helperText?: string;
  maxLength?: number;
}

interface IInputSelectFieldData {
  label: string;
  id: string;
  inputFieldType: "select";
  required?: boolean;
  listItems: { label: string; value: string | number }[];
}
interface ICustomizableDialogProps {
  open: boolean;
  actionType: DialogActionType;
  handleClose: () => void;
  dialogTitle: string;
  dialogContentText?: string;
  inputFields?: (IInputTextFieldData | IInputSelectFieldData)[];
  validationFunctions?: IValidationRule[];
  actionButtons?: {
    label: string;
    id: string;
    stylings?: { buttonTextColor?: string; buttonFillColor?: string };
    type?: "normal" | "cancel";
    isSubmit?: boolean;
    onClickFunction?: () => void;
  }[];
  dialogBackgroundColor?: string;
  actionFunction?: ({
    onError,
    onSuccess,
    data,
  }: {
    onError: (message: string[]) => void;
    onSuccess: (data: any) => void;
    data: any;
  }) => void;
}

const StyledDialog = styled(Dialog)(({ theme, ...props }) => ({
  "&& .MuiDialogContent-root": {
    paddingTop: "5px",
  },
}));

function CustomizableDialog(props: ICustomizableDialogProps) {
  // const [ textInputValues, setTextInputValues ] = useState<{ [keyof: string]: string }>({});
  const inputValuesRef = useRef<{ [keyof: string]: string }>({});
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [hasValidationError, setHasValidationError] = useState<boolean>(false);
  const [hasActionError, setHasActionError] = useState<boolean>(false);
  const [actionErrorMessage, setActionErrorMessage] = useState<string[] | null>(
    null
  );
  const [isBusy, setIsBusy] = useState<boolean>(false);
  const handleTextInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    inputValuesRef.current = {
      ...inputValuesRef.current,
      [event.target.id]: event.target.value,
    };
  };

  const handleSelectChange = (event: SelectChangeEvent) => {
    inputValuesRef.current = {
      ...inputValuesRef.current,
      [event.target.name]: event.target.value,
    };
  };

  const getUIElementFromInputFieldType = (
    fieldData: IInputTextFieldData | IInputSelectFieldData
  ) => {
    switch (fieldData.inputFieldType) {
      case "text":
        return (
          <StyledTextField
            id={fieldData.id}
            label={fieldData.label}
            onChange={handleTextInputChange}
            maxLength={fieldData.maxLength}
            key={`inputField_${fieldData.id}`}
            type={fieldData.htmlInputType}
            required={fieldData.required}
            helperText={fieldData.helperText}
            disabled={isBusy}
          />
        );
      case "select":
        return (
          <>
            <Typography
              fontWeight={"thin"}
            >{`Please select your ${fieldData.label.toLowerCase()}`}</Typography>
            <Select
              id={fieldData.id}
              key={`selectField_${fieldData.id}`}
              required={fieldData.required}
              onChange={handleSelectChange}
              name={fieldData.id}
              value={undefined}
              disabled={isBusy}
            >
              {fieldData.listItems &&
                fieldData.listItems.length > 0 &&
                fieldData.listItems.map((listItem) => (
                  <MenuItem value={listItem.value}>{listItem.label}</MenuItem>
                ))}
            </Select>
          </>
        );
    }
  };

  const allFieldsAreValidated = (): {
    success: boolean;
    validationMessages: string[];
  } => {
    const errors: string[] = [];
    if (props.validationFunctions) {
      for (const validationInstruction of props.validationFunctions) {
        const fieldsToEvaluate = validationInstruction.fields.map((field) => {
          return inputValuesRef.current[field];
        });
        if (!validationInstruction.validationFunction(...fieldsToEvaluate)) {
          errors.push(validationInstruction.validationMessage);
        }
      }
    }
    return errors.length > 0
      ? { success: false, validationMessages: errors }
      : { success: true, validationMessages: [] };
  };

  const resetAllStatuses = () => {
    setIsBusy(false);
    setHasActionError(false);
    setActionErrorMessage(null);
  };

  const handleActionButtonClicked = (event: any) => {
    setHasValidationError(false);
    if (event.target.id.includes("-cancel")) {
      inputValuesRef.current = {};
      resetAllStatuses();
      props.handleClose();
      return;
    }

    const result = allFieldsAreValidated();

    if (result.success) {
      // Perform some action, reset errors and activate the spinner
      resetAllStatuses();
      props.actionFunction &&
        props.actionFunction({
          onError: (message: string[]) => {
            setHasActionError(true);
            setActionErrorMessage(message);
          },
          onSuccess: (data) => {
            resetAllStatuses();
          },
          data: inputValuesRef.current,
        });
    } else {
      setHasValidationError(true);
      setValidationErrors(result.validationMessages);
    }
  };

  const generateValidationErrors = (errorMessages: string[]) => {
    return errorMessages.map((errorMessage) => (
      <Alert severity="error">{errorMessage}</Alert>
    ));
  };
  return (
    <StyledDialog open={props.open} onClose={props.handleClose}>
      {isBusy && <Spinner />}
      <DialogTitle>{props.dialogTitle}</DialogTitle>
      <DialogContent>
        <Box component={"form"}>
          <FormControl sx={{ width: "100%" }}>
            {props.dialogContentText && (
              <DialogContentText>{props.dialogContentText}</DialogContentText>
            )}
            {props.inputFields &&
              props.inputFields.map((fieldData) =>
                getUIElementFromInputFieldType(fieldData)
              )}
          </FormControl>
        </Box>
        {hasValidationError &&
          validationErrors &&
          generateValidationErrors(validationErrors)}
        {hasActionError &&
          actionErrorMessage &&
          actionErrorMessage.map((msg) => (
            <Alert severity="error">{msg}</Alert>
          ))}
      </DialogContent>
      <DialogActions>
        {props.actionButtons &&
          props.actionButtons.map((fieldData) => (
            <StyledButton
              textLabel={fieldData.label}
              onClick={handleActionButtonClicked}
              id={fieldData.id}
              buttonTextColor={fieldData.stylings?.buttonTextColor}
              buttonFillColor={fieldData.stylings?.buttonFillColor}
              key={`actionButtonField_${fieldData.id}`}
              type={fieldData.isSubmit ? "submit" : undefined}
              disabled={isBusy}
            />
          ))}
      </DialogActions>
    </StyledDialog>
  );
}

export default CustomizableDialog;
