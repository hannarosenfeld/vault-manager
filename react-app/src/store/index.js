import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { thunk } from 'redux-thunk';
import session from './session'
import userReducer from './user';
import vaultReducer from './vault'
import fieldReducer from './field';
import customerReducer from './customer';
import stageReducer from './stage';
import warehouseReducer from './warehouse';
import orderReducer from './order';
import searchReducer from './search';
import attachmentReducer from './attachment';
import companyReder from './company';


const rootReducer = combineReducers({
  session,
  user: userReducer,
  vault: vaultReducer,
  field: fieldReducer,
  customer: customerReducer,
  stage: stageReducer,
  warehouse: warehouseReducer,
  order: orderReducer,
  search: searchReducer,
  attachment: attachmentReducer,
  company: companyReder
});


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;