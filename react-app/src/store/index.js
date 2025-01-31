import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { thunk } from 'redux-thunk';
import session from './session';
import userReducer from './user';
import vaultReducer from './vault';
import fieldReducer from './field';
import customerReducer from './customer';
import warehouseReducer from './warehouse';
import orderReducer from './order';
import searchReducer from './search';
import attachmentReducer from './attachment';
import companyReder from './company';
import rackReducer from './rack';

// Import logger statically at the top
import logger from 'redux-logger';

const rootReducer = combineReducers({
  session,
  user: userReducer,
  vault: vaultReducer,
  field: fieldReducer,
  customer: customerReducer,
  warehouse: warehouseReducer,
  order: orderReducer,
  search: searchReducer,
  attachment: attachmentReducer,
  company: companyReder,
  rack: rackReducer
});

// Use applyMiddleware with conditional logger
let enhancer;
if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);  // Only thunk in production
} else {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));  // Add logger in dev mode
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
