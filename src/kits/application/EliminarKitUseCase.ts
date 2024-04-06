import { Kit } from "../domain/Kit";
import { KitRepository } from "../domain/KitRepository";

export class DeleteKitUseCase {
  constructor(
    readonly kitRepository: KitRepository
  ) {}

  async run(kitId: number): Promise<boolean> {
    try {
      const existingKit = await this.kitRepository.getById(kitId);
      if (!existingKit) {
        return false;
      }

      await this.kitRepository.deleteKit(kitId);

      return true;
    } catch (error) {
      console.error("Error al eliminar el kit:", error);
      return false;
    }
  }
}
