import * as actionTypes from "./actionTypes";

export interface ICreateNewAppInstance {
  type: typeof actionTypes.CREATE_NEW_APP_INSTANCE;
}

export interface IDeleteAppInstance {
  type: typeof actionTypes.DELETE_APP_INSTANCE;
  id: string;
}

export interface ISetActiveAppInstance {
  type: typeof actionTypes.SET_ACTIVE_APP_INSTANCE;
  id: string;
}

export interface IOpenFile {
  type: typeof actionTypes.OPEN_FILE;
  id: string;
}

export interface ICloseFile {
  type: typeof actionTypes.CLOSE_FILE;
  id: string;
}

export interface ISetFileActive {
  type: typeof actionTypes.SET_FILE_ACTIVE;
  id: string;
}

export interface ICacheOpenNodes {
  type: typeof actionTypes.CACHE_OPEN_NODES;
  openNodes: string[];
  prevActiveInstanceId: string;
}

export type AppInstanceActionTypes =
  | ICreateNewAppInstance
  | IDeleteAppInstance
  | ISetActiveAppInstance
  | IOpenFile
  | ICloseFile
  | ISetFileActive
  | ICacheOpenNodes;
