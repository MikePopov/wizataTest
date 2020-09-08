const chai = require('chai'), chaiHttp = require('chai-http');
const expect = chai.expect;
const assert = require('assert');
const main = require('../main');
const app = require('../app');


chai.use(chaiHttp);
chai.should();


describe('',  () => {
  before(async () => {
    await main.main('777777', 77);
    await main.main('888888', 88);
  });


  it('TESTTTTTTT', (done) => {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        res.should.have.status(200);
        expect(res.body).to.have.lengthOf(10);
        expect(res.body[0]).to.have.property('value').eq(3000);
        expect(res.body[1]).to.have.property('value').eq(10000);
        console.log(res.body);
        done();
      });
  });

})