import { Kit } from "../domain/Kit";
import { KitRepository } from "../domain/KitRepository";

export class GetByIdKitUseCase {
  constructor(readonly kitRepository: KitRepository) {}

  async run(id: number): Promise<Kit | null> {
    try {
      const result = await this.kitRepository.getById(id);
      return result;
    } catch (error) {
      console.error("Error al obtener el kit:", error);
      return null;
    }
  }
}
