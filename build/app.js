"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Influx = require('influx');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
exports.app = express();
exports.app.use(bodyParser.json());
exports.app.use(bodyParser.urlencoded({
    extended: true
}));
exports.app.use(express.static(path.join(__dirname, 'public')));
exports.app.set('port', 3005);
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
influx.getDatabaseNames()
    .then(names => {
    if (!names.includes('telemetry')) {
        return error => console.log({ error });
    }
})
    .then(() => {
    exports.app.listen(exports.app.get('port'), () => {
        console.log(`Listening on ${exports.app.get('port')}.`);
    });
})
    .catch(error => console.log({ error }));
exports.app.get('/', (request, response) => {
    influx.query(`
    select * from sensors 
    limit 10
  `)
        .then(result => response.status(200).json(result))
        .catch(error => response.status(500).json({ error }));
});
exports.app.get('/delete', (request, response) => {
    influx.query(`
    DROP MEASUREMENT "sensors"
  `)
        .then(result => response.status(200).json(result))
        .catch(error => response.status(500).json({ error }));
});
