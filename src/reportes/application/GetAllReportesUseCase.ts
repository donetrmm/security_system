import { Reportes } from "../domain/Reportes";
import { ReportesRepository } from "../domain/ReportesRepository";

export class GetAllReportesUseCase {
  constructor(readonly reportesRepository: ReportesRepository) {}

  async run(kitID: number): Promise<Reportes[] | null> {
    try {
      const result = await this.reportesRepository.getAll(kitID);
      return result;
    } catch (error) {
      return null;
    }
  }
}
