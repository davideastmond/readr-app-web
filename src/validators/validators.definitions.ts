export interface IValidationRule {
  name: string;
  validationFunction: (...args: string[]) => boolean;
  fields: string[];
  validationMessage: string;
}
