import { WorkshopsApiPath, ControllerHook, HttpMethod } from '../../common/enums/enums.js';

const initWorkshop = (fastify, opts, done) => {
  const { workshop: workshopService } = opts.services;

  fastify.route({
    method: HttpMethod.GET,
    url: WorkshopsApiPath.$ID,
    [ControllerHook.HANDLER]: async req => workshopService.getById(req.params.id)
  });

  fastify.route({
    method: HttpMethod.GET,
    url: WorkshopsApiPath.ROOT,
    [ControllerHook.HANDLER]: async () => workshopService.getAll()
  });

  done();
};

export { initWorkshop };
