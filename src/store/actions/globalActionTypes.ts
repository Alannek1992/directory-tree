import { FileActionTypes, ILoadFileFailed } from "./fileActions";
import {
  DirectoryTreeActionTypes,
  IDirectoryTreeInitFailed,
  ILoadNewNodeFailed
} from "./directoryTreeActions";
import { AppInstanceActionTypes } from "./appInstanceActions";

export type GlobalActionTypes =
  | FileActionTypes
  | DirectoryTreeActionTypes
  | AppInstanceActionTypes;

export type FailedActionsTypes =
  | ILoadFileFailed
  | IDirectoryTreeInitFailed
  | ILoadNewNodeFailed;
