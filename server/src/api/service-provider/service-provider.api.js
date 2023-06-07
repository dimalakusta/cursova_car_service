import { ServiceProvidersApiPath, ControllerHook, HttpMethod } from '../../common/enums/enums.js';

const initServiceProvider = (fastify, opts, done) => {
  const { serviceProvider: serviceProviderService } = opts.services;

  fastify.route({
    method: HttpMethod.GET,
    url: ServiceProvidersApiPath.$WORKSHOP_ID,
    [ControllerHook.HANDLER]: async req => {
      return serviceProviderService.getServiceProvidersByWorkshopId(req.params.workshopId);
    }
  });

  done();
};

export { initServiceProvider };
