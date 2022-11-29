import { IValidationRule } from "./validators.definitions";

export type ValidationResultResponse = {
  success: boolean;
  validationMessages: string[];
};

export interface IValidator {
  validate(): ValidationResultResponse;
}

export abstract class BaseValidator implements IValidator {
  protected rules: IValidationRule[];

  constructor(rules: IValidationRule[]) {
    this.rules = rules;
  }

  abstract validate(): ValidationResultResponse;
}
