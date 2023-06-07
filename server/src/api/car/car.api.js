import { CarsApiPath, ControllerHook, HttpMethod } from '../../common/enums/enums.js';

const initCar = (fastify, opts, done) => {
  const { car: carService } = opts.services;

  fastify.route({
    method: HttpMethod.GET,
    url: CarsApiPath.ROOT,
    [ControllerHook.HANDLER]: async () => carService.getAll()
  });

  done();
};

export { initCar };
