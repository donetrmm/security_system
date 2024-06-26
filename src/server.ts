import express from "express";
import morgan from "morgan";
import { Signale } from "signale";
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config()

import { kitRouter } from "./kits/infrastructure/KitRouter";
import { reportesRouter } from "./reportes/infrastructure/reportesRouter";
import { usuariosRouter } from "./usuarios/infrastructure/userRouter";
import { authRouter } from "./auth/infrastructure/authRouter";

const corsOptions: cors.CorsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
};

const app = express();

app.use(cors(corsOptions));

const signale = new Signale();

const SERVER_PORT = process.env.SERVER_PORT || 4000;

app.use(express.json());
app.use(morgan("dev"));

app.use("/kits", kitRouter);
app.use("/reportes", reportesRouter)
app.use("/usuarios", usuariosRouter);
app.use("/auth", authRouter);


app.listen(SERVER_PORT, () => {
  signale.success(`Servicio corriendo en el puerto ${SERVER_PORT}`);
});