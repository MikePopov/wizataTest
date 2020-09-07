const { EventHubProducerClient } = require("@azure/event-hubs");

const connectionString = "Endpoint=sb://wiz-test-qa.servicebus.windows.net/;SharedAccessKeyName=fn;SharedAccessKey=z6WjJKcsWFWyosTs2YDiTd/4c1iX0SJq6jOzve38lvk=;";
const eventHubName = "devicemessages";

async function main(hardwareId, sensorValue) {

  // Create a producer client to send messages to the event hub.
  const producer = new EventHubProducerClient(connectionString, eventHubName);

  // Prepare a batch of three events.
  const batch = await producer.createBatch();
  let date = new Date;
  console.log(date.toISOString());
  batch.tryAdd({ body: {
    timestamp: date.toISOString(),
      HardwareId: hardwareId,
      SensorValue: sensorValue
    } });


  // Send the batch to the event hub.
  await producer.sendBatch(batch);

  // Close the producer client.
  await producer.close();

  console.log("A batch have been sent to the event hub");
}

// main('tTESTSESTSTSTSTSTST_4', 555).catch((err) => {
//   console.log("Error occurred: ", err);
// });

exports.main = main;