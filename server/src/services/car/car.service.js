class Car {
  constructor({ carRepository }) {
    this._carRepository = carRepository;
  }

  getAll() {
    return this._carRepository.getCars();
  }
}

export { Car };
