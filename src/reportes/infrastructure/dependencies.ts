import { DeleteReporteUseCase } from "../application/EliminarReporteUseCase";
import { GetAllReportesUseCase } from "../application/GetAllReportesUseCase";
import { GetByIdReportesUseCase } from "../application/GetByIdReportesUseCase";
import { DeleteReporteController } from "./controllers/DeleteReporteController";
import { GetAllReportesController } from "./controllers/GetAllReporteController";
import { GetByIdReportesController } from "./controllers/GetByIdReporteController";
import { MysqlReportesRepository } from "./MysqlReportesRepository";


export const mysqlReportesRepository = new MysqlReportesRepository();

export const deleteReporteUseCase = new DeleteReporteUseCase(mysqlReportesRepository);
export const getAllReporteUseCase = new GetAllReportesUseCase(mysqlReportesRepository);
export const getByIdReportesUseCase = new GetByIdReportesUseCase(mysqlReportesRepository);

export const deleteReportesController = new DeleteReporteController(deleteReporteUseCase);
export const getAllReportesController = new GetAllReportesController(getAllReporteUseCase);
export const getByIdReporteController = new GetByIdReportesController(getByIdReportesUseCase);
