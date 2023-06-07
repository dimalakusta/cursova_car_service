class OrderToService {
  constructor({ orderToServiceRepository }) {
    this._orderToServiceRepository = orderToServiceRepository;
  }

  create({ orderId, serviceId }) {
    return this._orderToServiceRepository.create({
      orderId,
      serviceId
    });
  }
}

export { OrderToService };
