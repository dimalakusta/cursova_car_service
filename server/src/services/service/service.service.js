class Service {
  constructor({ serviceRepository, workshopToServiceRepository }) {
    this._serviceRepository = serviceRepository;
    this._workshopToServiceRepository = workshopToServiceRepository;
  }

  async create(service) {
    const createdService = await this._serviceRepository.create(service);

    console.log('service', service);

    await this._workshopToServiceRepository.create({
      workshopId: service.workshopId,
      serviceId: createdService.id
    });

    return createdService;
  }

  getAll() {
    return this._serviceRepository.getServices();
  }
}

export { Service };
