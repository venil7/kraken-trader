export const EMPTY = "EMPTY";
export const SUCCESS = "SUCCESS";
export const ERROR = "ERROR";
export const LOADING = "LOADING";

export type LoadingState =
  typeof EMPTY
  | typeof SUCCESS
  | typeof ERROR
  | typeof LOADING;

export type Loadable = {
  loading: LoadingState
};

export const isLoading = (...states: LoadingState[]) =>
  states.some(s => s === LOADING);
