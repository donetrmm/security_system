import amqplib from "amqplib";

import { Kit } from "../../domain/Kit";
import { NotificationNewSecurityOrder } from "../../domain/services/NotificationNewSecurityOrder";

export class NotificationNewKitO implements NotificationNewSecurityOrder {
  private options: any;
  private url: any;
  private exch: any;

  constructor() {
    this.options = {
      vhost: process.env.AMQP_VHOST,
      username: process.env.AMQP_USERNAME,
      password: process.env.AMQP_PASSWORD,
      port: process.env.AMQP_PORT,
    };
    this.url = process.env.AMQP_URL;
    this.exch = process.env.AMQP_EXCH;
  }

  async sendNotification(securityOrder: Kit): Promise<boolean> {
    const conn = await amqplib.connect(this.url, this.options);
    const securityOrderJSON = JSON.stringify(securityOrder);

    const ch = await conn.createChannel();
    const status = await ch.publish(this.exch, "", Buffer.from(securityOrderJSON));
    return status;
  }
}
