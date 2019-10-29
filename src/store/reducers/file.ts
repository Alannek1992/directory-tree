import { IFileItem } from "../../shared/globalTypes";
import { FileActionTypes, ILoadFileSuccess, ILoadFileFailed } from "../actions/fileActions";
import { updateObject } from "../../shared/utility";
import * as actionTypes from "../actions/actionTypes";

export interface IFileState {
  loadedFiles: IFileItem[];
  loading: boolean;
  error: any;
}

const initialState: IFileState = {
  loadedFiles: [],
  loading: false,
  error: null
};

const loadFile = (state: IFileState): IFileState => {
  return updateObject(state, {
    loading: true
  });
};

const loadFileSuccess = (
  state: IFileState,
  action: ILoadFileSuccess
): IFileState => {
  if (!state.loadedFiles.some(file => file.id === action.file.id)) {
    return updateObject(state, {
      loading: false,
      loadedFiles: [...state.loadedFiles, action.file]
    });
  }
  return updateObject(state);
};

const loadFileFailed = (
  state: IFileState,
  action: ILoadFileFailed
): IFileState => {
  return updateObject(state, {
    loading: false,
    error: action.error
  });
};

const fileReducer = (
  state: IFileState = initialState,
  action: FileActionTypes
): IFileState => {
  switch (action.type) {
    case actionTypes.LOAD_FILE:
      return loadFile(state);
    case actionTypes.LOAD_FILE_SUCCESS:
      return loadFileSuccess(state, action as ILoadFileSuccess);
    case actionTypes.LOAD_FILE_FAILED:
      return loadFileFailed(state, action as ILoadFileFailed);
    default:
      return state;
  }
};

export default fileReducer;
