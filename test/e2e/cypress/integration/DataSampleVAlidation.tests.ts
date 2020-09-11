import {equalTestData, negativeTestData, positiveTestData} from "../support/fixtures";
import {helpers} from "../support/Helpers";


describe('Validation data which was sent to EventHub and compare with Db',()=>{

  describe('Positive scenarios', () => {
    before(()=>{
      helpers.deleteTableInDb(10);

      for (let i = 0; i < positiveTestData.length; i++){
        helpers.sendDataSampleToEventHub(positiveTestData[i], 10000);
      }
    });

    after(()=>{
      helpers.deleteTableInDb(10000)
    });


    it(`Original SensorValue with positive numbers should saved correctly`, function () {
      cy.request('/').its('body').then(body => {
        let testDataObject = positiveTestData[0];
        let dataSample = body.find(x => x.sensorId === testDataObject.HardwareId);
        console.log(dataSample);
        expect(dataSample).to.have.all.keys('sensorId', 'time', 'value');
        expect(dataSample).to.have.deep.property('value', testDataObject.SensorValue)
      })
    });

    it(`Multiplied SensorValue with positive numbers should saved correctly`, function () {
      cy.request('/').its('body').then(body => {
        let testDataObject = positiveTestData[0];
        let dataSample = body.find(x => x.sensorId === `${testDataObject.HardwareId}_mult`);
        console.log(dataSample);
        expect(dataSample).to.have.all.keys('sensorId', 'time', 'value');
        expect(dataSample).to.have.deep.property('value', testDataObject.SensorValue*2)
      })
    });

    it('Original SensorValue with negative numbers should saved correctly', function () {
      cy.request('/').its('body').then(body => {
        let testDataObject = positiveTestData[1];
        let dataSample = body.find(x => x.sensorId === testDataObject.HardwareId);
        console.log(dataSample);
        expect(dataSample).to.have.all.keys('sensorId', 'time', 'value');
        expect(dataSample).to.have.deep.property('value', testDataObject.SensorValue)
      })
    });

    it('Multiplied SensorValue with negative numbers should saved correctly', function () {
      cy.request('/').its('body').then(body => {
        let testDataObject = positiveTestData[1];
        let dataSample = body.find(x => x.sensorId === `${testDataObject.HardwareId}_mult`);
        console.log(dataSample);
        expect(dataSample).to.have.all.keys('sensorId', 'time', 'value');
        expect(dataSample).to.have.deep.property('value', testDataObject.SensorValue*2)
      })
    });

    it('Original SensorValue with 0 numbers should saved correctly', function () {
      cy.request('/').its('body').then(body => {
        let testDataObject = positiveTestData[2];
        let dataSample = body.find(x => x.sensorId === testDataObject.HardwareId);
        console.log(dataSample);
        expect(dataSample).to.have.all.keys('sensorId', 'time', 'value');
        expect(dataSample).to.have.deep.property('value', testDataObject.SensorValue)
      })
    });

    it('Multiplied SensorValue with 0 numbers should saved correctly', function () {
      cy.request('/').its('body').then(body => {
        let testDataObject = positiveTestData[2];
        let dataSample = body.find(x => x.sensorId === `${testDataObject.HardwareId}_mult`);
        console.log(dataSample);
        expect(dataSample).to.have.all.keys('sensorId', 'time', 'value');
        expect(dataSample).to.have.deep.property('value', testDataObject.SensorValue*2)
      })
    });

    it('Original SensorValue with a fractional number should saved correctly', function () {
      cy.request('/').its('body').then(body => {
        let testDataObject = positiveTestData[3];
        let dataSample = body.find(x => x.sensorId === testDataObject.HardwareId);
        console.log(dataSample);
        expect(dataSample).to.have.all.keys('sensorId', 'time', 'value');
        expect(dataSample).to.have.deep.property('value', testDataObject.SensorValue)
      })
    });

    it('Multiplied SensorValue with a fractional number should saved correctly', function () {
      cy.request('/').its('body').then(body => {
        let testDataObject = positiveTestData[3];
        let dataSample = body.find(x => x.sensorId === `${testDataObject.HardwareId}_mult`);
        console.log(dataSample);
        expect(dataSample).to.have.all.keys('sensorId', 'time', 'value');
        expect(dataSample).to.have.deep.property('value', testDataObject.SensorValue*2)
      })
    });

    it('Original SensorValue with a ten-digit number should saved correctly', function () {
      cy.request('/').its('body').then(body => {
        let testDataObject = positiveTestData[4];
        let dataSample = body.find(x => x.sensorId === testDataObject.HardwareId);
        console.log(dataSample);
        expect(dataSample).to.have.all.keys('sensorId', 'time', 'value');
        expect(dataSample).to.have.deep.property('value', testDataObject.SensorValue)
      })
    });

    it('Multiplied SensorValue with a ten-digit number should saved correctly', function () {
      cy.request('/').its('body').then(body => {
        let testDataObject = positiveTestData[4];
        let dataSample = body.find(x => x.sensorId === `${testDataObject.HardwareId}_mult`);
        console.log(dataSample);
        expect(dataSample).to.have.all.keys('sensorId', 'time', 'value');
        expect(dataSample).to.have.deep.property('value', testDataObject.SensorValue*2)
      })
    });

    it(`Check that Multiplied DataSamples did not saved as "_mult" only`, function () {
      cy.request('/').its('body').then(body => {
        console.log(body);
        expect(body.map(e=>(e.sensorId))).to.not.include(`_mult`);
      })
    });
  });

  describe('Negative scenarios', () => {
    before(()=>{
      helpers.deleteTableInDb(10);

      for (let i = 0; i < negativeTestData.length; i++){
        helpers.sendDataSampleToEventHub(negativeTestData[i], 5000);
      }
    });

    after(()=>{
      helpers.deleteTableInDb(10000)
    });


    it(`Original Data Sample with SensorValue = String should not saved`, function () {
      cy.request('/').its('body').then(body => {
        let testDataObject = negativeTestData[0];
        expect(body.map(e=>(e.value))).to.not.include(testDataObject.SensorValue);
        expect(body.map(e=>(e.sensorId))).to.not.include(testDataObject.HardwareId);
      })
    });

    it(`Multiplied Data Sample with SensorValue = String should not saved`, function () {
      cy.request('/').its('body').then(body => {
        let testDataObject = negativeTestData[0];
        expect(body.map(e=>(e.value))).to.not.include(Number(testDataObject.SensorValue)*2);
        expect(body.map(e=>(e.sensorId))).to.not.include(`${testDataObject.HardwareId}_mult`);
      })
    });

    it(`Original Data Sample with SensorValue = null should not saved`, function () {
      cy.request('/').its('body').then(body => {
        let testDataObject = negativeTestData[1];
        expect(body.map(e=>(e.value))).to.not.include(testDataObject.SensorValue);
        expect(body.map(e=>(e.sensorId))).to.not.include(testDataObject.HardwareId);
      })
    });

    it(`Multiplied Data Sample with SensorValue = null should not saved`, function () {
      cy.request('/').its('body').then(body => {
        let testDataObject = negativeTestData[1];
        expect(body.map(e=>(e.sensorId))).to.not.include(`${testDataObject.HardwareId}_mult`);
        expect(body.map(e=>(e.sensorId))).to.not.include(testDataObject.HardwareId);
      })
    });

    it(`Original Data Sample with SensorValue = undefined should not saved`, function () {
      cy.request('/').its('body').then(body => {
        console.log(body);
        let testDataObject = negativeTestData[2];
        expect(body.map(e=>(e.value))).to.not.include(testDataObject.SensorValue);
        expect(body.map(e=>(e.sensorId))).to.not.include(testDataObject.HardwareId);
      })
    });

    it(`Multiplied Data Sample with SensorValue = undefined should not saved`, function () {
      cy.request('/').its('body').then(body => {
        console.log(body);
        let testDataObject = negativeTestData[2];
        expect(body.map(e=>(e.value))).to.not.include(testDataObject.SensorValue);
        expect(body.map(e=>(e.sensorId))).to.not.include(`${testDataObject.HardwareId}_mult`);
      })
    });

    it(`Original Data Sample with HardwareID = null should not saved`, function () {
      cy.request('/').its('body').then(body => {
        console.log(body);
        let testDataObject = negativeTestData[3];
        expect(body.map(e=>(e.value))).to.not.include(testDataObject.SensorValue);
        expect(body.map(e=>(e.sensorId))).to.not.include(testDataObject.HardwareId);
      })
    });

    it(`Multiplied Data Sample with HardwareID = null should not saved`, function () {
      cy.request('/').its('body').then(body => {
        console.log(body);
        let testDataObject = negativeTestData[3];
        expect(body.map(e=>(e.value))).to.not.include(Number(testDataObject.SensorValue)*2);
        expect(body.map(e=>(e.sensorId))).to.not.include(`${testDataObject.HardwareId}_mult`);
      })
    });

    it(`Original Data Sample with HardwareID = undefined should not saved`, function () {
      cy.request('/').its('body').then(body => {
        console.log(body);
        let testDataObject = negativeTestData[4];
        expect(body.map(e=>(e.value))).to.not.include(testDataObject.SensorValue);
        expect(body.map(e=>(e.sensorId))).to.not.include(testDataObject.HardwareId);
      })
    });

    it(`Multiplied Data Sample with HardwareID = undefined should not saved`, function () {
      cy.request('/').its('body').then(body => {
        console.log(body);
        let testDataObject = negativeTestData[4];
        expect(body.map(e=>(e.value))).to.not.include(Number(testDataObject.SensorValue)*2);
        expect(body.map(e=>(e.sensorId))).to.not.include(`${testDataObject.HardwareId}_mult`);
      })
    });

    it(`Original Data Sample with HardwareID = number should not saved`, function () {
      cy.request('/').its('body').then(body => {
        console.log(body);
        let testDataObject = negativeTestData[5];
        expect(body.map(e=>(e.value))).to.not.include(testDataObject.SensorValue);
        expect(body.map(e=>(e.sensorId))).to.not.include(testDataObject.HardwareId);
      })
    });

    it(`Check that value can multiply on 2 only`, function () {
      cy.request('/').its('body').then(body => {
        console.log(body);
        let testDataObject = negativeTestData[3];
        expect(body.map(e=>(e.value))).to.not.include(Number(testDataObject.SensorValue)*3);

        let testDataObject2 = negativeTestData[4];
        expect(body.map(e=>(e.value))).to.not.include(Number(testDataObject2.SensorValue)*3);
      })
    });

    it(`Check that Multiplied DataSamples did not saved as "_mult" only`, function () {
      cy.request('/').its('body').then(body => {
        console.log(body);
        expect(body.map(e=>(e.sensorId))).to.not.include(`_mult`);
      })
    });
  });

  describe('Validation how data saved in the time laps', () => {
    before(()=>{
      helpers.deleteTableInDb(10);

      for (let i = 0; i < equalTestData.length; i++){
        helpers.sendDataSampleToEventHub(equalTestData[i], 10000);
      }
    });

    after(()=>{
      helpers.deleteTableInDb(10000)
    });

    it(`Original Data Sample with equal hardwareId but different time should saved both samples`, function () {
      cy.request('/').its('body').then(body => {
        for (let i = 0; i <  equalTestData.length; i++){
          let testDataObject = equalTestData[i];
          expect(body.map(e=>(e.value))).to.include(testDataObject.SensorValue);
          expect(body.map(e=>(e.sensorId))).to.include(testDataObject.HardwareId);
        }
      })
    });

    it(`Multiplied Data Sample with equal hardwareId but different time should saved both samples`, function () {
      cy.request('/').its('body').then(body => {
        for (let i = 0; i <  equalTestData.length; i++){
          let testDataObject = equalTestData[i];
          expect(body.map(e=>(e.value))).to.include(testDataObject.SensorValue*2);
          expect(body.map(e=>(e.sensorId))).to.include(`${testDataObject.HardwareId}_mult`);
        }
      })
    });

    it(`Samples order`, function () {
      cy.request('/').its('body').then(body => {
            expect(body[0]).to.have.deep.property('sensorId', `${equalTestData[0].HardwareId}`);
            expect(body[1]).to.have.deep.property('sensorId', `${equalTestData[0].HardwareId}_mult`);
            expect(body[2]).to.have.deep.property('sensorId', `${equalTestData[1].HardwareId}`);
            expect(body[3]).to.have.deep.property('sensorId', `${equalTestData[1].HardwareId}_mult`);
            expect(body[4]).to.have.deep.property('sensorId', `${equalTestData[2].HardwareId}`);
            expect(body[5]).to.have.deep.property('sensorId', `${equalTestData[2].HardwareId}_mult`);
      })
    });
  })
});