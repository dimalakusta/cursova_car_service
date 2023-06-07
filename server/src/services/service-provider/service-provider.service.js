class ServiceProvider {
  constructor({ serviceProviderRepository }) {
    this._serviceProviderRepository = serviceProviderRepository;
  }

  getServiceProvidersByWorkshopId(workshopId) {
    return this._serviceProviderRepository.getServiceProvidersByWorkshopId(workshopId);
  }
}

export { ServiceProvider };
