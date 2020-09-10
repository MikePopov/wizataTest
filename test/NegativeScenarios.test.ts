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

const negativeTestData = [
  {
    HardwareId: 'TEST_TEST_1',
    SensorValue: 'd'
  },
  {
    HardwareId: 'TEST_TEST_2',
    SensorValue: null
  },{
    HardwareId: 'TEST_TEST_3',
    SensorValue: undefined
  },
  {
    HardwareId: null,
    SensorValue: 4
  },
  {
   HardwareId: undefined,
    SensorValue: 5
  },
  {
    HardwareId: 666,
    SensorValue: 6
  }
];


describe('Negative data was send to Event Hub in InfluxDb',  () => {
  let date = new Date().toISOString();

  negativeTestData.forEach(event => {
    before(async () => {
      // await chai.request(app)
      //      .get('/delete');

      await main(date, event.HardwareId, event.SensorValue);
    });
  });

  it(`String in sensor value should not be saved`, (done) => {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        expect(res.body.map(e=>(e.sensorId))).to.not.include(`${negativeTestData[0].HardwareId}_mult`);
        expect(res.body.map(e=>(e.value))).to.not.include(Number(negativeTestData[0].SensorValue)*2);
        console.log(res.body);
        done();
      });
  });

  it(`NULL in sensor value should not be saved`, (done) => {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        expect(res.body.map(e=>(e.sensorId))).to.not.include(`${negativeTestData[1].HardwareId}_mult`);
        expect(res.body.map(e=>(e.value))).to.not.include(null);
        console.log(res.body);
        done();
      });
  });

  it(`Undefined in sensor value should be saved correctly`, (done) => {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        expect(res.body.map(e=>(e.sensorId))).to.include(`${negativeTestData[2].HardwareId}_mult`);
        expect(res.body.map(e=>(e.value))).to.include(0);
        console.log(res.body);
        done();
      });
  });

  it(`NULL in Hardware id should not be saved`, (done) => {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        expect(res.body.map(e=>(e.sensorId))).to.not.include(null);
        expect(res.body.map(e=>(e.sensorId))).to.not.include('_mult');
        expect(res.body.map(e=>(e.value))).to.not.include(negativeTestData[3].SensorValue);
        console.log(res.body);
        done();
      });
  });

  it(`Undefined in Hardware id should not be saved`, (done) => {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        expect(res.body.map(e=>(e.sensorId))).to.not.include(null);
        expect(res.body.map(e=>(e.sensorId))).to.not.include('_mult');
        expect(res.body.map(e=>(e.value))).to.not.include(negativeTestData[4].SensorValue);
        console.log(res.body);
        done();
      });
  });

  it(`Number in Hardware id should not be saved`, (done) => {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        let sensorValue = negativeTestData[4].SensorValue;
        expect(res.body.map(e=>(e.value))).to.not.include(sensorValue);
        console.log(res.body);
        done();
      });
  });

  after(async () => {
    console.log('Clean DB...');
    await chai.request(app)
      .get('/delete')
  });
});

