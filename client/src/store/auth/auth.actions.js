import { createAsyncThunk } from '@reduxjs/toolkit';
import { ExceptionMessage, HttpCode, StorageKey } from 'common/enums/enums.js';
import { HttpError } from 'exceptions/exceptions';
import { baseApi } from 'store/base-api';
import { ActionType } from './auth.common';

const login = createAsyncThunk(
  ActionType.LOG_IN,
  async (payload, { extra: { services }, rejectWithValue }) => {
    try {
      const data = await services.auth.login(payload);

      services.storage.setItem(StorageKey.TOKEN, data.token);

      return data.user;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const register = createAsyncThunk(
  ActionType.REGISTER,
  async (payload, { extra: { services }, rejectWithValue }) => {
    try {
      const data = await services.auth.registration(payload);

      services.storage.setItem(StorageKey.TOKEN, data.token);

      return data.user;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const logout = createAsyncThunk(
  ActionType.LOG_OUT,
  (_request, { extra: { services }, dispatch }) => {
    services.storage.removeItem(StorageKey.TOKEN);
    dispatch(baseApi.util.resetApiState());

    return null;
  }
);

const loadCurrentUser = createAsyncThunk(
  ActionType.LOAD_CURRENT_USER,
  async (_, { extra: { services }, dispatch, rejectWithValue }) => {
    try {
      const data = await services.auth.getCurrentUser();
      return data;
    } catch (err) {
      const isHttpError = err instanceof HttpError;

      if (isHttpError && err.status === HttpCode.UNAUTHORIZED) {
        dispatch(logout());
      }

      return rejectWithValue(err);
    }
  }
);

export { login, logout, register, loadCurrentUser };
