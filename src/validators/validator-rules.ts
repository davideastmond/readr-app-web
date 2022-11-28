import { FormFields } from "../definitions/form-fields";
import { PAGE_SIZE_NUMERIC_OPTIONS } from "../definitions/page-size-numeric-options";
import { StringHelpers } from "../utils/string-helpers";
import { IValidationRule } from "./validators.definitions";

export const LOGIN_RULES: IValidationRule[] = [
  {
    name: "validate Email",
    validationFunction: (...args: string[]) => {
      return StringHelpers.isEmailValid({ email: args[0] });
    },
    fields: ["sign-in-email"],
    validationMessage: "Enter a valid e-mail address",
  },
  {
    name: "password is present",
    validationFunction: (...args: string[]) => {
      return !!(args[0] && args[0].length > 0);
    },
    fields: ["sign-in-password"],
    validationMessage: "Enter password",
  },
];

export const REGISTRATION_RULES: IValidationRule[] = [
  {
    name: "validate Email",
    validationFunction: (...args: string[]) => {
      return StringHelpers.isEmailValid({ email: args[0] });
    },
    fields: ["register-email"],
    validationMessage: "Enter a valid e-mail address",
  },
  {
    name: "Validate password complexity",
    validationFunction: (...args: string[]) => {
      return StringHelpers.validatePasswordComplexity(args[0]);
    },
    fields: ["register-password1"],
    validationMessage:
      "Password should be at least 8 characters, contain a number, an uppercase letter and a special character",
  },
  {
    name: "validatePasswordsMatch",
    validationFunction: (...args: string[]) => {
      return args[0] === args[1];
    },
    fields: ["register-password1", "register-password2"],
    validationMessage: "Confirm that your passwords match",
  },
  {
    name: "first name is present",
    validationFunction: (...args: string[]) => {
      return !!(args[0] && args[0].length > 1);
    },
    fields: ["register-fn"],
    validationMessage: "Enter a first name",
  },
  {
    name: "last name is present",
    validationFunction: (...args: string[]) => {
      return !!(args[0] && args[0].length > 1);
    },
    fields: ["register-ln"],
    validationMessage: "Enter a last name",
  },
  {
    name: "country code is present",
    validationFunction: (...args: string[]) => {
      return !!(args[0] && args[0].length > 1);
    },
    fields: ["register-country"],
    validationMessage: "Select a supported country",
  },
];

export const UPDATE_PASSWORD_RULES: IValidationRule[] = [
  {
    name: "Validate password complexity",
    validationFunction: (...args: string[]) => {
      return StringHelpers.validatePasswordComplexity(args[0]);
    },
    fields: ["update-password1"],
    validationMessage:
      "Password should be at least 8 characters, contain a number, an uppercase letter and a special character",
  },
  {
    name: "validatePasswordsMatch",
    validationFunction: (...args: string[]) => {
      return args[0] === args[1];
    },
    fields: ["update-password1", "update-password2"],
    validationMessage: "Confirm that your passwords match",
  },
];

export const PAGESIZE_RULES: IValidationRule[] = [
  {
    name: "Headlines page size has to be within the proper range",
    validationFunction: (...args: string[]) => {
      const numericValue = parseInt(args[0]);
      if (!isNaN(numericValue)) {
        // Validate
        return PAGE_SIZE_NUMERIC_OPTIONS.includes(numericValue);
      }
      return false;
    },
    fields: [FormFields.NumberOfHeadlines],
    validationMessage: "Ensure number is in range",
  },
  {
    name: "Custom feed page size has to be within the proper range",
    validationFunction: (...args: string[]) => {
      const numericValue = parseInt(args[0]);
      if (!isNaN(numericValue)) {
        // Validate
        return PAGE_SIZE_NUMERIC_OPTIONS.includes(numericValue);
      }
      return false;
    },
    fields: [FormFields.NumberOfCustom],
    validationMessage: "Ensure number is in range",
  },
];
