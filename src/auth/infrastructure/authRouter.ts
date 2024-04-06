import express from "express";

import {
  loginAuthController,
  verificarTokenController
} from "./dependencies";

export const authRouter = express.Router();


authRouter.post("/", loginAuthController.run.bind(loginAuthController));

