import {negativeTestData, positiveTestData} from "../../../fixtures";
import {helpers} from "../support/Helpers";


describe('Validation data which was sent to EventHub and compare with Db',()=>{
  describe('Positive scenarios', () => {
    before(()=>{
      helpers.deleteTableInDb(10);

      for (let i = 0; i < positiveTestData.length; i++){
        helpers.sendDataSampleToEventHub(positiveTestData[i], 5000);
      }
    });

    after(()=>{
      helpers.deleteTableInDb(10000)
    });


    it(`SensorValue with positive numbers should saved correctly`, function () {
      cy.request('/').its('body').then(body => {
        let testDataObject = positiveTestData[0];
        let dataSample = body.find(x => x.sensorId === `${testDataObject.HardwareId}`);
        console.log(dataSample);
        expect(dataSample).to.have.all.keys('sensorId', 'time', 'value');
        expect(dataSample).to.have.deep.property('value', testDataObject.SensorValue)
      })
    });

    it('SensorValue with negative numbers should saved correctly', function () {
      cy.request('/').its('body').then(body => {
        let testDataObject = positiveTestData[1];
        let dataSample = body.find(x => x.sensorId === `${testDataObject.HardwareId}`);
        console.log(dataSample);
        expect(dataSample).to.have.all.keys('sensorId', 'time', 'value');
        expect(dataSample).to.have.deep.property('value', testDataObject.SensorValue)
      })
    });

    it('SensorValue with 0 numbers should saved correctly', function () {
      cy.request('/').its('body').then(body => {
        let testDataObject = positiveTestData[2];
        let dataSample = body.find(x => x.sensorId === `${testDataObject.HardwareId}`);
        console.log(dataSample);
        expect(dataSample).to.have.all.keys('sensorId', 'time', 'value');
        expect(dataSample).to.have.deep.property('value', testDataObject.SensorValue)
      })
    });

    it('SensorValue with a fractional number should saved correctly', function () {
      cy.request('/').its('body').then(body => {
        let testDataObject = positiveTestData[3];
        let dataSample = body.find(x => x.sensorId === `${testDataObject.HardwareId}`);
        console.log(dataSample);
        expect(dataSample).to.have.all.keys('sensorId', 'time', 'value');
        expect(dataSample).to.have.deep.property('value', testDataObject.SensorValue)
      })
    });

    it('SensorValue with "e"-symbol should saved correctly', function () {
      cy.request('/').its('body').then(body => {
        let testDataObject = positiveTestData[3];
        let dataSample = body.find(x => x.sensorId === `${testDataObject.HardwareId}`);
        console.log(dataSample);
        expect(dataSample).to.have.all.keys('sensorId', 'time', 'value');
        expect(dataSample).to.have.deep.property('value', testDataObject.SensorValue)
      })
    });

    it('SensorValue with a ten-digit number should saved correctly', function () {
      cy.request('/').its('body').then(body => {
        let testDataObject = positiveTestData[3];
        let dataSample = body.find(x => x.sensorId === `${testDataObject.HardwareId}`);
        console.log(dataSample);
        expect(dataSample).to.have.all.keys('sensorId', 'time', 'value');
        expect(dataSample).to.have.deep.property('value', testDataObject.SensorValue)
      })
    });
  })

  describe.only('Negative scenarios', () => {
    before(()=>{
      helpers.deleteTableInDb(10);

      for (let i = 0; i < negativeTestData.length; i++){
        helpers.sendDataSampleToEventHub(negativeTestData[i], 5000);
      }
    });

    after(()=>{
      helpers.deleteTableInDb(10000)
    });


    it(`Data Sample with SensorValue = String should not saved`, function () {
      cy.request('/').its('body').then(body => {
        let testDataObject = negativeTestData[0];
        expect(body.map(e=>(e.value))).to.not.include(testDataObject.SensorValue);
        expect(body.map(e=>(e.value))).to.not.include(Number(testDataObject.SensorValue)*2);
        expect(body.map(e=>(e.sensorId))).to.not.include(`${testDataObject.HardwareId}_mult`);
        expect(body.map(e=>(e.sensorId))).to.not.include(testDataObject.HardwareId);
      })
    });

    it(`Data Sample with SensorValue = null should not saved`, function () {
      cy.request('/').its('body').then(body => {
        let testDataObject = negativeTestData[1];
        expect(body.map(e=>(e.value))).to.not.include(testDataObject.SensorValue);
        expect(body.map(e=>(e.sensorId))).to.not.include(`${testDataObject.HardwareId}_mult`);
        expect(body.map(e=>(e.sensorId))).to.not.include(testDataObject.HardwareId);
      })
    });

    it(`Data Sample with SensorValue = undefined should not saved`, function () {
      cy.request('/').its('body').then(body => {
        console.log(body);
        let testDataObject = negativeTestData[2];
        expect(body.map(e=>(e.value))).to.not.include(testDataObject.SensorValue);
        expect(body.map(e=>(e.sensorId))).to.not.include(`${testDataObject.HardwareId}_mult`);
        expect(body.map(e=>(e.sensorId))).to.not.include(testDataObject.HardwareId);
      })
    });

    it(`Data Sample with HardwareID = null should not saved`, function () {
      cy.request('/').its('body').then(body => {
        console.log(body);
        let testDataObject = negativeTestData[3];
        expect(body.map(e=>(e.value))).to.not.include(testDataObject.SensorValue);
        expect(body.map(e=>(e.value))).to.not.include(Number(testDataObject.SensorValue)*2);
        expect(body.map(e=>(e.sensorId))).to.not.include(`${testDataObject.HardwareId}_mult`);
        expect(body.map(e=>(e.sensorId))).to.not.include(testDataObject.HardwareId);
      })
    });

    it.only(`Data Sample with HardwareID = undefined should not saved`, function () {
      cy.request('/').its('body').then(body => {
        console.log(body);
        let testDataObject = negativeTestData[4];
        expect(body.map(e=>(e.value))).to.not.include(testDataObject.SensorValue);
        expect(body.map(e=>(e.value))).to.not.include(Number(testDataObject.SensorValue)*2);
        expect(body.map(e=>(e.sensorId))).to.not.include(`${testDataObject.HardwareId}_mult`);
        expect(body.map(e=>(e.sensorId))).to.not.include(testDataObject.HardwareId);
      })
    });

  })

})