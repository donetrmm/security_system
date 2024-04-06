import express from "express";

import {
  activarKitController,
  createKitController,
  eliminarKitController,
  getAllKitController,
  getByIdKitController,
  updateKitController
} from "./dependencies";

import { verificarTokenController } from '../../auth/infrastructure/dependencies'
const verifyTokenHelper = verificarTokenController.run.bind(verificarTokenController);

export const kitRouter = express.Router();

kitRouter.get("/", verifyTokenHelper, getAllKitController.run.bind(getAllKitController));

kitRouter.get("/:id", verifyTokenHelper, getByIdKitController.run.bind(getByIdKitController));

kitRouter.post("/", verifyTokenHelper, createKitController.run.bind(createKitController));

kitRouter.put("/security/:id", verifyTokenHelper, activarKitController.run.bind(activarKitController));

kitRouter.delete("/:id", verifyTokenHelper, eliminarKitController.run.bind(eliminarKitController));

kitRouter.put("/:id", verifyTokenHelper, updateKitController.run.bind(updateKitController));
