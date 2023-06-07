import { configureStore } from '@reduxjs/toolkit';
import { http, storage, notification, auth } from 'services/services.js';
// import { errorHandlerMiddleware } from './middlewares/middlewares';
import { authReducer } from './auth/auth';
import { modalReducer } from './modal/modal';
import { baseApi } from './base-api';

const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    auth: authReducer,
    modal: modalReducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: {
          services: {
            http,
            storage,
            notification,
            auth
          }
        }
      }
    }).concat([baseApi.middleware])
});

export { store };
