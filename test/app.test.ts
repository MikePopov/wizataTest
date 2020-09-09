import {main} from "../main";
import chaiHttp from "chai-http";
import { expect } from "chai";
import {app} from "../app";
import chai from "chai"
import exp from "constants";


chai.use(chaiHttp);
chai.should();
chai.use(require('chai-like'));
chai.use(require('chai-things'));

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


describe('Data from which was send to Event Hub should correctly saved in InfluxDb',  () => {
  let date = new Date().toISOString();

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

    it(`sensorID = ${event.HardwareId} should saved correctly`,(done) => {
      chai.request(app)
        .get('/')
        .end((err, res) => {
          res.should.have.status(200);
          expect(res.body.map(e=>(e.sensorId))).to.include(`${event.HardwareId}_mult`);
          //console.log(res.body);
          done();
        });
    });

    it(`sensor value = ${event.SensorValue} should multiply on 2 = ${event.SensorValue*2} saved correctly`,(done) => {
      chai.request(app)
        .get('/')
        .end((err, res) => {
          res.should.have.status(200);
          expect(res.body.map(e=>(e.value))).to.include(event.SensorValue*2);
          //console.log(res.body);
          done();
        });
    });

    it.skip(`Time = ${date} should saved correctly`,(done) => {
      chai.request(app)
        .get('/')
        .end((err, res) => {
          res.should.have.status(200);
          expect(res.body.map(e=>(e.time))).to.include(date);
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