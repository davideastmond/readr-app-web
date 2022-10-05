import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IArticleBookmark, ISecureUser } from "../definitions/user";
import {
  IActiveSessionResponseData,
  ILoginResponseData,
} from "../services/client/definitions/definitions";
import { SessionClient } from "../services/client/session-client";
import { UserClient } from "../services/client/user-client";
import { TokenHandler } from "../services/handlers/token-handler";

import { StateStatus, TGlobalAppStoreState } from "./state-store.definitions";

export interface IAppState {
  status: IStateMessageStatus;
  sessionUser: ISecureUser | null;
  isActiveSession: boolean;
}
export interface IStateMessageStatus {
  status: StateStatus;
  message: string | null;
}

const initialState: IAppState = {
  status: { status: StateStatus.Idle, message: null },
  sessionUser: null,
  isActiveSession: false,
};

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

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setAuthSessionUser(state, action: { payload: ILoginResponseData }) {
      state.sessionUser = action.payload.user;
      TokenHandler.setAuthToken(action.payload.token, action.payload.user._id);
    },
    setSessionUser(state, action: { payload: ISecureUser }) {
      state.sessionUser = action.payload;
    },
    setNullUserSession(state) {
      state.sessionUser = null;
      state.isActiveSession = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(isSessionActiveAsync.pending, (state) => {
        state.status.status = StateStatus.Loading;
        state.status.message = "Verifying if active session";
      })
      .addCase(isSessionActiveAsync.fulfilled, (state, action) => {
        state.isActiveSession = action.payload.active || false;
        if (action.payload.active && action.payload.user) {
          state.sessionUser = action.payload.user;
        } else {
          state.sessionUser = null;
        }
        state.status.message = null;
        state.status.status = StateStatus.Idle;
      })
      .addCase(isSessionActiveAsync.rejected, (state, action) => {
        state.isActiveSession = false;
        state.sessionUser = null;
        state.status.message = "Unable to determine active session status";
        state.status.status = StateStatus.Error;
      })
      .addCase(putBookmarkAsync.pending, (state) => {
        state.status.status = StateStatus.Loading;
        state.status.message = "Requesting add bookmark";
      })
      .addCase(putBookmarkAsync.fulfilled, (state, action) => {
        state.status.message = null;
        state.sessionUser = action.payload;
        state.status.status = StateStatus.Idle;
      })
      .addCase(putBookmarkAsync.rejected, (state, action) => {
        state.status.message = `Unable to bookmark this article: ${action.error.message}`;
        state.status.status = StateStatus.Error;
      })
      .addCase(deleteBookmarkAsync.pending, (state) => {
        state.status.status = StateStatus.Loading;
        state.status.message = "Requesting delete bookmark";
      })
      .addCase(deleteBookmarkAsync.fulfilled, (state, action) => {
        state.status.message = null;
        state.sessionUser = action.payload;
        state.status.status = StateStatus.Idle;
      })
      .addCase(deleteBookmarkAsync.rejected, (state, action) => {
        state.status.message = `Unable to delete this bookmark: ${action.error.message}`;
        state.status.status = StateStatus.Error;
      })
      .addCase(deleteAllBookmarksAsync.pending, (state) => {
        state.status.status = StateStatus.Loading;
        state.status.message = "Requesting delete all bookmarks";
      })
      .addCase(deleteAllBookmarksAsync.fulfilled, (state, action) => {
        state.status.message = null;
        state.sessionUser = action.payload;
        state.status.status = StateStatus.Idle;
      })
      .addCase(deleteAllBookmarksAsync.rejected, (state, action) => {
        state.status.message = `Unable to delete all bookmarks: ${action.error.message}`;
        state.status.status = StateStatus.Error;
      })
      .addCase(putTopicsAsync.pending, (state) => {
        state.status.status = StateStatus.Loading;
        state.status.message = "Requesting create topics";
      })
      .addCase(putTopicsAsync.fulfilled, (state, action) => {
        state.status.message = null;
        state.sessionUser = action.payload;
        state.status.status = StateStatus.Idle;
      })
      .addCase(putTopicsAsync.rejected, (state, action) => {
        state.status.message = `Unable to create topic: ${
          action.error.code === "401"
            ? "Please sign in again"
            : "We can't add new topics at this time"
        }`;
        state.status.status = StateStatus.Error;
      })
      .addCase(deleteTopicsAsync.pending, (state) => {
        state.status.status = StateStatus.Loading;
        state.status.message = "Requesting delete topics";
      })
      .addCase(deleteTopicsAsync.fulfilled, (state, action) => {
        state.status.message = null;
        state.sessionUser = action.payload;
        state.status.status = StateStatus.Idle;
      })
      .addCase(deleteTopicsAsync.rejected, (state, action) => {
        state.status.message = `Unable to delete topics: ${action.error.message}`;
        state.status.status = StateStatus.Error;
      });
  },
});

export const selectSessionUser = (
  state: TGlobalAppStoreState
): ISecureUser | null => state.app.sessionUser;
export const selectAppStatus = (
  state: TGlobalAppStoreState
): IStateMessageStatus => state.app.status;

export const selectIsSessionActive = (state: TGlobalAppStoreState): boolean =>
  state.app.isActiveSession;
export const selectUserBookmarks = (
  state: TGlobalAppStoreState
): IArticleBookmark[] | undefined =>
  state.app.sessionUser?.configuration.bookmarks;
export const selectUserTopics = (
  state: TGlobalAppStoreState
): string[] | undefined => state.app.sessionUser?.configuration?.topics;
export const selectAppStateStatus = (
  state: TGlobalAppStoreState
): { status: StateStatus; message: string | null } => state.app.status;
export const { setAuthSessionUser, setSessionUser, setNullUserSession } =
  appSlice.actions;

export default appSlice.reducer;
