"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EnsureAuthenticatedMiddleware = void 0;

var _tsyringe = require("tsyringe");

var _ITokenProvider = require("../../providers/token/ITokenProvider");

var _dec, _dec2, _dec3, _dec4, _class;

let EnsureAuthenticatedMiddleware = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('TokenProvider')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _ITokenProvider.ITokenProvider === "undefined" ? Object : _ITokenProvider.ITokenProvider]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class EnsureAuthenticatedMiddleware {
  constructor(tokenManager) {
    this.tokenManager = tokenManager;
  }

  async execute(req, res, next) {
    const hasToken = req.headers.authorization;

    if (!hasToken) {
      return res.status(401).json({
        error: 'Nenhum token informado'
      });
    }

    const isValidTokenOrError = this.tokenManager.verify(hasToken);

    if (isValidTokenOrError.isLeft()) {
      return res.status(401).json({
        error: 'Token inválido'
      });
    }

    const {
      id
    } = isValidTokenOrError.value;
    req.user = {
      id
    };
    return next();
  }

}) || _class) || _class) || _class) || _class);
exports.EnsureAuthenticatedMiddleware = EnsureAuthenticatedMiddleware;