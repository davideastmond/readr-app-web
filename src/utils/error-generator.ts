function generateErrors(err: any): string[] {
  if (
    err.response &&
    err.response.data &&
    err.response.data.errors &&
    err.response.data.errors.length &&
    err.response.data.errors.length > 0
  ) {
    return err.response.data.errors.map((error: any) => {
      return error.msg;
    });
  }
  return ["Unspecified error"];
}

export { generateErrors };
