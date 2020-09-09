import {main} from "../main";
import chaiHttp from "chai-http";
import { expect } from "chai";
import {app} from "../app";
import chai from "chai"


chai.use(chaiHttp);
chai.should();


describe('Data from which was send to Event Hub should correctly saved in InfluxDb',  () => {
  let date = new Date().toISOString();

  const positiveTestData = [
    {
      HardwareId: 'TEST_TEST_1',
      SensorValue: 20
    },{
      HardwareId: 'TEST_TEST_2',
      SensorValue: -2
    },{
      HardwareId: 'TEST_TEST_3',
      SensorValue: 0
    }
  ];

  positiveTestData.forEach(event => {
    before(async () => {
      // await chai.request(app)
      //      .get('/delete');

      await main(date, event.HardwareId, event.SensorValue);
    });

    it(`values should saved correctly - SensorID: ${event.HardwareId}, ExpectedValue: ${event.SensorValue*2}`, (done) => {
      chai.request(app)
        .get('/')
        .end((err, res) => {
          res.should.have.status(200);
          expect(res.body).to.deep.include( {
              time: '1754-08-30T22:43:41.128Z',
              sensorId: `${event.HardwareId}_mult`,
              value: event.SensorValue*2
            }
          );
          //console.log(res.body);
          done();
        });
    });
  });

  after(async () => {
    console.log('Clean DB...');
    await chai.request(app)
      .get('/delete')
  });

});