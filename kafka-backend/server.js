import { ConnectionProvider } from "./kafka/connection.js";
import handleQuestionRequest from "./services/questions.js";
import mongoInit from "./src/db/config/mongo.config.js";

mongoInit();

const handleTopicRequest = (topic, functionName) => {
  const connection = new ConnectionProvider();
  const consumer = connection.getConsumer(topic);
  const producer = connection.getProducer();

  console.log("Kafka server is running!");

  consumer.on("message", (message) => {
    console.log("Message received for topic => ", topic);
    console.log("Incoming message => ", message);
    const data = JSON.parse(message.value);

    functionName(data.data, (err, res) => {
      const payloads = [
        {
          topic: data.replyTo,
          messages: JSON.stringify({
            correlationId: data.correlationId,
            data: res,
          }),
          partition: 0,
        },
      ];

      producer.send(payloads, (err, data) => {
        if (err) console.error(err);
        console.log("Payload sent back to producer => ", data);
      });

      return;
    });
  });
};

handleTopicRequest("post", handleQuestionRequest);
