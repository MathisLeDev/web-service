import amqp from "amqplib";

const REQUEST_QUEUE = "payments-request";
const CONFIRMATION_QUEUE = "payments-confirmations";

async function consumePaymentsConfirmations() {
    try {
        const connection = await amqp.connect("amqp://rabbitmq:5672");
        const channel = await connection.createChannel();

        await channel.assertQueue(REQUEST_QUEUE, { durable: true });
        await channel.assertQueue(CONFIRMATION_QUEUE, { durable: true });

        console.log(`[RabbitMQ] En attente des messages dans ${REQUEST_QUEUE}...`);

        channel.consume(REQUEST_QUEUE, async (msg) => {
            if (!msg) return;

            try {
                const messageContent = JSON.parse(msg.content.toString());
                console.log(`📩 [RabbitMQ] Message reçu :`, messageContent);
                messageContent.status = "processed";

                // Simuler le traitement
                const confirmation = {
                    payment: messageContent,
                };

                setTimeout(() => {

                // Envoi de la confirmation
                channel.sendToQueue(
                    CONFIRMATION_QUEUE,
                    Buffer.from(JSON.stringify(confirmation)),
                    { persistent: true }
                );

                console.log(`✅ [RabbitMQ] Confirmation envoyée :`, confirmation);
                }, 5000);

                channel.ack(msg);
            } catch (error) {
                console.error("❌ [RabbitMQ] Erreur de traitement :", error);
            }
        });
    } catch (error) {
        console.error("❌ [RabbitMQ] Erreur de connexion :", error);
    }
}

consumePaymentsConfirmations();
