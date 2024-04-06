import { Reportes } from "./Reportes";

export interface ReportesRepository {
  getAll(): Promise<Reportes[] | null>;
  getById(reporteId: number): Promise<Reportes | null>;
  eliminarReportes(reporteId: number): Promise<Reportes | null>;
}
