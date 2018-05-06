export const EMPTY = "EMPTY";
export const SUCCESS = "SUCCESS";
export const ERROR = "ERROR";
export const LOADING = "LOADING";

// export const loading = {
//   EMPTY,
//   SUCCESS,
//   ERROR,
//   LOADING
// };

export type LoadingState =
  typeof EMPTY
  | typeof SUCCESS
  | typeof ERROR
  | typeof LOADING;
