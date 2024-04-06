import { Login } from "../application/LoginAuthUseCase";


import { LoginAuthController } from "./controllers/LoginAuthController";
import { VerificarTokenController } from "./controllers/TokenServiceController";

import { EncryptService } from "./helpers/EncryptService";
import { TokenService } from "./helpers/TokenService";

import { MysqlAuthRepository } from "./MysqlAuthRepository";

export const mysqlUserRepository = new MysqlAuthRepository();
export const encryptService = new EncryptService();
export const tokenService = new TokenService();

export const loginAuthUseCase = new Login(
  mysqlUserRepository,
  encryptService,
  tokenService
  );

export const loginAuthController = new LoginAuthController(loginAuthUseCase);
export const verificarTokenController = new VerificarTokenController(tokenService);
