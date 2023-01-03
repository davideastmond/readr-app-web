import { StringHelpers } from "../../utils/string-helpers";

export const VALIDATION_FUNCTIONS_INPUT_TEST_CASES = [
  (...args: string[]) => {
    return StringHelpers.isEmailValid({ email: args[0] });
  },
];
