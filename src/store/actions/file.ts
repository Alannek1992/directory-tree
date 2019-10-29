import * as actionTypes from "./actionTypes";
import { ILoadFile, ILoadFileSuccess, ILoadFileFailed } from "./fileActions";
import { IFileItem } from "../../shared/globalTypes";

export const loadFile = (id: string): ILoadFile => {
  return {
    type: actionTypes.LOAD_FILE,
    id: id
  };
};

export const loadFileSuccess = (file: IFileItem): ILoadFileSuccess => {
  return {
    type: actionTypes.LOAD_FILE_SUCCESS,
    file: file
  };
};

export const loadFileFailed = (error: any): ILoadFileFailed => {
  return {
    type: actionTypes.LOAD_FILE_FAILED,
    error: error
  };
};
