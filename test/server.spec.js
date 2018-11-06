'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server/server');
const Nightmare = require('nightmare');
const expect = require('chai').expect;

chai.use(chaiHttp);
let nightmare;

server.listen(4444);

describe('server/server.js', function() {
  this.timeout(30000);
  beforeEach(() => {
    nightmare = new Nightmare({ show: true} );
    
  });

  // afterEach(done => {
  //   done();
  // });

  it('should respond to /', done => {
    chai
      .request(server)
      .get('/')
      .end((err, res) => {
        expect(err).not.exist;
        expect(res).to.have.status(200);
        done();
      });
  });

  it('Speaker signup should have in input tag with the id of "speaker-firstname"', (done) => {
    nightmare
      .goto('http://localhost:4444/#/SignUp')
      .evaluate(() => document.querySelector('#speaker-firstname'))
        .then(input => expect(input).to.exist)
        done()
  });

  it('Admin dashboard should have a button with the classname "btn"', (done) => {
    nightmare
      .goto('http://localhost:4444/#/AdminDashboard')
      .evaluate(() => document.querySelector('button.btn'))
        .then(button => expect(button).to.exist)
        done()
  });

  it('Admin dashboard should have an <h1> that says "Pending Speakers"', (done) => {
    nightmare
      .goto('http://localhost:4444/#/AdminDashboard')
      .evaluate(() => document.querySelector('h1').innerText)
        .then(header => expect(header).to.contain('Pending Speakers'))
        done()
  });

  it('Should add speaker to admin dashboard after form is submitted', (done) => {
    nightmare
      .goto('http://localhost:4444/#/SignUp')
      .wait(1000)
      .type('#speaker-firstname', 'John')
      .type('#speaker-lastname', 'Smith')
      .type('#speaker-email', 'john@email.com')
      .wait(1000)
      .type('#phone', '123456767890')
      .type('#company', 'origin')
      .wait(1000)
      .select('#event-date', '2018-11-06')
      .type('#topic', 'topic')
      .wait(1000)
      .type('#description', 'description')
      .wait(1000)
      .click('#speaker-submit')
      .wait(1000)
      .goto('http://localhost:4444/#/AdminDashboard')
      .evaluate(() => document.querySelector('td').innerText)
      .end()
      .then(text => {
        expect(text).to.contain('John Smith')
        done();
      })
      .catch(err => console.log(err))
  })

});
