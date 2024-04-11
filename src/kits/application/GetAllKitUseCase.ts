import { Kit } from "../domain/Kit";
import { KitRepository } from "../domain/KitRepository";

export class GetAllKitUseCase {
  constructor(readonly kitRepository: KitRepository) {}

  async run(idPropietario: string): Promise<Kit[] | null> {
    try {
      const result = await this.kitRepository.getAll(idPropietario);
      return result;
    } catch (error) {
      console.error("Error al obtener kits:", error);
      return null;
    }
  }
}
