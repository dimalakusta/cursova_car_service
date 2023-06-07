import { HttpMethod, ApiPath, ServicesApiPath } from 'common/enums/enums';
import { baseApi } from '../base-api';

export const serviceApi = baseApi.injectEndpoints({
  endpoints: build => ({
    getServices: build.query({
      query: () => ({
        method: HttpMethod.GET,
        url: `${ApiPath.SERVICES}${ServicesApiPath.ROOT}`
      }),
      // eslint-disable-next-line no-confusing-arrow
      providesTags: result =>
        // is result available?
        // successful query
        /* an error occurred, but we still want to refetch 
            this query when `{ type: 'Posts', id: 'LIST' }` is invalidated */
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Services', id })),
              { type: 'Services', id: 'List' }
            ]
          : [{ type: 'Services', id: 'List' }]
    }),
    createService: build.mutation({
      query: payload => ({
        method: HttpMethod.POST,
        url: `${ApiPath.SERVICES}${ServicesApiPath.ROOT}`,
        body: payload
      }),
      invalidatesTags: (result, error, { id, workshopId }) => [
        { type: 'Services', id },
        { type: 'Workshops', id: workshopId }
      ]
    })
  })
});

export const { useGetServicesQuery, useCreateServiceMutation } = serviceApi;
