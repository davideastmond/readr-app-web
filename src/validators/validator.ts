import { IValidationRule } from "./validators.definitions";

export const allFieldsAreValidated = (
  validatorFunction: IValidationRule[],
  inputValuesRef: { [keyof: string]: string }
): {
  success: boolean;
  validationMessages: string[];
} => {
  const errors: string[] = [];
  for (const validationInstruction of validatorFunction) {
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
};
