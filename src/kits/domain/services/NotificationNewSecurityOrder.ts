import { Kit } from "../Kit";

export interface NotificationNewSecurityOrder {
  sendNotification(kit: Kit): Promise<boolean>;
}
