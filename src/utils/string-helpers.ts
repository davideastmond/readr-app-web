import dayjs from "dayjs";
const excerpt = require("excerpt");

const StringHelpers = {
  isEmailValid: ({ email }: { email: string }): boolean => {
    const regEx =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regEx.test(email);
  },
  getFormattedDate: ({
    dateString,
    customFormat,
  }: {
    dateString: string;
    customFormat?: string;
  }): string => {
    return dayjs(dateString).format(
      customFormat ? customFormat : "MMM DD, YYYY"
    );
  },
  validateName: (name: string) => {
    const regEx = /^[a-z ,.'-]+$/i;
    return regEx.test(name);
  },
  validatePasswordComplexity: (pwd: string) => {
    const regEx = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return regEx.test(pwd);
  },
  getStringExcerpt: ({
    keyword,
    content,
    length,
  }: {
    keyword: string;
    content: string;
    length?: number;
  }): string => {
    if (!length) length = 25;
    return excerpt(content, keyword, length);
  },
};

export { StringHelpers };
