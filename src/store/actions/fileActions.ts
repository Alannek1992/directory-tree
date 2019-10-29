import * as actionTypes from "./actionTypes";
import { IFileItem } from "../../shared/globalTypes";

export interface ILoadFile {
  type: typeof actionTypes.LOAD_FILE;
  id: string;
}

export interface ILoadFileSuccess {
  type: typeof actionTypes.LOAD_FILE_SUCCESS;
  file: IFileItem;
}

export interface ILoadFileFailed {
  type: typeof actionTypes.LOAD_FILE_FAILED;
  error: string;
}

export type FileActionTypes = ILoadFile | ILoadFileSuccess | ILoadFileFailed;
