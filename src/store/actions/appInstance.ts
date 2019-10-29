import * as actionTypes from "./actionTypes";
import {
  ICreateNewAppInstance,
  IDeleteAppInstance,
  ISetActiveAppInstance,
  IOpenFile,
  ICloseFile,
  ISetFileActive,
  ICacheOpenNodes
} from "./appInstanceActions";

export const createNewAppInstance = (): ICreateNewAppInstance => {
  return {
    type: actionTypes.CREATE_NEW_APP_INSTANCE
  };
};

export const deleteAppInstance = (id: string): IDeleteAppInstance => {
  return {
    type: actionTypes.DELETE_APP_INSTANCE,
    id: id
  };
};

export const setActiveAppInstance = (id: string): ISetActiveAppInstance => {
  return {
    type: actionTypes.SET_ACTIVE_APP_INSTANCE,
    id: id
  };
};

export const openFile = (id: string): IOpenFile => {
  return {
    type: actionTypes.OPEN_FILE,
    id: id
  };
};

export const closeFile = (id: string): ICloseFile => {
  return {
    type: actionTypes.CLOSE_FILE,
    id: id
  };
};

export const setFileActive = (id: string): ISetFileActive => {
  return {
    type: actionTypes.SET_FILE_ACTIVE,
    id: id
  };
};

export const cacheOpenNodes = (
  openNodes: string[],
  prevActiveInstanceId: string
): ICacheOpenNodes => {
  return {
    type: actionTypes.CACHE_OPEN_NODES,
    openNodes: openNodes,
    prevActiveInstanceId: prevActiveInstanceId
  };
};
