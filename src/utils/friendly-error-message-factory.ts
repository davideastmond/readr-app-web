export const createFriendlyErrorMessage = (
  inputMessage: string | null | undefined
): string => {
  if (!inputMessage) {
    return "Unspecified error. There was a problem conneting";
  }
  if (inputMessage.toLowerCase().includes("network error")) {
    return "There was a problem connecting to the server";
  }
  if (inputMessage.toLowerCase().includes("404")) {
    return "There was a problem with your credentials. Check your e-mail and password.";
  }
  return inputMessage;
};
