import { RESET_ERROR_MESSAGE } from "./actionTypes";
import { IResetErrorMessage } from "./errorActions";

export const resetErrorMessage = (): IResetErrorMessage => {
  return {
    type: RESET_ERROR_MESSAGE
  };
};
