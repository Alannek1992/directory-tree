import * as actionTypes from "./actionTypes";
import { IDirectoryItemDataStructure } from "../../shared/globalTypes";

export interface IDirectoryTreeInit {
  type: typeof actionTypes.INIT_DIRECTORY_TREE;
}

export interface IDirectoryTreeInitSuccess {
  type: typeof actionTypes.INIT_DIRECTORY_TREE_SUCCESS;
  directoryData: IDirectoryItemDataStructure[];
}

export interface IDirectoryTreeInitFailed {
  type: typeof actionTypes.INIT_DIRECTORY_TREE_FAILED;
  error: string;
}

export interface ILoadNewNode {
  type: typeof actionTypes.LOAD_NEW_NODE;
  parentId: string;
}

export interface ILoadAllNewNodes {
  type: typeof actionTypes.LOAD_ALL_NEW_NODES;
  currentNodes: IDirectoryItemDataStructure[];
}

export interface ILoadNewNodeSuccess {
  type: typeof actionTypes.LOAD_NEW_NODE_SUCCESS;
  directoryData: IDirectoryItemDataStructure[];
}

export interface ILoadNewNodeFailed {
  type: typeof actionTypes.LOAD_NEW_NODE_FAILED;
  error: string;
}

export interface ILoadNewNodeSuccessWithoutData {
  type: typeof actionTypes.LOAD_NEW_NODE_SUCCESS_WITHOUT_DATA;
  id: string;
}

export type DirectoryTreeActionTypes =
  | IDirectoryTreeInit
  | IDirectoryTreeInitSuccess
  | IDirectoryTreeInitFailed
  | ILoadNewNode
  | ILoadNewNodeSuccess
  | ILoadNewNodeFailed
  | ILoadNewNodeSuccessWithoutData
  | ILoadAllNewNodes;
