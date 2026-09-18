import {
  legacy_createStore as createStore,
  applyMiddleware,
  combineReducers,
} from "redux";

import { thunk } from "redux-thunk";

import movieReducer from "./reducers/movieReducer";
import libraryReducer from "./reducers/libraryReducer";
import authReducer from "./reducers/authReducer";

const rootReducer = combineReducers({
  movies: movieReducer,
  library: libraryReducer,
  auth: authReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
