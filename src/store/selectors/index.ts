import { createSelector } from "reselect";

import {
  IAppInstanceForToolbarDataStructure,
  IApplicationState,
  IFileItem
} from "../../shared/globalTypes";
import { IAppInstanceState } from "../reducers/appInstance";

const getAppInstances = ({ appInstances }: IAppInstanceState) => appInstances;

const getActiveInstance = ({ activeInstanceId }: IAppInstanceState) =>
  activeInstanceId;

const getFileById = ({ file }: IApplicationState, id: string) =>
  file.loadedFiles.filter(file => file.id === id);

const getOpenedFiles = ({ appInstance }: IApplicationState) => {
  const activeInstance = appInstance.appInstances.find(
    appInstanceSearch => appInstanceSearch.id === appInstance.activeInstanceId
  );

  return activeInstance ? activeInstance.openFiles : [];
};

const getDownloadedFiles = ({ file }: IApplicationState) => file.loadedFiles;

const getActiveFile = ({
  appInstances,
  activeInstanceId
}: IAppInstanceState) => {
  const activeInstance = appInstances.find(
    appInstance => appInstance.id === activeInstanceId
  );

  return activeInstance ? activeInstance.activeFile : "";
};

export const getActiveAppInstance = createSelector(
  [getAppInstances, getActiveInstance],
  (appInstances, activeInstance) => {
    const appInstance = appInstances.find(
      appInstance => appInstance.id === activeInstance
    );

    return appInstance ? appInstance : null;
  }
);

export const getAllAppInstances = createSelector(
  [getAppInstances, getActiveInstance],
  (appInstances, activeInstance) => {
    return appInstances.map(
      (appInstance): IAppInstanceForToolbarDataStructure => {
        return {
          id: appInstance.id,
          active: appInstance.id === activeInstance
        };
      }
    );
  }
);

export const displayPopUpDrawer = createSelector(
  [getAppInstances],
  appInstances => {
    return appInstances.length === 0;
  }
);

export const getOpenFilesForCurrentInstance = createSelector(
  [getOpenedFiles, getDownloadedFiles],
  (openedFiles, downloadedFiles) => {
    const openedFilesToDisplay: IFileItem[] = [];
    openedFiles.forEach(openedFile => {
      const file = downloadedFiles.find(
        downloadedFile => openedFile.id === downloadedFile.id
      );
      if (file) {
        openedFilesToDisplay.push(file);
      }
    });

    return openedFilesToDisplay;
  }
);

export const getActiveFileForCurrentInstance = createSelector(
  [getActiveFile],
  activeFile => activeFile
);

export const isFileDownloaded = createSelector(
  [getFileById],
  file => {
    return file.length > 0;
  }
);

export const isFileOpened = createSelector(
  [getFileById, getOpenedFiles],
  (file, openedFiles) => {
    const [first] = file;
    if (file.length > 0) {
      return (
        openedFiles.filter(openedFile => openedFile.id === first.id).length > 0
      );
    }
    return false;
  }
);
