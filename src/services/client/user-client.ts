import { INewsArticleAPIResponse } from "../../definitions/news-article.types";
import {
  INewsSourcePatchRequestData,
  IPageSizeData,
  ISecureUser,
  IUserEmailResponse,
} from "../../definitions/user";
import { TokenHandler } from "../handlers/token-handler";
import { BaseClient } from "./base-client";
import { IArticleBookmarkRequestData } from "./definitions/definitions";

export class UserClient extends BaseClient {
  constructor() {
    const token = TokenHandler.getToken();
    const headerKey = "x-jwt-token";
    const requestHeader = {
      [headerKey as string]: token,
    };
    super(requestHeader as any);
  }

  // This can return update user doc with articles
  public async putBookmark({
    url,
    urlToImage,
    title,
    source,
  }: IArticleBookmarkRequestData): Promise<ISecureUser> {
    const apiUrl = "/user/bookmark";
    return this.putData<ISecureUser, IArticleBookmarkRequestData>(apiUrl, {
      url,
      urlToImage,
      title,
      source,
    });
  }

  public async deleteBookmark(urls: string[]): Promise<ISecureUser> {
    const apiUrl = "/user/bookmark";
    return this.deleteData<ISecureUser, { urls: string[] }>(apiUrl, { urls });
  }

  public async putTopics(topics: string[]): Promise<ISecureUser> {
    const apiUrl = "/user/topic";
    return this.putData<ISecureUser, { topics: string[] }>(apiUrl, {
      topics: topics,
    });
  }

  public async deleteTopics(topics: string[]): Promise<ISecureUser> {
    const apiUrl = "/user/topic";
    return this.deleteData<ISecureUser, { topics: string[] }>(apiUrl, {
      topics: topics,
    });
  }

  public async getFeed(
    queryParams = "?pageSize=45"
  ): Promise<INewsArticleAPIResponse> {
    const apiUrl = "/user/feed";
    return this.getData<INewsArticleAPIResponse>(`${apiUrl}${queryParams}`);
  }

  public async deleteAllBookmarks(): Promise<ISecureUser> {
    const apiUrl = "/user/bookmark/all";
    return this.deleteData<ISecureUser, any>(apiUrl);
  }

  public async getEmailAddress(): Promise<IUserEmailResponse> {
    const apiUrl = "/user/email";
    return this.getData<IUserEmailResponse>(apiUrl);
  }

  public async putUpdatePassword(data: string): Promise<{ status: string }> {
    const apiUrl = "/user/password";
    return this.putData<{ status: string }, { password: string }>(apiUrl, {
      password: data,
    });
  }

  public async patchNewsSources(
    data: INewsSourcePatchRequestData
  ): Promise<ISecureUser> {
    const apiUrl = "/user/source";
    return this.patchData<ISecureUser, INewsSourcePatchRequestData>(
      apiUrl,
      data
    );
  }

  public async patchPageSize(data: IPageSizeData): Promise<ISecureUser> {
    const apiUrl = "/user/page_size";
    return this.patchData<ISecureUser, IPageSizeData>(apiUrl, data);
  }

  public async fetchUserHeadlines(): Promise<INewsArticleAPIResponse> {
    return this.getData<INewsArticleAPIResponse>(`/user/headlines`);
  }
}
