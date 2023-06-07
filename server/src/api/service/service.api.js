import { ControllerHook, HttpCode, HttpMethod, ServicesApiPath } from '../../common/enums/enums.js';
import { getErrorStatusCode } from '../../helpers/helpers.js';

const initService = (fastify, opts, done) => {
  const { service: serviceService } = opts.services;

  fastify.route({
    method: HttpMethod.GET,
    url: ServicesApiPath.ROOT,
    [ControllerHook.HANDLER]: async () => serviceService.getAll()
  });

  fastify.route({
    method: HttpMethod.POST,
    url: ServicesApiPath.ROOT,
    async [ControllerHook.HANDLER](req, res) {
      try {
        const createdOrder = await serviceService.create(req.body);

        return res.status(HttpCode.CREATED).send(createdOrder);
      } catch (err) {
        return res.status(getErrorStatusCode(err)).send(err);
      }
    }
  });

  done();
};

export { initService };
