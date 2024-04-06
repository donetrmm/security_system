import { Reportes } from "../domain/Reportes";
import { ReportesRepository } from "../domain/ReportesRepository";

export class GetByIdReportesUseCase {
  constructor(readonly reportesRepository: ReportesRepository) {}

  async run(id: number): Promise<Reportes | null> {
    try {
      const result = await this.reportesRepository.getById(id);
      return result;
    } catch (error) {
      return null;
    }
  }
}
