import { createSlice } from "@reduxjs/toolkit";
import { IArticleBookmark, ISecureUser } from "../../definitions/user";
import { ILoginResponseData } from "../../services/client/definitions/definitions";

import { TokenHandler } from "../../services/handlers/token-handler";

import { StateStatus, TGlobalAppStoreState } from "../state-store.definitions";
import {
  isSessionActiveAsync,
  putBookmarkAsync,
  deleteBookmarkAsync,
  deleteAllBookmarksAsync,
  putTopicsAsync,
  deleteTopicsAsync,
  patchNewsSourcesAsync,
} from "./thunks/app.thunks";

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
    setClearStatusMessage(state) {
      state.status.message = "";
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
      })
      .addCase(patchNewsSourcesAsync.pending, (state) => {
        state.status.status = StateStatus.Loading;
        state.status.message = "Requesting patch news sources...";
      })
      .addCase(patchNewsSourcesAsync.fulfilled, (state, action) => {
        state.status.message = null;
        state.sessionUser = action.payload;
        state.status.status = StateStatus.Idle;
        state.status.message = SUCCESS_UPDATE_MESSAGE;
      })
      .addCase(patchNewsSourcesAsync.rejected, (state, action) => {
        state.status.message = `Unable to patch news sources: ${action.error.message}`;
        state.status.status = StateStatus.Error;
      });
  },
});

export const SUCCESS_UPDATE_MESSAGE = "Update complete";

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
export const {
  setAuthSessionUser,
  setSessionUser,
  setNullUserSession,
  setClearStatusMessage,
} = appSlice.actions;

export default appSlice.reducer;
