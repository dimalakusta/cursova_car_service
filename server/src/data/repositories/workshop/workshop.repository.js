import { Abstract } from '../abstract/abstract.repository.js';

class Workshop extends Abstract {
  constructor({ workshopModel }) {
    super(workshopModel);
  }

  getWorkshops() {
    return this.model
      .query()
      .select('workshops.*')
      .withGraphFetched('[image]')
      .orderBy('createdAt', 'desc');
  }

  getWorkshopById(id) {
    return this.model
      .query()
      .select('workshops.*')
      .where({ id })
      .withGraphFetched('[admin, image, services]')
      .first();
  }
}

export { Workshop };
