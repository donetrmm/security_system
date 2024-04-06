import express from "express";

import {
  createUserController,
  getAllUserController,
  getByCorreoUserController,
  updateUserController,
  eliminarUserController,
} from "./dependencies";

 import { verificarTokenController } from '../../auth/infrastructure/dependencies'
 const verifyTokenHelper = verificarTokenController.run.bind(verificarTokenController);

export const usuariosRouter = express.Router();

usuariosRouter.get("/", verifyTokenHelper, getAllUserController.run.bind(getAllUserController));

usuariosRouter.get("/:correo", verifyTokenHelper,getByCorreoUserController.run.bind(getByCorreoUserController));

usuariosRouter.post("/", createUserController.run.bind(createUserController));

usuariosRouter.put("/:correo", verifyTokenHelper,updateUserController.run.bind(updateUserController));

usuariosRouter.delete("/:correo", verifyTokenHelper,eliminarUserController.run.bind(eliminarUserController));
