import { Abstract } from '../abstract/abstract.repository.js';

class Order extends Abstract {
  constructor({ orderModel }) {
    super(orderModel);
  }

  getOrdersByUserId(userId) {
    return (
      this.model
        .query()
        .select('orders.*')
        .withGraphJoined('[workshop, car, services, user, serviceProvider]')
        // .withGraphFetched('[serviceProvider.user]')
        .where({ 'user.id': userId })
        .orderBy('createdAt', 'desc')
    );
  }

  getOrdersByAdminId(adminId) {
    return this.model
      .query()
      .select('orders.*')
      .withGraphJoined('[workshop, car, services, user, serviceProvider]')
      .where({ 'workshop.adminId': adminId })
      .orderBy('createdAt', 'desc');
  }

  getOrdersByServiceProviderId(serviceProviderId) {
    return this.model
      .query()
      .select('orders.*')
      .withGraphJoined('[workshop, car, services, user, serviceProvider]')
      .where({ 'serviceProvider.userId': serviceProviderId })
      .orderBy('createdAt', 'desc');
  }

  changeStatus(id, status) {
    return this.model.query().patch({ status }).where({ id });
  }

  assignServiceProvider(id, serviceProviderId) {
    return this.model.query().patch({ serviceProviderId }).where({ id });
  }

  completeOrder(id, noteByProvider) {
    return this.model.query().patch({ noteByProvider, status: 'Completed' }).where({ id });
  }
}

export { Order };
