import { HttpMethod, ApiPath, CarsApiPath } from 'common/enums/enums';
import { baseApi } from '../base-api';

export const carApi = baseApi.injectEndpoints({
  endpoints: build => ({
    getCars: build.query({
      query: () => ({
        method: HttpMethod.GET,
        url: `${ApiPath.CARS}${CarsApiPath.ROOT}`
      })
    })
  })
});

export const { useGetCarsQuery } = carApi;
