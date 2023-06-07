import { Abstract } from '../abstract/abstract.repository.js';

class ServiceProvider extends Abstract {
  constructor({ serviceProviderModel }) {
    super(serviceProviderModel);
  }

  getServiceProvidersByWorkshopId(workshopId) {
    return this.model
      .query()
      .select('serviceProviders.*')
      .withGraphJoined('[workshop, user]')
      .where({ workshopId });
  }
}

export { ServiceProvider };
