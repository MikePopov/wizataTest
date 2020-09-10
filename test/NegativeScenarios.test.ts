import {main} from "../main";
import chaiHttp from "chai-http";
import { expect } from "chai";
import {app} from "../app";
import chai from "chai"
import {negativeTestData} from "./fixtures";


chai.use(chaiHttp);
chai.should();
chai.use(require('chai-like'));
chai.use(require('chai-things'));

const testData = negativeTestData;

describe('Negative data was send to Event Hub in InfluxDb',  () => {
  let date = new Date().toISOString();

  testData.forEach(event => {
    before(async () => {

      await main(date, event.HardwareId, event.SensorValue);
    });
  });

  it(`String in sensor value should not be saved`, (done) => {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        expect(res.body.map(e=>(e.sensorId))).to.not.include(`${testData[0].HardwareId}_mult`);
        expect(res.body.map(e=>(e.value))).to.not.include(Number(testData[0].SensorValue)*2);
        //console.log(res.body);
        done();
      });
  });

  it(`NULL in sensor value should not be saved`, (done) => {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        expect(res.body.map(e=>(e.sensorId))).to.not.include(`${testData[1].HardwareId}_mult`);
        expect(res.body.map(e=>(e.value))).to.not.include(null);
        //console.log(res.body);
        done();
      });
  });

  it(`Undefined in sensor value should not be saved`, (done) => {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        expect(res.body.map(e=>(e.sensorId))).to.not.include(`${testData[2].HardwareId}_mult`);
        expect(res.body.map(e=>(e.value))).to.not.include(0);
        //console.log(res.body);
        done();
      });
  });

  it(`NULL in Hardware id should not be saved`, (done) => {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        expect(res.body.map(e=>(e.sensorId))).to.not.include(null);
        expect(res.body.map(e=>(e.sensorId))).to.not.include('_mult');
        expect(res.body.map(e=>(e.value))).to.not.include(testData[3].SensorValue);
        //console.log(res.body);
        done();
      });
  });

  it(`Undefined in Hardware id should not be saved`, (done) => {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        expect(res.body.map(e=>(e.sensorId))).to.not.include(null);
        expect(res.body.map(e=>(e.sensorId))).to.not.include('_mult');
        expect(res.body.map(e=>(e.value))).to.not.include(testData[4].SensorValue);
        //console.log(res.body);
        done();
      });
  });

  it(`Number in Hardware id should not be saved`, (done) => {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        let sensorValue = testData[4].SensorValue;
        expect(res.body.map(e=>(e.value))).to.not.include(sensorValue);
        //console.log(res.body);
        done();
      });
  });

  after(async () => {
    console.log('Clean DB...');
    await chai.request(app)
      .get('/delete')
  });
});

