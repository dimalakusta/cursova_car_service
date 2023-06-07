import { OrdersApiPath, ControllerHook, HttpMethod, HttpCode } from '../../common/enums/enums.js';
import { getErrorStatusCode } from '../../helpers/helpers.js';

const initOrders = (fastify, opts, done) => {
  const { order: orderService } = opts.services;

  fastify.route({
    method: HttpMethod.GET,
    url: OrdersApiPath.ROOT,
    [ControllerHook.HANDLER]: req => orderService.getAllByUserId(req.user)
  });

  fastify.route({
    method: HttpMethod.POST,
    url: OrdersApiPath.ROOT,
    async [ControllerHook.HANDLER](req, res) {
      try {
        const createdOrder = await orderService.create({ userId: req.user.id, ...req.body });

        return res.status(HttpCode.CREATED).send(createdOrder);
      } catch (err) {
        return res.status(getErrorStatusCode(err)).send(err);
      }
    }
  });

  fastify.route({
    method: HttpMethod.PATCH,
    url: `${OrdersApiPath.$ID}${OrdersApiPath.CHANGE_STATUS}`,
    async [ControllerHook.HANDLER](req, res) {
      try {
        const updatedOrder = await orderService.changeStatus(req.params.id, req.body);

        return res.status(HttpCode.OK).send(updatedOrder);
      } catch (err) {
        return res.status(getErrorStatusCode(err)).send(err);
      }
    }
  });

  fastify.route({
    method: HttpMethod.PATCH,
    url: `${OrdersApiPath.$ID}${OrdersApiPath.ASSIGN_PROVIDER}`,
    async [ControllerHook.HANDLER](req, res) {
      try {
        const updatedOrder = await orderService.assignServiceProvider(req.params.id, req.body);

        return res.status(HttpCode.OK).send(updatedOrder);
      } catch (err) {
        return res.status(getErrorStatusCode(err)).send(err);
      }
    }
  });

  fastify.route({
    method: HttpMethod.PATCH,
    url: `${OrdersApiPath.$ID}${OrdersApiPath.COMPLETE_ORDER}`,
    async [ControllerHook.HANDLER](req, res) {
      try {
        const updatedOrder = await orderService.completeOrder(req.params.id, req.body);

        return res.status(HttpCode.OK).send(updatedOrder);
      } catch (err) {
        return res.status(getErrorStatusCode(err)).send(err);
      }
    }
  });

  done();
};

export { initOrders };
