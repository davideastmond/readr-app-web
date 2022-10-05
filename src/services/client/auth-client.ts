import { BaseClient } from "./base-client";
import {
  IRegistrationSubmissionData,
  IRegistrationUserResponse,
  ILoginData,
  ILoginResponseData,
} from "./definitions/definitions";

class AuthClient extends BaseClient {
  public async registerUser(
    data: IRegistrationSubmissionData
  ): Promise<IRegistrationUserResponse> {
    const url = "/auth/register";
    return this.postData<
      IRegistrationUserResponse,
      IRegistrationSubmissionData
    >(url, data);
  }

  public async login(data: ILoginData): Promise<ILoginResponseData> {
    const loginUrl = "/auth/login";
    return this.postData<ILoginResponseData, ILoginData>(loginUrl, data);
  }

  public async logout(): Promise<void> {
    const logoutUrl = "/auth/logout";
    await this.postData(logoutUrl);
  }
}

export { AuthClient };
