const Influx = require('influx');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

export const app = express();

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({
//   extended: true
// }));
// app.use(express.static(path.join(__dirname, 'public')));
// app.set('port', 3005);


const influx = new Influx.InfluxDB({
  host: 'qa-influxdb-test.onwizata.com',
  database: 'telemetry',
  username: 'wizata',
  password: 'sVdBYsZGvMu3RhLqH2Jv6jUt',
  protocol: 'https',
  schema: [
    {
      measurement: 'sensors',
      fields: {
        value: Influx.FieldType.FLOAT
      },
      tags: [
        'sensorId'
      ]
    }
  ]
});

// influx.getDatabaseNames()
//   .then(names => {
//     if (!names.includes('telemetry')) {
//       return error => console.log({error})
//     }
//   })
//   .then(() => {
//       app.listen(app.get('port'), () => {
//       console.log(`Listening on ${app.get('port')}.`);
//     });
//   })
//   .catch(error => console.log({ error }));


app.get('/', (request, response) => {
  influx.query(`
    select * from sensors 
    limit 30
  `)
    .then(result => response.status(200).json(result))
    .catch(error => response.status(500).json({ error }));
});

app.get('/delete', (request, response) => {
  influx.query(`
    DROP MEASUREMENT "sensors"
  `)
    .then(result => response.status(200).json(result))
    .catch(error => response.status(500).json({ error }));
});

