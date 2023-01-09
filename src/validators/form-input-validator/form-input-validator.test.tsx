import TEST_CASES from "./form-input-test-cases";
import { FormInputValidator } from "./form-input-validator";
const formValidator = new FormInputValidator();

describe("FormInputValidator tests", () => {
  test("function interprets validation rules and renders appropriate output", () => {
    TEST_CASES.forEach((el) => {
      const res = formValidator.validate(el.input as any, el.rules);
      expect(res).toEqual(el.output);
    });
  });
});
