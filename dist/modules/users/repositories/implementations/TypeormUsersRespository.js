"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TypeormUsersRepository = void 0;

var _typeorm = require("typeorm");

var _User = require("../../infra/typeorm/entities/User");

var _dec, _dec2, _dec3, _class;

let TypeormUsersRepository = (_dec = (0, _typeorm.EntityRepository)(_User.User), _dec2 = Reflect.metadata("design:type", Function), _dec3 = Reflect.metadata("design:paramtypes", [void 0]), _dec(_class = _dec2(_class = _dec3(_class = class TypeormUsersRepository {
  constructor(repo = (0, _typeorm.getRepository)(_User.User)) {
    this.repo = repo;
  }

  async exists(email) {
    const userAlreadyExists = await this.repo.findOne({
      email
    });

    if (userAlreadyExists) {
      return true;
    }

    return false;
  }

  async create(data) {
    const user = this.repo.create(data);
    await this.repo.save(user);
    return user;
  }

  async update(id, {
    email,
    password,
    name
  }) {
    await this.repo.update(id, {
      email,
      password,
      name
    });
  }

  async findByEmail(email) {
    return await this.repo.findOne({
      email
    });
  }

  async findById(id) {
    return await this.repo.findOne({
      id
    });
  }

  async delete(id) {
    try {
      await this.repo.delete(id);
      return true;
    } catch (error) {
      return false;
    }
  }

}) || _class) || _class) || _class);
exports.TypeormUsersRepository = TypeormUsersRepository;