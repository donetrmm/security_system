import { Kit } from "../domain/Kit";
import { KitRepository } from "../domain/KitRepository";
import { NotificationSecurityOrderUseCase } from "./Services/NotificationNewSecurityOrder";

export class ActivateKitUseCase {
  constructor(
    readonly kitRepository: KitRepository,
    readonly sendNotification: NotificationSecurityOrderUseCase
  ) {}

  async run(kitId: number, activate: string): Promise<Kit | null> {
    try {
      const kit = await this.kitRepository.getById(kitId);
      if (!kit) return null;

      const savedKit = await this.kitRepository.activarKit(kitId, activate);
      
      if (savedKit)
        this.sendNotification.run(savedKit);

      return savedKit;
    } catch (error) {
      return null;
    }
  }
}
