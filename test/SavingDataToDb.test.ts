import {main} from "../main";
import chaiHttp from "chai-http";
import { expect } from "chai";
import {app} from "../app";
import chai from "chai"
import {positiveTestData} from "./fixtures";


chai.use(chaiHttp);
chai.should();
chai.use(require('chai-like'));
chai.use(require('chai-things'));

const testData = positiveTestData;


describe('Data from which was send to Event Hub should correctly saved in InfluxDb',  () => {
  let date = new Date().toISOString();

  testData.forEach(event => {
    before(async () => {

      await main(date, event.HardwareId, event.SensorValue);
    });

    it(`sensorID = ${event.HardwareId} should saved correctly`,(done) => {
      chai.request(app)
        .get('/')
        .end((err, res) => {
          expect(res.body.map(e=>(e.sensorId))).to.include(`${event.HardwareId}_mult`);
          //console.log(res.body);
          done();
        });
    });

    it(`sensor value = ${event.SensorValue} should multiply on 2 = ${event.SensorValue*2} saved correctly`,(done) => {
      chai.request(app)
        .get('/')
        .end((err, res) => {
          expect(res.body.map(e=>(e.value))).to.include(event.SensorValue*2);
          //console.log(res.body);
          done();
        });
    });

    it(`Time = ${date} should saved correctly`,(done) => {
      chai.request(app)
        .get('/')
        .end((err, res) => {
          expect(res.body.map(e=>(e.time))).to.include(date);
          //console.log(res.body);
          done();
        });
    });

  });

  it(`order of data samples should be the same as was send to Event hub`, (done) => {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        for (let i = 0; i < testData.length; i++){
          expect(res.body[i]).to.have.deep.property('sensorId', `${testData[i].HardwareId}_mult`);
        }
        done();
      });
  });

  after(async () => {
    console.log('Clean DB...');
    await chai.request(app)
      .get('/delete')
  });

});

describe('Equal data samples with different timestamps', () => {
  let date1 = new Date ();
  let date2 = new Date ( date1 );
  date2.setMinutes( date1.getMinutes() + 1 );

  const testData = [
    {
      Timestamp​: date1.toISOString(),
      HardwareId: 'TEST_TEST_1',
      SensorValue: 6
    },
    {
      Timestamp​: date2.toISOString(),
      HardwareId: 'TEST_TEST_1',
      SensorValue: 6
    }
  ];

  testData.forEach(event => {
    before(async function () {
      await main(event.Timestamp, event.HardwareId, event.SensorValue);
    });

    it('should saved both Data samples', (done) => {
      chai.request(app)
        .get('/')
        .end((err, res) => {
          expect(res.body).to.deep.include( {
              time: event.Timestamp,
              sensorId: `${event.HardwareId}_mult`,
              value: event.SensorValue*2
            }
          );
          done();
        });
    });

    after(async () => {
      console.log('Clean DB...');
      await chai.request(app)
        .get('/delete')
    });
  })
})