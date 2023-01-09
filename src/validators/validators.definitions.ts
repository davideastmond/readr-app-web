import { FormFields } from "../definitions/form-fields";

export interface IValidationRule {
  name: string;
  validationFunction: (...args: any[]) => boolean;
  fields: FormFields[];
  validationMessage: string;
}
