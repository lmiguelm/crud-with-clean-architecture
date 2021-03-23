"use strict";

var _tsyringe = require("tsyringe");

var _TypeormUsersRespository = require("../repositories/implementations/TypeormUsersRespository");

require("../infra/providers/index");

_tsyringe.container.registerSingleton('UsersRepository', _TypeormUsersRespository.TypeormUsersRepository);