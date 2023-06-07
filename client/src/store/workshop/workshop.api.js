import { HttpMethod, ApiPath, WorkshopsApiPath } from 'common/enums/enums';
import { baseApi } from '../base-api';

export const workshopApi = baseApi.injectEndpoints({
  endpoints: build => ({
    getWorkshops: build.query({
      query: () => ({
        method: HttpMethod.GET,
        url: `${ApiPath.WORKSHOPS}${WorkshopsApiPath.ROOT}`
      }),
      providesTags: result =>
        // is result available?
        // successful query
        /* an error occurred, but we still want to refetch 
          this query when `{ type: 'Posts', id: 'LIST' }` is invalidated */
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Workshops', id })),
              { type: 'Workshops', id: 'List' }
            ]
          : [{ type: 'Workshops', id: 'List' }]
    }),
    getWorkshopById: build.query({
      query: id => ({
        method: HttpMethod.GET,
        url: `${ApiPath.WORKSHOPS}/${id}`
      }),
      providesTags: (result, error, id) => [{ type: 'Workshops', id }]
    })
  })
});

export const { useGetWorkshopByIdQuery, useGetWorkshopsQuery } = workshopApi;
