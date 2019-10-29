import * as actionTypes from "./actionTypes";
import { IDirectoryItemDataStructure } from "../../shared/globalTypes";
import {
  IDirectoryTreeInitSuccess,
  IDirectoryTreeInit,
  ILoadAllNewNodes,
  ILoadNewNodeSuccess,
  ILoadNewNodeFailed,
  ILoadNewNodeSuccessWithoutData,
  IDirectoryTreeInitFailed,
  ILoadNewNode
} from "./directoryTreeActions";

export const initDirectoryTree = (): IDirectoryTreeInit => {
  return {
    type: actionTypes.INIT_DIRECTORY_TREE
  };
};

export const initDirectorySuccess = (
  directoryData: IDirectoryItemDataStructure[]
): IDirectoryTreeInitSuccess => {
  return {
    type: actionTypes.INIT_DIRECTORY_TREE_SUCCESS,
    directoryData: directoryData
  };
};

export const initDirectoryFailed = (error: any): IDirectoryTreeInitFailed => {
  return {
    type: actionTypes.INIT_DIRECTORY_TREE_FAILED,
    error: error
  };
};

export const loadNewNode = (parentId: string): ILoadNewNode => {
  return {
    type: actionTypes.LOAD_NEW_NODE,
    parentId: parentId
  };
};

export const loadAllNewNodes = (
  currentNodes: IDirectoryItemDataStructure[]
): ILoadAllNewNodes => {
  return {
    type: actionTypes.LOAD_ALL_NEW_NODES,
    currentNodes: currentNodes
  };
};

export const loadNewNodeSuccess = (
  directoryData: IDirectoryItemDataStructure[]
): ILoadNewNodeSuccess => {
  return {
    type: actionTypes.LOAD_NEW_NODE_SUCCESS,
    directoryData: directoryData
  };
};

export const loadNewNodeFailed = (error: any): ILoadNewNodeFailed => {
  return {
    type: actionTypes.LOAD_NEW_NODE_FAILED,
    error: error
  };
};

export const loadNewNodeSuccessWithoutData = (
  id: string
): ILoadNewNodeSuccessWithoutData => {
  return {
    type: actionTypes.LOAD_NEW_NODE_SUCCESS_WITHOUT_DATA,
    id: id
  };
};
