import {main} from "../main";
import {eventHubEvent} from "../fixtures";
import chaiHttp from "chai-http";
import { expect } from "chai";
import {app} from "../app";
import chai from "chai"


chai.use(chaiHttp);
chai.should();


let hardwareId = eventHubEvent[1].HardwareId;
let sensorValue = eventHubEvent[1].SensorValue;
let sensorValueMult = sensorValue*2;


describe('Data from which was send to Event Hub should correctly saved in InfluxDb',  () => {
  let date = new Date().toISOString();

  const testData = [
    {
      HardwareId: 'TEST_TEST_1',
      SensorValue: 20
    },{
      HardwareId: 'TEST_TEST_2',
      SensorValue: -2
    },{
      HardwareId: 'TEST_TEST_3',
      SensorValue: 0
    },
  ];



  before(async () => {
    await chai.request(app)
         .get('/delete');

    await main(date, hardwareId, sensorValue);
  });

  // after(async () => {
  //   await chai.request(app)
  //     .get('/delete')
  // });


  it.skip('timestamp value should saved correctly', (done) => {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        res.should.have.status(200);
        expect(res.body).to.have.lengthOf(1);
        expect(res.body[0]).to.have.property('time').eq(date); //TODO Change to correct Date test should failed
        done();
      });
  });

  it('sensorId value should saved correctly', (done) => {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        res.should.have.status(200);
        expect(res.body).to.have.lengthOf(1);
        expect(res.body[0]).to.have.property('sensorId').eq(`${hardwareId}_mult`);
        done();
      });
  });

  it('value field with positive number should saved correctly', (done) => {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        res.should.have.status(200);
        expect(res.body).to.have.lengthOf(1);
        expect(res.body[0]).to.have.property('value').eq(sensorValueMult);
        done();
      });
  });

  it('value with negative number should saved correctly', (done) => {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        res.should.have.status(200);
        // expect(res.body).to.have.lengthOf(10);
        // expect(res.body[0]).to.have.property('value').eq(3000);
        // expect(res.body[1]).to.have.property('value').eq(10000);
        // expect(res.body).to.deep.include( {
        //     time: date,
        //     sensorId: `${hardwareId}_mult`,
        //     value: sensorValue*2
        //   }
        // )
        console.log(res.body);
        done();
      });
  });

  it('value with 0 should saved correctly', (done) => {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        res.should.have.status(200);
        // expect(res.body).to.have.lengthOf(10);
        // expect(res.body[0]).to.have.property('value').eq(3000);
        // expect(res.body[1]).to.have.property('value').eq(10000);
        // expect(res.body).to.deep.include( {
        //     time: date,
        //     sensorId: `${hardwareId}_mult`,
        //     value: sensorValue*2
        //   }
        // )
        console.log(res.body);
        done();
      });
  });

  it('value with NULL should saved correctly', (done) => {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        res.should.have.status(200);
        // expect(res.body).to.have.lengthOf(10);
        // expect(res.body[0]).to.have.property('value').eq(3000);
        // expect(res.body[1]).to.have.property('value').eq(10000);
        // expect(res.body).to.deep.include( {
        //     time: date,
        //     sensorId: `${hardwareId}_mult`,
        //     value: sensorValue*2
        //   }
        // )
        console.log(res.body);
        done();
      });
  });

  it('value with Undefined should saved correctly', (done) => {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        res.should.have.status(200);
        // expect(res.body).to.have.lengthOf(10);
        // expect(res.body[0]).to.have.property('value').eq(3000);
        // expect(res.body[1]).to.have.property('value').eq(10000);
        // expect(res.body).to.deep.include( {
        //     time: date,
        //     sensorId: `${hardwareId}_mult`,
        //     value: sensorValue*2
        //   }
        // )
        console.log(res.body);
        done();
      });
  });

  it('value as array Undefined should saved correctly', (done) => {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        res.should.have.status(200);
        // expect(res.body).to.have.lengthOf(10);
        // expect(res.body[0]).to.have.property('value').eq(3000);
        // expect(res.body[1]).to.have.property('value').eq(10000);
        // expect(res.body).to.deep.include( {
        //     time: date,
        //     sensorId: `${hardwareId}_mult`,
        //     value: sensorValue*2
        //   }
        // )
        console.log(res.body);
        done();
      });
  });

  it('value as string Undefined should saved correctly', (done) => {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        res.should.have.status(200);
        // expect(res.body).to.have.lengthOf(10);
        // expect(res.body[0]).to.have.property('value').eq(3000);
        // expect(res.body[1]).to.have.property('value').eq(10000);
        // expect(res.body).to.deep.include( {
        //     time: date,
        //     sensorId: `${hardwareId}_mult`,
        //     value: sensorValue*2
        //   }
        // )
        console.log(res.body);
        done();
      });
  });



})