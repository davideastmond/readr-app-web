import { FormFields } from "../../definitions/form-fields";
import { BaseValidator, ValidationResultResponse } from "../base-validator";
import { IValidationRule } from "../validators.definitions";

export class FormInputValidator extends BaseValidator {
  validate(
    inputValuesRef: { [keyof: FormFields | string]: string | number },
    rules: IValidationRule[]
  ): ValidationResultResponse {
    const errors: string[] = [];
    for (const validationInstruction of rules) {
      const fieldsToEvaluate = validationInstruction.fields.map((field) => {
        return inputValuesRef[field];
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
