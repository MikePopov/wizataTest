describe('First', ()=>{
  before(()=>{
    let date = new Date().toISOString()
    let testData = {
      Timestamp: date,
      HardwareId: 'TEST_TEST_1',
      SensorValue: 20
    }

    cy.task('log', testData)
  })
  it('should ', function () {
    cy.request('/')
  });
})