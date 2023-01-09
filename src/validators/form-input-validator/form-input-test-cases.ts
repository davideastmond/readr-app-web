import { FormFields } from "../../definitions/form-fields";
import {
  LOGIN_RULES,
  REGISTRATION_RULES,
  UPDATE_PASSWORD_RULES,
} from "../validator-rules";

const testCases = [
  {
    input: {
      [FormFields.SignInEmail]: "pbe@",
      [FormFields.SignInPassword]: "ValidPassword$123",
    },
    output: {
      success: false,
      validationMessages: ["Enter a valid e-mail address"],
    },
    rules: LOGIN_RULES,
  },
  {
    input: {
      [FormFields.SignInEmail]: "",
      [FormFields.SignInPassword]: "ValidPassword$123",
    },
    output: {
      success: false,
      validationMessages: ["Enter a valid e-mail address"],
    },
    rules: LOGIN_RULES,
  },
  {
    input: {
      [FormFields.SignInEmail]: "test@email.com",
      [FormFields.SignInPassword]: " ",
    },
    output: {
      success: false,
      validationMessages: ["Enter password"],
    },
    rules: LOGIN_RULES,
  },
  {
    input: {
      [FormFields.SignInEmail]: "test@email.com",
      [FormFields.SignInPassword]: "$123",
    },
    output: {
      success: true,
      validationMessages: [],
    },
    rules: LOGIN_RULES,
  },
  {
    input: {
      [FormFields.RegisterEmail]: "",
      [FormFields.RegisterFirstName]: "",
      [FormFields.RegisterLastName]: "",
      [FormFields.RegisterCountry]: "",
      [FormFields.RegisterPlainTextPassword1]: "",
      [FormFields.RegisterPlainTextPassword2]: "",
    },
    output: {
      success: false,
      validationMessages: [
        "Enter a valid e-mail address",
        "Password should be at least 8 characters, contain a number, an uppercase letter and a special character",
        "Enter a first name",
        "Enter a last name",
        "Select a supported country",
      ],
    },
    rules: REGISTRATION_RULES,
  },
  {
    input: {
      [FormFields.RegisterEmail]: "j @er.com",
      [FormFields.RegisterFirstName]: "Test",
      [FormFields.RegisterLastName]: "User",
      [FormFields.RegisterCountry]: "Canada",
      [FormFields.RegisterPlainTextPassword1]: "password",
      [FormFields.RegisterPlainTextPassword2]: "p",
    },
    output: {
      success: false,
      validationMessages: [
        "Enter a valid e-mail address",
        "Password should be at least 8 characters, contain a number, an uppercase letter and a special character",
        "Confirm that your passwords match",
      ],
    },
    rules: REGISTRATION_RULES,
  },
  {
    input: {
      [FormFields.RegisterEmail]: "j @er.com",
      [FormFields.RegisterFirstName]: "Test",
      [FormFields.RegisterLastName]: "User",
      [FormFields.RegisterCountry]: "Canada",
      [FormFields.RegisterPlainTextPassword1]: "password",
      [FormFields.RegisterPlainTextPassword2]: "password",
    },
    output: {
      success: false,
      validationMessages: [
        "Enter a valid e-mail address",
        "Password should be at least 8 characters, contain a number, an uppercase letter and a special character",
      ],
    },
    rules: REGISTRATION_RULES,
  },
  {
    input: {
      [FormFields.RegisterEmail]: "testUser@er.com",
      [FormFields.RegisterFirstName]: "Test",
      [FormFields.RegisterLastName]: "User",
      [FormFields.RegisterCountry]: "Canada",
      [FormFields.RegisterPlainTextPassword1]: "PmJkl83$",
      [FormFields.RegisterPlainTextPassword2]: "PmJkl83$",
    },
    output: {
      success: true,
      validationMessages: [],
    },
    rules: REGISTRATION_RULES,
  },
  {
    input: {
      [FormFields.UpdatePassword1]: "PmJkl83$",
      [FormFields.UpdatePassword2]: "PmJkl83$",
    },
    output: {
      success: true,
      validationMessages: [],
    },
    rules: UPDATE_PASSWORD_RULES,
  },
  {
    input: {
      [FormFields.UpdatePassword1]: "PmJkl83$",
      [FormFields.UpdatePassword2]: "PmJkl83$d",
    },
    output: {
      success: false,
      validationMessages: ["Confirm that your passwords match"],
    },
    rules: UPDATE_PASSWORD_RULES,
  },
  {
    input: {
      [FormFields.UpdatePassword1]: "PmJkl83",
      [FormFields.UpdatePassword2]: "PmJkl83",
    },
    output: {
      success: false,
      validationMessages: [
        "Password should be at least 8 characters, contain a number, an uppercase letter and a special character",
      ],
    },
    rules: UPDATE_PASSWORD_RULES,
  },
];

export default testCases;
