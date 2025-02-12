import amqp from "amqplib";

const REQUEST_QUEUE = "Payments-request";
const CONFIRMATION_QUEUE = "Payments-confirmations";
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
    try {
        const connection = await waitForRabbitMQ();
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
                const confirmation = { payment: messageContent };

                setTimeout(() => {
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
