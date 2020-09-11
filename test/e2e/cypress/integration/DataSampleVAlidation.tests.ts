import {positiveTestData} from "../../../fixtures";
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


    it('SensorValue with positive numbers should saved correctly', function () {
      cy.request('/').its('body').then(body => {
        let dataSample = body.find(x => x.sensorId === `${positiveTestData[0].HardwareId}`);
        console.log(dataSample);
        expect(dataSample).to.have.all.keys('sensorId', 'time', 'value')
        expect(dataSample).to.have.deep.property('value', positiveTestData[0].SensorValue)

      })

    });
  })

})