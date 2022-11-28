export interface IValidationRule {
  name: string;
  validationFunction: (...args: any[]) => boolean;
  fields: string[];
  validationMessage: string;
}
