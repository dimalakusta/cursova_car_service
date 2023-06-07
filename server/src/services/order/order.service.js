import { UserRole } from '../../common/enums/enums.js';

class Order {
  constructor({ orderRepository, userRepository, orderToServiceService }) {
    this._orderRepository = orderRepository;
    this._userRepository = userRepository;
    this._orderToServiceService = orderToServiceService;
  }

  async create({ services, fullName, phoneNumber, ...order }) {
    const createdOrder = await this._orderRepository.create(order);

    const orderToServiceServices = services.map(service => {
      return this._orderToServiceService.create({
        orderId: createdOrder.id,
        serviceId: service.id
      });
    });

    if (fullName && phoneNumber) {
      await this._userRepository.updateUserById(createdOrder.userId, { fullName, phoneNumber });
    }

    await Promise.all(orderToServiceServices);

    return createdOrder;
  }

  changeStatus(id, { status }) {
    return this._orderRepository.changeStatus(id, status);
  }

  assignServiceProvider(id, { serviceProviderId }) {
    return this._orderRepository.assignServiceProvider(id, serviceProviderId);
  }

  completeOrder(id, { noteByProvider }) {
    return this._orderRepository.completeOrder(id, noteByProvider);
  }

  getAllByUserId(user) {
    if (user.role === UserRole.ADMIN) {
      return this._orderRepository.getOrdersByAdminId(user.id);
    }

    if (user.role === 'Service Provider') {
      console.log('_orderRepository', this._orderRepository.getOrdersByServiceProviderId);
      return this._orderRepository.getOrdersByServiceProviderId(user.id);
    }

    return this._orderRepository.getOrdersByUserId(user.id);
  }
}

export { Order };
