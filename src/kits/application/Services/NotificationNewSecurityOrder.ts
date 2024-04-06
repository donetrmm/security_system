import { Kit } from "../../domain/Kit";
import { NotificationNewKitO } from "../../infrastructure/servicesRabbitMQ/NotificationNewKit";

export class NotificationSecurityOrderUseCase {
  constructor(readonly serviceNotifiacion: NotificationNewKitO) {}

  async run(kit: Kit) {
    await this.serviceNotifiacion.sendNotification(kit);
  }
}
