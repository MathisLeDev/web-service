import amqp from "amqplib";
import { PaymentModel } from "../models/payment.model";

const QUEUE_NAME = "Payments-confirmations";
const RABBITMQ_URL = "amqp://rabbitmq:5672";

async function waitForRabbitMQ(retries = 5, delay = 5000) {
    for (let i = 0; i < retries; i++) {
        try {
            console.log(`[RabbitMQ] Tentative de connexion... (${i + 1}/${retries})`);
            const connection = await amqp.connect(RABBITMQ_URL);
            return connection;
        } catch (error) {
            console.error(`[RabbitMQ] Connexion échouée, nouvelle tentative dans ${delay / 1000}s...`);
            await new Promise((res) => setTimeout(res, delay));
        }
    }
    throw new Error("Impossible de se connecter à RabbitMQ après plusieurs tentatives.");
}

async function consumePaymentsConfirmations() {
    const paymentModel = new PaymentModel();

    try {
        const connection = await waitForRabbitMQ();
        const channel = await connection.createChannel();

        await channel.assertQueue(QUEUE_NAME, { durable: true });
        console.log(`[RabbitMQ] En attente des messages dans ${QUEUE_NAME}...`);

        channel.consume(QUEUE_NAME, async (msg) => {
            if (msg !== null) {
                const messageContent = JSON.parse(msg.content.toString());
                console.log(`[RabbitMQ] Message reçu :`, messageContent);

                const updatedPayment = await paymentModel.updatePayment(messageContent.payment);
                if (updatedPayment) {
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
