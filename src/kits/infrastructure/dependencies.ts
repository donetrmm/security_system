import { CreateKitUseCase } from "../application/CreateKitUseCase";
import { GetAllKitUseCase } from "../application/GetAllKitUseCase";
import { GetByIdKitUseCase } from "../application/GetByIdKitUseCase";
import { NotificationSecurityOrderUseCase } from "../application/Services/NotificationNewSecurityOrder";
import { ActivateKitUseCase } from "../application/ActivarDesactivarKitUseCase";
import { DeleteKitUseCase } from "../application/EliminarKitUseCase";
import { UpdateKitUseCase } from "../application/UpdateKitUseCase";

import { CreateKitController } from "./controllers/CreateKitController";
import { GetAllKitController } from "./controllers/GetAllKitController";
import { GetByIdKitController } from "./controllers/GetByIdKitController";
import { ActivateKitController } from "./controllers/ActivarDesactivarKitController";
import { DeleteKitController } from "./controllers/EliminarKitController";
import { UpdateKitController } from "./controllers/UpdateKitController";

import { EncryptService } from "./helpers/EncryptService";
import { MysqlKitRepository } from "./MysqlKitRepository";
import { NotificationNewKitO } from "./servicesRabbitMQ/NotificationNewKit";

export const mysqlKitRepository = new MysqlKitRepository();
export const notificationNewServiceOrder = new NotificationNewKitO();
export const encryptService = new EncryptService();

export const notificationSecurityOrderUseCase = new NotificationSecurityOrderUseCase(notificationNewServiceOrder);
export const createKitUseCase = new CreateKitUseCase(mysqlKitRepository);
export const getAllKitUseCase = new GetAllKitUseCase(mysqlKitRepository);
export const getByIdKitUseCase = new GetByIdKitUseCase(mysqlKitRepository);
export const activarKitUseCase = new ActivateKitUseCase(
  mysqlKitRepository,
  notificationSecurityOrderUseCase
  );
export const eliminarKitUseCase = new DeleteKitUseCase(mysqlKitRepository);
export const updateKitUseCase = new UpdateKitUseCase(mysqlKitRepository);

export const createKitController = new CreateKitController(createKitUseCase);
export const getAllKitController = new GetAllKitController(getAllKitUseCase);
export const getByIdKitController = new GetByIdKitController(getByIdKitUseCase);
export const activarKitController = new ActivateKitController(activarKitUseCase)
export const eliminarKitController = new DeleteKitController(eliminarKitUseCase);
export const updateKitController = new UpdateKitController(updateKitUseCase);


