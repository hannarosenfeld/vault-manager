import { configureStore } from '@reduxjs/toolkit';
import warehouseReducer from './warehouse';
import logger from 'redux-logger';

export default configureStore({
  reducer: {
    warehouse: warehouseReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});