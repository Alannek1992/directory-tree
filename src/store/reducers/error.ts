import { FailedActionsTypes } from "../actions/globalActionTypes";
import { RESET_ERROR_MESSAGE } from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

export interface IErrorState {
  errorMessage: string | null;
}

const initialState: IErrorState = {
  errorMessage: null
};

export const errorReducer = (
  state: IErrorState = initialState,
  { type, error }: FailedActionsTypes
): IErrorState => {
  if (type === RESET_ERROR_MESSAGE) {
    return updateObject(state, {
      errorMessage: null
    });
  } else if (error) {
    return updateObject(state, {
      errorMessage: error
    });
  }
  return state;
};
