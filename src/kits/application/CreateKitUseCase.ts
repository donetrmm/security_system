import { Kit } from "../domain/Kit";
import { KitRepository } from "../domain/KitRepository";

export class CreateKitUseCase {
  constructor(
    readonly kitRepository: KitRepository,
  ) {}

  async run(
    id: number,
    nombre: string,
    status: string,
    alta: boolean,
    lugar: string,
    idPropietario: string
  ): Promise<Kit | null> {
    const kit = new Kit(id, nombre, status, alta, lugar, idPropietario);
    try {
      const kitt = await this.kitRepository.createKit(kit);
      return kitt;
    } catch (error) {
      console.error("Error al crear el kit:", error);
      return null;
    }
  }
}
