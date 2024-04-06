import { CreateUsuarioUseCase } from "../application/CreateUserUseCase";
import { GetAllUsuariosUseCase } from "../application/GetAllUsersUseCase";
import { GetByCorreoUsuarioUseCase } from "../application/GetByCorreoUserUseCase";
import { DeleteUsuarioUseCase } from "../application/DeleteUserUseCase";
import { UpdateUsuarioUseCase } from "../application/UpdateUserUseCase";

import { CreateUserController } from "./controllers/CreateUserController";
import { GetAllUsersController } from "./controllers/GetAllUsersController";
import { GetByCorreoUserController } from "./controllers/GetByCorreoUserController";
import { DeleteUsuarioController } from "./controllers/EliminarUserController";
import { UpdateUserController } from "./controllers/UpdateUserController";

import { EncryptService } from "./helpers/EncryptService";
import { MysqlUsuarioRepository } from "./MysqlUserRepository";

export const mysqlUserRepository = new MysqlUsuarioRepository();
export const encryptService = new EncryptService();

export const createUserUseCase = new CreateUsuarioUseCase(
  mysqlUserRepository,
  encryptService
  );
export const getAllUserUseCase = new GetAllUsuariosUseCase(mysqlUserRepository);
export const getByCorreoUserUseCase = new GetByCorreoUsuarioUseCase(mysqlUserRepository);
export const eliminarUserUseCase = new DeleteUsuarioUseCase(mysqlUserRepository);
export const updateUserUseCase = new UpdateUsuarioUseCase(mysqlUserRepository);

export const createUserController = new CreateUserController(createUserUseCase);
export const getAllUserController = new GetAllUsersController(getAllUserUseCase);
export const getByCorreoUserController = new GetByCorreoUserController(getByCorreoUserUseCase);
export const eliminarUserController = new DeleteUsuarioController(eliminarUserUseCase);
export const updateUserController = new UpdateUserController(updateUserUseCase);