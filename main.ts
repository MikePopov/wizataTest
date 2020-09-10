import {EventHubProducerClient} from "@azure/event-hubs";


const connectionString = "Endpoint=sb://wiz-test-qa.servicebus.windows.net/;SharedAccessKeyName=fn;SharedAccessKey=z6WjJKcsWFWyosTs2YDiTd/4c1iX0SJq6jOzve38lvk=;";
const eventHubName = "devicemessages";


export const main = async (date: any, hardwareId: any, sensorValue: any) => {

  // Create a producer client to send messages to the event hub.
  const producer = new EventHubProducerClient(connectionString, eventHubName);

  // Prepare a batch of three events.
  const batch = await producer.createBatch();

  batch.tryAdd({
    body: {
      Timestamp: date,
      HardwareId: hardwareId,
      SensorValue: sensorValue
    }
  });


  // Send the batch to the event hub.
  await producer.sendBatch(batch);

  // Close the producer client.
  await producer.close();

  console.log(`A batch have been sent to the event hub: ${[date, hardwareId, sensorValue]}`);
};

export const send = (data: object) => {
  for (let i=0; i < 5; i++){
    setTimeout(() => {
      let time = new Date().toISOString();
      console.log(time, data[i].HardwareId, data[i].SensorValue)
      main(time, data[i].HardwareId, data[i].SensorValue)

    }, 5000*i);
    //setTimeout(() => console.log(data[i].HardwareId), 5000 * i)
  }
}