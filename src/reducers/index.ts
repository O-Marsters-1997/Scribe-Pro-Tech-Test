import { applyMiddleware, createStore, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
// import logger from "redux-logger";

import errorsReducer from "../reducers/errors.reducer";
import formReducer, { formStateReducer } from "../reducers/form.reducer";

const middlewares = [thunk];

const reducers = combineReducers({
  formState: formStateReducer,
  form: formReducer,
  errors: errorsReducer,
});

export default (() => {
  return createStore(
    reducers,
    composeWithDevTools(applyMiddleware(...middlewares))
  );
})();
