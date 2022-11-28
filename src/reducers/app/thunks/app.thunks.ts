import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  ISecureUser,
  INewsSourcePatchRequestData,
  IPageSizeData,
} from "../../../definitions/user";
import { IActiveSessionResponseData } from "../../../services/client/definitions/definitions";
import { SessionClient } from "../../../services/client/session-client";
import { UserClient } from "../../../services/client/user-client";
export const isSessionActiveAsync = createAsyncThunk(
  "app/getIsSessionActiveAsync",
  async (): Promise<IActiveSessionResponseData> => {
    const sessionClient = new SessionClient();
    return sessionClient.isActive();
  }
);

export const putBookmarkAsync = createAsyncThunk(
  "app/putBookmarkAsync",
  async ({
    url,
    urlToImage,
    title,
    source,
  }: {
    url: string;
    urlToImage: string;
    title: string;
    source: { name: string; id: string };
  }): Promise<ISecureUser> => {
    const userClient = new UserClient();
    return userClient.putBookmark({ url, urlToImage, title, source });
  }
);

export const deleteBookmarkAsync = createAsyncThunk(
  "app/deleteBookmarkAsync",
  async (url: string[]): Promise<ISecureUser> => {
    const userClient = new UserClient();
    return userClient.deleteBookmark(url);
  }
);

export const deleteAllBookmarksAsync = createAsyncThunk(
  "app/deleteAllBookmarks",
  async (): Promise<ISecureUser> => {
    const userClient = new UserClient();
    return userClient.deleteAllBookmarks();
  }
);

export const putTopicsAsync = createAsyncThunk(
  "app/putTopicAsync",
  async (topics: string[]): Promise<ISecureUser> => {
    const userClient = new UserClient();
    return userClient.putTopics(topics);
  }
);

export const deleteTopicsAsync = createAsyncThunk(
  "app/deleteTopicsAsync",
  async (topics: string[]): Promise<ISecureUser> => {
    const userClient = new UserClient();
    return userClient.deleteTopics(topics);
  }
);

export const patchNewsSourcesAsync = createAsyncThunk(
  "app/patchNewsSource",
  async (data: INewsSourcePatchRequestData): Promise<ISecureUser> => {
    const userClient = new UserClient();
    return userClient.patchNewsSources(data);
  }
);

export const patchPageSize = createAsyncThunk(
  "app/patchPageSize",
  async (data: IPageSizeData): Promise<ISecureUser> => {
    const userClient = new UserClient();
    return userClient.patchPageSize(data);
  }
);
