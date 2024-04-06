import express from "express";

import {
  deleteReportesController,
  getAllReportesController,
  getByIdReporteController,
} from "./dependencies";

import { verificarTokenController } from '../../auth/infrastructure/dependencies'
const verifyTokenHelper = verificarTokenController.run.bind(verificarTokenController);

export const reportesRouter = express.Router();

reportesRouter.get("/", verifyTokenHelper, getAllReportesController.run.bind(getAllReportesController));
reportesRouter.get("/:id", verifyTokenHelper, getByIdReporteController.run.bind(getByIdReporteController));
reportesRouter.delete("/:id", verifyTokenHelper, deleteReportesController.run.bind(deleteReportesController));
