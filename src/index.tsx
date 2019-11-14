import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import { Provider } from "react-redux";
import createSagaMiddleware from "redux-saga";

import App from "./App";
import directoryTreeReducer from "./store/reducers/directoryTree";
import fileReducer from "./store/reducers/file";
import appInstanceReducer from "./store/reducers/appInstance";
import { watchDirectoryTree, watchFile } from "./store/sagas/index";
import { IApplicationState } from "./shared/globalTypes";
import { errorReducer } from "./store/reducers/error";

const composeEnhancers =
  (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const rootReducer = combineReducers<IApplicationState>({
  directoryTree: directoryTreeReducer,
  file: fileReducer,
  appInstance: appInstanceReducer,
  error: errorReducer
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(watchDirectoryTree);
sagaMiddleware.run(watchFile);

const app = (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));
