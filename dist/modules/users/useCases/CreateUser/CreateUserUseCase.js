"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateUserUseCase = void 0;

var _tsyringe = require("tsyringe");

var _Either = require("../../../../shared/logic/Either");

var _IUsersRepository = require("../../repositories/IUsersRepository");

var _UserAlreadyExists = require("./errors/UserAlreadyExists");

var _name = require("../../domain/name");

var _email = require("../../domain/email");

var _password = require("../../domain/password");

var _IEnconderProvider = require("../../../../shared/infra/providers/Encoder/IEnconderProvider");

var _IMailProvider = require("../../../../shared/infra/providers/Mail/IMailProvider");

var _path = _interopRequireDefault(require("path"));

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let CreateUserUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('UsersRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('EncoderProvider')(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)('MailProvider')(target, undefined, 2);
}, _dec5 = Reflect.metadata("design:type", Function), _dec6 = Reflect.metadata("design:paramtypes", [typeof _IUsersRepository.IUsersRepository === "undefined" ? Object : _IUsersRepository.IUsersRepository, typeof _IEnconderProvider.IEncoderProvider === "undefined" ? Object : _IEnconderProvider.IEncoderProvider, typeof _IMailProvider.IMailProvider === "undefined" ? Object : _IMailProvider.IMailProvider]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = class CreateUserUseCase {
  constructor(usersRepository, encoder, mailService) {
    this.usersRepository = usersRepository;
    this.encoder = encoder;
    this.mailService = mailService;
  }

  async execute(data) {
    const nameOrError = await _name.Name.create(data.name);
    const emailOrError = await _email.Email.create(data.email);
    const passwordOrError = await _password.Password.create(data.password);

    if (nameOrError.isLeft()) {
      return (0, _Either.left)(nameOrError.value);
    }

    if (emailOrError.isLeft()) {
      return (0, _Either.left)(emailOrError.value);
    }

    if (passwordOrError.isLeft()) {
      return (0, _Either.left)(passwordOrError.value);
    }

    const name = nameOrError.value.value;
    const email = emailOrError.value.value;
    let password = passwordOrError.value.value;
    const passwordHashOrError = await this.encoder.encode(password);

    if (passwordHashOrError.isLeft()) {
      return (0, _Either.left)(passwordHashOrError.value);
    }

    password = passwordHashOrError.value;

    if (await this.usersRepository.exists(email)) {
      return (0, _Either.left)(new _UserAlreadyExists.UserAlreadyExists(email));
    }

    const user = await this.usersRepository.create({
      name,
      email,
      password
    });

    const file = _path.default.resolve(__dirname, '..', '..', 'views', 'wellcome.hbs');

    const sendMailOrError = await this.mailService.sendMail({
      to: {
        name: user.name,
        address: user.email
      },
      subject: '🎉 Boas Vindas 🎉',
      template: {
        file,
        variables: {
          name: user.name
        }
      }
    });

    if (sendMailOrError.isLeft()) {
      return (0, _Either.left)(sendMailOrError.value);
    }

    return (0, _Either.right)(user);
  }

}) || _class) || _class) || _class) || _class) || _class) || _class);
exports.CreateUserUseCase = CreateUserUseCase;