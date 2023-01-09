export const createFriendlyErrorMessage = (
  inputMessage: string | null | undefined
): string => {
  if (!inputMessage) {
    return "Unspecified error. There was a problem connecting";
  }
  if (inputMessage.toLowerCase().includes("network error")) {
    return "There was a problem connecting to the server. Server may not be available.";
  }
  if (inputMessage.toLowerCase().includes("404")) {
    return "There was a problem with your credentials. Check your e-mail and password.";
  }
  return inputMessage;
};
