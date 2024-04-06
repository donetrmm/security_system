import { Reportes } from "../domain/Reportes";
import { ReportesRepository } from "../domain/ReportesRepository";

export class GetAllReportesUseCase {
  constructor(readonly reportesRepository: ReportesRepository) {}

  async run(): Promise<Reportes[] | null> {
    try {
      const result = await this.reportesRepository.getAll();
      return result;
    } catch (error) {
      return null;
    }
  }
}
