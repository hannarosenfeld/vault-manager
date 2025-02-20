import { configureStore } from '@reduxjs/toolkit';
import warehouseReducer from './warehouse';
import stageReducer from './stage';
import logger from 'redux-logger';

export default configureStore({
  reducer: {
    warehouse: warehouseReducer,
    stage: stageReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});