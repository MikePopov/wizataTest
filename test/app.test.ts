import {main} from "../main";
import {eventHubEvent} from "../fixtures";
import chaiHttp from "chai-http";
import { expect } from "chai";
import {app} from "../app";
import chai from "chai"


chai.use(chaiHttp);
chai.should();

let date = new Date().toISOString();
let hardwareId = eventHubEvent[1].HardwareId;
let sensorValue = eventHubEvent[1].SensorValue;


describe('',  () => {
  before(async () => {
    await main(date, hardwareId, sensorValue);
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