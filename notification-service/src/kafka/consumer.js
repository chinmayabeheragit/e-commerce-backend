const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'notification-service',
  brokers: ['kafka:9092'],
});

const consumer = kafka.consumer({ groupId: 'notification-group' });

const startConsumer = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: 'email-topic', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const content = message.value.toString();
      console.log(`📨 Received message: ${content}`);

      // Placeholder for email logic
      // sendEmail(JSON.parse(content));
    },
  });
};

module.exports = startConsumer;
