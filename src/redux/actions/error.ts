export const ADD_ERROR = "error/add";

type AddError = typeof ADD_ERROR;

export type AddErrorAction = { type: AddError, payload: Error };

export type ErrorAction =
  | AddErrorAction;

export const addError = (payload: Error): ErrorAction =>
  ({ type: ADD_ERROR, payload });
