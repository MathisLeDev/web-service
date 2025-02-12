import amqp from "amqplib";
import {PaymentModel} from "../models/payment.model";

const QUEUE_NAME = "payments-confirmations";

async function consumePaymentsConfirmations() {
    const paymentModel = new PaymentModel();
    try {
        const connection = await amqp.connect("amqp://rabbitmq:5672");
        const channel = await connection.createChannel();

        await channel.assertQueue(QUEUE_NAME, { durable: true });

        console.log(`[RabbitMQ] En attente des messages dans ${QUEUE_NAME}...`);

        channel.consume(QUEUE_NAME, async (msg) => {
            if (msg !== null) {
                const messageContent = JSON.parse(msg.content.toString());
                console.log(`[RabbitMQ] Message reçu :`, messageContent);

                const updatedPayment = await paymentModel.updatePayment(messageContent.payment);
                if(updatedPayment) {
                    console.log(`[RabbitMQ] Paiement mis à jour :`, updatedPayment);
                }

                channel.ack(msg);
            }
        });
    } catch (error) {
        console.error("❌ [RabbitMQ] Erreur lors de la connexion :", error);
    }
}

consumePaymentsConfirmations();
