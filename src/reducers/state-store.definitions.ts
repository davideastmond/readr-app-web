import { IAppState } from "./app.reducer";

export type TGlobalAppStoreState = {
  app: IAppState;
};

export enum StateStatus {
  Idle = "idle",
  Loading = "loading",
  Error = "error",
}
