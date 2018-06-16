import { ADD_ERROR, ErrorAction } from "../actions/error";

export type ErrorState = {
  errors: { stack: string; name: string; message: string; }[],
};

const initialState: ErrorState = {
  errors: [],
};

export const errors = (state: ErrorState = initialState, action: ErrorAction) => {
  switch (action.type) {
    case ADD_ERROR:
      const { stack, name, message } = action.payload;
      return { ...state, errors: [...state.errors, { stack, name, message }] };
  }
  return state;
};