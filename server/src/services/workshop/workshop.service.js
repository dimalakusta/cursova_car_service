class Workshop {
  constructor({ workshopRepository }) {
    this._workshopRepository = workshopRepository;
  }

  create(adminId, workshop) {
    return this._workshopRepository.create({
      ...workshop,
      adminId
    });
  }

  getAll() {
    return this._workshopRepository.getWorkshops();
  }

  getById(id) {
    return this._workshopRepository.getWorkshopById(id);
  }
}

export { Workshop };
