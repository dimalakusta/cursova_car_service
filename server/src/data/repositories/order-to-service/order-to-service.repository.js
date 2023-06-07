import { Abstract } from '../abstract/abstract.repository.js';

class OrderToService extends Abstract {
  constructor({ orderToServiceModel }) {
    super(orderToServiceModel);
  }
}

export { OrderToService };
