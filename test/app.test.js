const chai = require('chai'), chaiHttp = require('chai-http');
const expect = chai.expect;
const assert = require('assert');
const main = require('../main');
const server = require('../app');


chai.use(chaiHttp);
chai.should();


describe('',  () => {
  // before(() => {
  //   main.main('!!!TEST 3!!!!', 1000);
  //   main.main('!!!TEST 2!!!!', 5000);
  // });


  it('TESTTTTTTT', (done) => {
    chai.request(server)
      .get('/')
      .end((err, res) => {
        res.should.have.status(200);
        expect(res.body).to.have.lengthOf(10);
        console.log(res.body);
        done();
      });
  });

})