const chai = require('chai'), chaiHttp = require('chai-http');
const expect = chai.expect;
const assert = require('assert');
const main = require('../main');
const app = require('../app');
const event= require('../fixtures');


chai.use(chaiHttp);
chai.should();

let date = new Date().toISOString();
let hardwareId = event[1].HardwareId;
let sensorValue = event[1].SensorValue;


describe('',  () => {
  before(async () => {
    await main.main(date, hardwareId, sensorValue);
  });


  it('all fields from event should saved correctly', (done) => {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        res.should.have.status(200);
        expect(res.body).to.have.lengthOf(10);
        // expect(res.body[0]).to.have.property('value').eq(3000);
        // expect(res.body[1]).to.have.property('value').eq(10000);
        expect(res.body).to.deep.include( {
            time: date,
            sensorId: `${hardwareId}_mult`,
            value: sensorValue*2
          }
        )
        console.log(res.body);
        done();
      });
  });



})