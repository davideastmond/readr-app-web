import { BaseValidator, ValidationResultResponse } from "../base-validator";
import { IValidationRule } from "../validators.definitions";

export class FormInputValidator extends BaseValidator {
  private inputValuesRef: { [keyof: string]: string | number };
  constructor(
    rules: IValidationRule[],
    inputValuesRef: { [keyof: string]: string | number }
  ) {
    super(rules);
    this.inputValuesRef = inputValuesRef;
  }

  validate(): ValidationResultResponse {
    const errors: string[] = [];
    for (const validationInstruction of this.rules) {
      const fieldsToEvaluate = validationInstruction.fields.map((field) => {
        return this.inputValuesRef[field];
      });
      if (!validationInstruction.validationFunction(...fieldsToEvaluate)) {
        errors.push(validationInstruction.validationMessage);
      }
    }
    return errors.length > 0
      ? { success: false, validationMessages: errors }
      : { success: true, validationMessages: [] };
  }
}
