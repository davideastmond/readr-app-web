import { ISecureUser } from "../../../definitions/user";

export interface IRegistrationSubmissionData {
  firstName: string;
  lastName: string;
  email: string;
  plainTextPassword: string;
  countryCode: string;
}

export interface IRegistrationUserResponse {
  status: string;
}

export interface ILoginData {
  email: string;
  plainTextPassword: string;
}

export interface ILoginResponseData {
  action: string;
  token: string;
  user: ISecureUser;
}

export interface IArticleBookmarkRequestData {
  url: string;
  urlToImage: string;
  title: string;
  source: { name: string; id: string };
}

export interface IActiveSessionResponseData {
  active: boolean;
  user: ISecureUser;
}
