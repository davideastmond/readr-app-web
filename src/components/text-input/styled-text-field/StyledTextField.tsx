import { TextField, styled, TextFieldProps } from "@mui/material";
import React, { useState } from "react";

interface IStyledTextFieldProps {
  label: string;
  id: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  required?: boolean;
}

const CustomStyledTextField = styled(TextField)<
  TextFieldProps & IStyledTextFieldProps
>(({ theme, ...props }) => ({
  "&.MuiTextField-root": {
    marginTop: "5px",
    marginBottom: "5px",
  },
}));

function StyledTextField(props: IStyledTextFieldProps) {
  const [value, setValue] = useState<string>("");

  const handleTextInputChanged = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setValue(event.target.value);
    props.onChange(event);
  };
  return (
    <CustomStyledTextField
      id={props.id}
      variant="outlined"
      label={props.label}
      onChange={handleTextInputChanged}
      value={value}
      type={props.type || "text"}
      required={props.required}
    />
  );
}

export default StyledTextField;
