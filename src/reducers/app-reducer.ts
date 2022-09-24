import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ISecureUser } from "../definitions/user";
import { ILoginResponseData } from "../services/client/definitions/definitions";
import { TokenHandler } from "../services/handlers/token-handler";

import { StateStatus, TGlobalAppStoreState } from "./state-store.definitions";

export interface IAppState {
  status: StateStatus;
  sessionUser: ISecureUser | null;
}

const initialState: IAppState = {
  status: StateStatus.Idle,
  sessionUser: null,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setSessionUser(state, action: { payload: ILoginResponseData }) {
      state.sessionUser = action.payload.user;
      TokenHandler.setLoginToken(action.payload.token, action.payload.user._id);
    },
  },
});

export const selectSessionUser = (
  state: TGlobalAppStoreState
): ISecureUser | null => state.app.sessionUser;
export const selectAppStatus = (state: TGlobalAppStoreState): StateStatus =>
  state.app.status;
export const { setSessionUser } = appSlice.actions;

export default appSlice.reducer;
