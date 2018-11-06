'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server/server');
const Nightmare = require('nightmare');

chai.use(chaiHttp);
const expect = chai.expect;
let nightmare;

server.listen(4444);

describe('server/server.js', function() {
  this.timeout(5000);
  beforeEach(done => {
    nightmare = new Nightmare();
    done();
  });

  afterEach(done => {
    done();
  });

  it('responds to /', done => {
    chai
      .request(server)
      .get('/')
      .end((err, res) => {
        expect(err).not.exist;
        expect(res).to.have.status(200);
        done();
      });
  });

  it('Should have in input tag with the id of "speaker-firstname"', () => {
    nightmare
      .goto('http://localhost:4444/#/SignUp')
      .evaluate(() => document.querySelector('#speaker-firstname'))
        .then(input => expect(input).to.exist)
  })
});
