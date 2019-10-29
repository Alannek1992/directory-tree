import { IDirectoryTreeState } from "../store/reducers/directoryTree";
import { IFileState } from "../store/reducers/file";
import { IAppInstanceState } from "../store/reducers/appInstance";
import { IErrorState } from "../store/reducers/error";

export interface IApplicationState {
  directoryTree: IDirectoryTreeState;
  file: IFileState;
  appInstance: IAppInstanceState;
  error: IErrorState;
}

export interface IDirectoryItemDataStructure {
  label: string;
  parentid: string;
  type: TreeItemType;
  key: string;
  id: string;
}

export interface IAppInstanceDataStructure {
  id: string;
  openFiles: IOpenFileItem[];
  openNodes: string[];
  activeFile: string;
}

export interface IAppInstanceForToolbarDataStructure {
  id: string;
  active: boolean;
}

export interface IFileItem {
  id: string;
  name: string;
  text: string;
}

export interface IFileItemToDisplay {
  id: string;
  name: string;
  text: string;
  active: boolean;
}

export interface IOpenFileItem {
  id: string;
}

export interface IListItem {
    id: string;
    name: string;
    type: string;
}

export enum TreeItemType {
  FOLDER = "FOLDER",
  EMPTY_FOLDER = "EMPTY_FOLDER",
  FILE = "FILE"
}

export enum NavigationItemType {
  APP_INSTANCE = "APP_INSTANCE",
  FILE_INSTANCE = "FILE_INSTANCE"
}

export enum SlideDirection {
  LEFT = "LEFT",
  RIGHT = "RIGHT"
}