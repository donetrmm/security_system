import { query } from "../../database/mysql";
import { Reportes } from "../domain/Reportes";
import { ReportesRepository } from "../domain/ReportesRepository";

export class MysqlReportesRepository implements ReportesRepository {
  async getAll(): Promise<Reportes[] | null> {
    const sql = "SELECT * FROM reportes";
    try {
      const [data]: any = await query(sql, []);
      const dataReportes = Object.values(JSON.parse(JSON.stringify(data)));

      return dataReportes.map(
        (reporte: any) =>
          new Reportes(
            reporte.id,
            reporte.fecha,
            reporte.hora,
            reporte.idKit,
            reporte.camara,
            reporte.movimiento,
            reporte.magnetico
          )
      );
    } catch (error) {
      return null;
    }
  }

  async getById(reporteId: number): Promise<Reportes | null> {
    const sql = "SELECT * FROM reportes WHERE id=?";
    const params: any[] = [reporteId];
    try {
      const [result]: any = await query(sql, params);

      return new Reportes(
        result[0].id,
        result[0].fecha,
        result[0].hora,
        result[0].idKit,
        result[0].camara,
        result[0].movimiento,
        result[0].magnetico
      );
    } catch (error) {
      return null;
    }
  }

  async eliminarReportes(reporteId: number): Promise<Reportes | null> {
    let deletedReporte = null;
    const sql = "DELETE FROM reportes WHERE id = ?";
    const params: any[] = [reporteId];
    try {
      const [result]: any = await query(sql, params);
      if (result.affectedRows === 1) {
        deletedReporte = new Reportes(reporteId, new Date(), '', 0, false, false, false);
      }
    } catch (error) {
      deletedReporte = null;
    } finally {
      return deletedReporte;
    }
  }
}
