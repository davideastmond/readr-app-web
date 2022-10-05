import { TokenHandler } from "../handlers/token-handler";
import { BaseClient } from "./base-client";
import { IActiveSessionResponseData } from "./definitions/definitions";

export class SessionClient extends BaseClient {
  constructor() {
    const token = TokenHandler.getToken();
    const headerKey = "x-jwt-token";
    const requestHeader = {
      [headerKey as string]: token,
    };
    super(requestHeader as any);
  }

  public async isActive(): Promise<IActiveSessionResponseData> {
    const url = "/auth/session";
    return this.getData<IActiveSessionResponseData>(url);
  }

  public async logOut(): Promise<void> {
    const url = "/auth/logout";
    await this.postData(url);
  }
}
