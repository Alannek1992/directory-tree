import {
  IDirectoryItemDataStructure,
  TreeItemType
} from "../../shared/globalTypes";
import {
  DirectoryTreeActionTypes,
  IDirectoryTreeInitSuccess,
  IDirectoryTreeInitFailed,
  ILoadNewNodeSuccess,
  ILoadNewNodeFailed,
  ILoadNewNodeSuccessWithoutData
} from "../actions/directoryTreeActions";
import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

export interface IDirectoryTreeState {
  treeStructure: IDirectoryItemDataStructure[];
  loading: boolean;
  error: any;
}

const initialState: IDirectoryTreeState = {
  treeStructure: [],
  loading: false,
  error: null
};

const initDirectoryTree = (state: IDirectoryTreeState): IDirectoryTreeState => {
  return updateObject(state, {
    loading: true
  });
};

const initDirectoryTreeSuccess = (
  state: IDirectoryTreeState,
  action: IDirectoryTreeInitSuccess
): IDirectoryTreeState => {
  return updateObject(state, {
    loading: false,
    treeStructure: [...action.directoryData]
  });
};

const initDirectoryTreeFailed = (
  state: IDirectoryTreeState,
  action: IDirectoryTreeInitFailed
): IDirectoryTreeState => {
  return updateObject(state, {
    loading: false,
    error: action.error
  });
};

const loadNewNode = (state: IDirectoryTreeState): IDirectoryTreeState => {
  return updateObject(state, {
    loading: true
  });
};

const loadAllNewNodes = (state: IDirectoryTreeState): IDirectoryTreeState => {
  return updateObject(state, {
    loading: true
  });
};

const loadNewNodeSucces = (
  state: IDirectoryTreeState,
  action: ILoadNewNodeSuccess
): IDirectoryTreeState => {
  return updateObject(state, {
    loading: false,
    treeStructure: state.treeStructure.concat(action.directoryData)
  });
};

const loadNewNodeFailed = (
  state: IDirectoryTreeState,
  action: ILoadNewNodeFailed
): IDirectoryTreeState => {
  return updateObject(state, {
    loading: false,
    error: action.error
  });
};

const loadNewNodeSuccessWithoutData = (
  state: IDirectoryTreeState,
  action: ILoadNewNodeSuccessWithoutData
): IDirectoryTreeState => {
  const updatedTreeStructure = state.treeStructure.map(element => {
    if (element.id === action.id) {
      element = { ...element, type: TreeItemType.EMPTY_FOLDER };
    }
    return element;
  });
  return updateObject(state, {
    treeStructure: updatedTreeStructure
  });
};

const directoryTreeReducer = (
  state: IDirectoryTreeState = initialState,
  action: DirectoryTreeActionTypes
): IDirectoryTreeState => {
  switch (action.type) {
    case actionTypes.INIT_DIRECTORY_TREE:
      return initDirectoryTree(state);
    case actionTypes.INIT_DIRECTORY_TREE_SUCCESS:
      return initDirectoryTreeSuccess(
        state,
        action as IDirectoryTreeInitSuccess
      );
    case actionTypes.INIT_DIRECTORY_TREE_FAILED:
      return initDirectoryTreeFailed(state, action as IDirectoryTreeInitFailed);
    case actionTypes.LOAD_NEW_NODE:
      return loadNewNode(state);
    case actionTypes.LOAD_ALL_NEW_NODES:
      return loadAllNewNodes(state);
    case actionTypes.LOAD_NEW_NODE_SUCCESS:
      return loadNewNodeSucces(state, action as ILoadNewNodeSuccess);
    case actionTypes.LOAD_NEW_NODE_FAILED:
      return loadNewNodeFailed(state, action as ILoadNewNodeFailed);
    case actionTypes.LOAD_NEW_NODE_SUCCESS_WITHOUT_DATA:
      return loadNewNodeSuccessWithoutData(
        state,
        action as ILoadNewNodeSuccessWithoutData
      );
    default:
      return state;
  }
};

export default directoryTreeReducer;
