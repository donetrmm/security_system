import { ReportesRepository } from "../domain/ReportesRepository";

export class DeleteReporteUseCase {
  constructor(
    readonly reporteRepository: ReportesRepository
  ) {}

  async run(reporteId: number): Promise<boolean> {
    try {
      const existingReporte = await this.reporteRepository.getById(reporteId);
      if (!existingReporte) {
        return false;
      }

      await this.reporteRepository.eliminarReportes(reporteId);

      return true;
    } catch (error) {
      console.error("Error al eliminar el reporte:", error);
      return false;
    }
  }
}
