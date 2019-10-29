import { put } from "redux-saga/effects";

import ApolloClientProvider from "../../graphql/ApolloClientProvider";
import * as Queries from "../../shared/queries";
import { ILoadFile } from "../actions/fileActions";
import { adjustLoadedFile } from "../../shared/utility";
import { loadFileSuccess, loadFileFailed } from "../actions/file";

export function* loadFileSaga(action: ILoadFile) {
  try {
    const response = yield ApolloClientProvider.client.query({
      query: Queries.LOAD_FILE,
      variables: { fileId: action.id }
    });

    const loadedFile = adjustLoadedFile(response.data.getFile);

    yield put(loadFileSuccess(loadedFile));
  } catch ({message}) {
    yield put(loadFileFailed(message));
  }
}
