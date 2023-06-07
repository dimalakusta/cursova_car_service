import { Abstract } from '../abstract/abstract.repository.js';

class Car extends Abstract {
  constructor({ carModel }) {
    super(carModel);
  }

  getCars() {
    return this.model.query().select('cars.*').orderBy('createdAt', 'desc');
  }
}

export { Car };
