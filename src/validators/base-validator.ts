import { IValidationRule } from "./validators.definitions";

export type ValidationResultResponse = {
  success: boolean;
  validationMessages: string[];
};

export interface IValidator {
  validate(
    inputValuesRef: { [keyof: string]: string | number },
    rules: IValidationRule[]
  ): ValidationResultResponse;
}

export abstract class BaseValidator implements IValidator {
  abstract validate(
    inputValuesRef: { [keyof: string]: string | number },
    rules: IValidationRule[]
  ): ValidationResultResponse;
}
