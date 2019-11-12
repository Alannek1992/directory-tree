import {
  IAppInstanceDataStructure,
  IOpenFileItem
} from "../../shared/globalTypes";
import {
  AppInstanceActionTypes,
  IDeleteAppInstance,
  ISetActiveAppInstance,
  IOpenFile,
  ICloseFile,
  ISetFileActive,
  ICacheOpenNodes,
  IChangeNameAppInstance
} from "../actions/appInstanceActions";
import {
  updateObject,
  getActiveAppInstance,
  generateNewAppInstance
} from "../../shared/utility";
import * as actionTypes from "../actions/actionTypes";

export interface IAppInstanceState {
  appInstances: IAppInstanceDataStructure[];
  activeInstanceId: string;
  loading: boolean;
  error: any;
}

const initialState: IAppInstanceState = {
  appInstances: [],
  activeInstanceId: "",
  loading: false,
  error: null
};

const cacheOpenNodes = (
  state: IAppInstanceState,
  action: ICacheOpenNodes
): IAppInstanceState => {
  const prevAppInstance = getActiveAppInstance(
    state.appInstances,
    action.prevActiveInstanceId
  );

  if (prevAppInstance) {
    prevAppInstance.openNodes = [...action.openNodes];
  }

  return updateObject(state);
};

const createNewAppInstance = (state: IAppInstanceState): IAppInstanceState => {
  const newAppInstance = generateNewAppInstance();

  const updatedAppInstances = state.appInstances.concat(newAppInstance);

  const newActiveAppInstance = newAppInstance.id;

  return updateObject(state, {
    appInstances: updatedAppInstances,
    activeInstanceId: newActiveAppInstance
  });
};

const deleteAppInstance = (
  state: IAppInstanceState,
  action: IDeleteAppInstance
): IAppInstanceState => {
  const filteredAppInstances = state.appInstances.filter(
    appInstance => appInstance.id !== action.id
  );

  return updateObject(state, {
    appInstances: filteredAppInstances,
    activeInstanceId:
      state.activeInstanceId === action.id
        ? filteredAppInstances.length > 0
          ? filteredAppInstances[filteredAppInstances.length - 1].id
          : ""
        : state.activeInstanceId
  });
};

const changeNameAppInstance = (
  state: IAppInstanceState,
  action: IChangeNameAppInstance
): IAppInstanceState => {
  //implementation is pretty bad. Need to find a way to not re-render almost everything ..
  const appInstances = state.appInstances.map(appInst => {
    if (appInst.id === action.id) {
      return updateObject(appInst, {
        name: action.name
      });
    } else {
      return appInst;
    }
  });

  return updateObject(state, { appInstances: appInstances });
};

const setActiveAppInstance = (
  state: IAppInstanceState,
  action: ISetActiveAppInstance
): IAppInstanceState => {
  return updateObject(state, {
    activeInstanceId: action.id
  });
};

const openFile = (
  state: IAppInstanceState,
  action: IOpenFile
): IAppInstanceState => {
  const activeAppInstance = getActiveAppInstance(
    state.appInstances,
    state.activeInstanceId
  );

  if (activeAppInstance) {
    activeAppInstance.openFiles = activeAppInstance.openFiles.some(
      (file: IOpenFileItem) => file.id === action.id
    )
      ? activeAppInstance.openFiles
      : [...activeAppInstance.openFiles, { id: action.id }];

    activeAppInstance.activeFile = action.id;
  }

  return updateObject(state);
};

const closeFile = (
  state: IAppInstanceState,
  action: ICloseFile
): IAppInstanceState => {
  const activeAppInstance = getActiveAppInstance(
    state.appInstances,
    state.activeInstanceId
  );

  if (activeAppInstance) {
    activeAppInstance.openFiles = activeAppInstance.openFiles.filter(
      (openFile: IOpenFileItem) => openFile.id !== action.id
    );

    if (activeAppInstance.openFiles.length > 0) {
      activeAppInstance.activeFile =
        activeAppInstance.openFiles[activeAppInstance.openFiles.length - 1].id;
    } else {
      activeAppInstance.activeFile = "";
    }
  }

  return updateObject(state);
};

const setFileActive = (
  state: IAppInstanceState,
  action: ISetFileActive
): IAppInstanceState => {
  const activeAppInstance = getActiveAppInstance(
    state.appInstances,
    state.activeInstanceId
  );

  if (activeAppInstance) {
    activeAppInstance.activeFile = action.id;
  }

  return updateObject(state);
};

const appInstanceReducer = (
  state: IAppInstanceState = initialState,
  action: AppInstanceActionTypes
): IAppInstanceState => {
  switch (action.type) {
    case actionTypes.CREATE_NEW_APP_INSTANCE:
      return createNewAppInstance(state);
    case actionTypes.DELETE_APP_INSTANCE:
      return deleteAppInstance(state, action as IDeleteAppInstance);
    case actionTypes.CHANGE_NAME_APP_INSTANCE:
      return changeNameAppInstance(state, action as IChangeNameAppInstance);
    case actionTypes.SET_ACTIVE_APP_INSTANCE:
      return setActiveAppInstance(state, action as ISetActiveAppInstance);
    case actionTypes.OPEN_FILE:
      return openFile(state, action as IOpenFile);
    case actionTypes.CLOSE_FILE:
      return closeFile(state, action as ICloseFile);
    case actionTypes.SET_FILE_ACTIVE:
      return setFileActive(state, action as ISetFileActive);
    case actionTypes.CACHE_OPEN_NODES:
      return cacheOpenNodes(state, action as ICacheOpenNodes);
    default:
      return state;
  }
};

export default appInstanceReducer;
