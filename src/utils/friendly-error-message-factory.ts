export const createFriendlyErrorMessage = (inputMessage: string): string => {
  if (inputMessage.toLowerCase().includes("network error")) {
    return "There was a problem connecting to the server";
  }
  return inputMessage;
};
