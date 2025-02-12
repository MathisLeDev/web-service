import {PaymentModel} from "../models/payment.model";
import {PaymentDto} from "../dtos/payment.dto";
import {PaymentEntity} from "../entities/payment.entity";
import amqp from "amqplib";

export class PurchaseResolvers {
    _paymentModel = new PaymentModel();

    constructor() {
    }

    async purchaseArticle({payment}: { payment: PaymentDto }) {
        try {
            const newPayment = await this._paymentModel.createPayment(payment);
            if (newPayment) {
                await this.sendNewPaymentToQueue(newPayment);
            }
        } catch (error) {
            throw error;
        }
    }

    async sendNewPaymentToQueue(payment: PaymentEntity) {
        try {
            const connection = await amqp.connect("amqp://rabbitmq");
            const channel = await connection.createChannel();
            const queue = "payments-request";

            await channel.assertQueue(queue, { durable: true });
            channel.sendToQueue(queue, Buffer.from(JSON.stringify(payment)), { persistent: true });

            console.log("Message envoyé à RabbitMQ:", payment);

            await channel.close();
            await connection.close();
        } catch (error) {
            throw error;
        }
    }
}

export default new PurchaseResolvers();
