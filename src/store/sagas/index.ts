import { takeEvery, all } from "redux-saga/effects";

import * as actionTypes from "../actions/actionTypes";
import {
  initDirectoryTreeSaga,
  loadNewNodeSaga,
  loadAllNewNodesSaga
} from "./directoryTree";
import { loadFileSaga } from "./file";

export function* watchDirectoryTree() {
  yield all([
    takeEvery(actionTypes.INIT_DIRECTORY_TREE, initDirectoryTreeSaga),
    takeEvery(actionTypes.LOAD_NEW_NODE, loadNewNodeSaga),
    takeEvery(actionTypes.LOAD_ALL_NEW_NODES, loadAllNewNodesSaga)
  ]);
}

export function* watchFile() {
  yield all([takeEvery(actionTypes.LOAD_FILE, loadFileSaga)]);
}
