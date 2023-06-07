import { HttpMethod, ApiPath, OrdersApiPath, ServiceProvidersApiPath } from 'common/enums/enums';
import { baseApi } from '../base-api';

export const orderApi = baseApi.injectEndpoints({
  endpoints: build => ({
    getOrders: build.query({
      query: () => ({
        method: HttpMethod.GET,
        url: `${ApiPath.ORDERS}${OrdersApiPath.ROOT}`
      }),
      // eslint-disable-next-line no-confusing-arrow
      providesTags: result =>
        // is result available?
        // successful query
        /* an error occurred, but we still want to refetch 
        this query when `{ type: 'Posts', id: 'LIST' }` is invalidated */
        result
          ? [...result.map(({ id }) => ({ type: 'Orders', id })), { type: 'Orders', id: 'List' }]
          : [{ type: 'Orders', id: 'List' }]
    }),
    createOrder: build.mutation({
      query: payload => ({
        method: HttpMethod.POST,
        url: `${ApiPath.ORDERS}${OrdersApiPath.ROOT}`,
        body: payload
      }),
      invalidatesTags: [{ type: 'Orders', id: 'List' }]
    }),
    changeOrderStatus: build.mutation({
      query: ({ id, status }) => ({
        method: HttpMethod.PATCH,
        url: `${ApiPath.ORDERS}/${id}${OrdersApiPath.CHANGE_STATUS}`,
        body: { status }
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Orders', id }]
    }),
    getProviders: build.query({
      query: workshopId => ({
        method: HttpMethod.GET,
        url: `${ApiPath.SERVICE_PROVIDERS}/${workshopId}`
      })
    }),
    assignProvider: build.mutation({
      query: ({ id, serviceProviderId }) => ({
        method: HttpMethod.PATCH,
        url: `${ApiPath.ORDERS}/${id}${OrdersApiPath.ASSIGN_PROVIDER}`,
        body: { serviceProviderId }
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Orders', id }]
    }),
    completeOrder: build.mutation({
      query: ({ id, noteByProvider }) => ({
        method: HttpMethod.PATCH,
        url: `${ApiPath.ORDERS}/${id}${OrdersApiPath.COMPLETE_ORDER}`,
        body: { noteByProvider }
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Orders', id }]
    })
  })
});

export const {
  useCreateOrderMutation,
  useChangeOrderStatusMutation,
  useGetOrdersQuery,
  useAssignProviderMutation,
  useCompleteOrderMutation,
  useGetProvidersQuery
} = orderApi;
