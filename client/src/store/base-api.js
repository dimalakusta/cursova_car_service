import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ENV, StorageKey } from 'common/enums/enums.js';
import { storage } from 'services/services';
import { authActionCreator } from './auth/auth';

const baseQuery = fetchBaseQuery({
  baseUrl: ENV.API_PATH,
  prepareHeaders: headers => {
    const token = storage.getItem(StorageKey.TOKEN);
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }
});

const baseQueryWithAuth = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    api.dispatch(authActionCreator.logout());
  }

  return result;
};

const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: baseQueryWithAuth,
  endpoints: () => ({}),
  tagTypes: ['Auth', 'Orders', 'Cars', 'Services']
});

export { baseApi };
