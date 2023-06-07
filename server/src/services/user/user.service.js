class User {
  constructor({ userRepository }) {
    this._userRepository = userRepository;
  }

  async getUserById(id) {
    const user = await this._userRepository.getUserById(id);

    return user;
  }

  async updateUserById(id, payload) {
    const user = await this._userRepository.getUserById(id, payload);

    return user;
  }
}

export { User };
