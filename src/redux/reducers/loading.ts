
export enum LoadingState {
  Empty = "EMPTY",
  Success = "SUCCESS",
  Error = "ERROR",
  Loading = "LOADING",
}

export type Loadable = {
  loading: LoadingState
};

export const isLoading = (...states: LoadingState[]) =>
  states.some(s => s === LoadingState.Loading);
