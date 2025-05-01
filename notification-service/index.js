const startConsumer = require('./src/kafka/consumer');

const startApp = async () => {
  try {
    console.log('📦 Notification service is starting...');

    await startConsumer();

    console.log('✅ Kafka consumer is running and listening for messages...');
  } catch (err) {
    console.error('❌ Failed to start notification service:', err);
    process.exit(1);
  }
};

startApp();
