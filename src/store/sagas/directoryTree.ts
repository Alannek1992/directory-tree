import { put } from "redux-saga/effects";

import ApolloClientProvider from "../../graphql/ApolloClientProvider";
import * as Queries from "../../shared/queries";
import { IDirectoryItemDataStructure } from "../../shared/globalTypes";
import { adjustArray, recursiveLoadNodes } from "../../shared/utility";
import {
  initDirectorySuccess,
  initDirectoryFailed,
  loadNewNodeSuccess,
  loadNewNodeSuccessWithoutData,
  loadNewNodeFailed
} from "../actions/directoryTree";
import {
  ILoadNewNode,
  ILoadAllNewNodes
} from "../actions/directoryTreeActions";

export function* initDirectoryTreeSaga() {
  try {
    const response = yield ApolloClientProvider.client.query({
      query: Queries.INIT_DIRECTORY_TREE_QUERY
    });

    const adjustedArray: IDirectoryItemDataStructure[] = adjustArray(
      response.data.getList
    );

    yield put(initDirectorySuccess(adjustedArray));
  } catch (error) {
    yield put(initDirectoryFailed(error));
  }
}

export function* loadNewNodeSaga(action: ILoadNewNode) {
  yield console.log(action.parentId);
  try {
    const response = yield ApolloClientProvider.client.query({
      query: Queries.LOAD_NEW_NODE,
      variables: { parentId: action.parentId }
    });

    const adjustedArray: IDirectoryItemDataStructure[] = adjustArray(
      response.data.getList,
      action.parentId
    );

    if (adjustedArray.length !== 0) {
      yield put(loadNewNodeSuccess(adjustedArray));
    } else {
      yield put(loadNewNodeSuccessWithoutData(action.parentId));
    }
  } catch ({ message }) {
    yield put(loadNewNodeFailed(message));
  }
}

export function* loadAllNewNodesSaga(action: ILoadAllNewNodes) {
  try {
    const fetchedTreeStructure = yield recursiveLoadNodes(action.currentNodes);

    yield put(loadNewNodeSuccess(fetchedTreeStructure));
  } catch ({ message }) {
    yield put(loadNewNodeFailed(message));
  }
}
