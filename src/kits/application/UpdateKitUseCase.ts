import { Kit } from "../domain/Kit";
import { KitRepository } from "../domain/KitRepository";

export class UpdateKitUseCase {
  constructor(
    readonly kitRepository: KitRepository
  ) {}

  async run(kitId: number, updatedFields: Partial<Kit>): Promise<Kit | null> {
    try {
      const existingKit = await this.kitRepository.getById(kitId);
      if (!existingKit) {
        return null;
      }

      const updatedKit: Kit = {
        ...existingKit,
        ...updatedFields,
      };

      const savedKit = await this.kitRepository.updateKit( kitId, updatedKit );

      return savedKit;
    } catch (error) {
      console.error("Error al actualizar el kit:", error);
      return null;
    }
  }
}
