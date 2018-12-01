import chai from 'chai';
import chaiHttp from 'chai-http';
import { expect } from 'chai';
import Nightmare from 'nightmare';
import chaiAsPromised from 'chai-as-promised';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import server from '../server/server';
import { changeTalkContent } from '../server/utils/changeTalkContent';
import { changeTalkOwner } from '../server/utils/changeTalkOwner';
import { changeTalkStatus } from '../server/utils/changeTalkStatus';
import { formatTalkForEmail } from '../server/utils/formatTalkForEmail';
import { getMeetups } from '../server/utils/getMeetups';
import { getTalkDetails } from '../server/utils/getTalkDetails';
import { sendEmailToSpeaker } from '../server/utils/sendGridEmailer';
import { sendEmailToAdmin } from '../server/utils/sendGridEmailer';
import { sendEmailToNewAdmin } from '../server/utils/sendGridEmailer';
import { talkSubmit } from '../server/utils/talkSubmit';

chai.use(chaiHttp);
chai.use(chaiAsPromised);
let nightmare;
Enzyme.configure({ adapter: new Adapter() });
server.listen(4444);

describe('server/server.js', function () {
  this.timeout(50000);
  beforeEach(() => {
    nightmare = new Nightmare({ show: true });

  });

  it('should respond to /SignUp', done => {
    chai
      .request(server)
      .get('/')
      .end((err, res) => {
        expect(err).not.exist;
        expect(res).to.have.status(200);
        done();
      });
  });

  it('Speaker signup should have input tag with the id of "speakerName"', (done) => {
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

  it('It Should add a speaker', (done) => {
    nightmare
      .goto('http://localhost:4444/#/SignUp')
      .wait(1000)
      .type('#speakerName', 'John Smith')
      .type('#speakerEmail', 'john@email.com')
      .type('#speakerPhone', '111-111-1111')
      .wait(1000)
      .select('#event-date', '2018-12-20')
      .type('#topic', 'topic')
      .wait(1000)
      .type('#description', 'description')
      .wait(1000)
      .click('#speaker-submit')
      .wait(1000)
      .goto('http://localhost:4444/#/Thankyou')
      .wait(1000)
      .evaluate(() => document.querySelector('div').innerText)
      .then(header => expect(header).to.contain('thanks'))
    done()
  })

  it('Should be able to log in as an admin', (done) => {
    nightmare
      .goto('http://localhost:4444/#/AdminLogin')
      .wait(1000)
      .type('#username', process.env.ADMIN_USERNAME)
      .type('#password', process.env.ADMIN_PASSWORD)
      .click('#submit')
      .wait(1000)
      .goto('http://localhost:4444/#/Admin/Meetups')
      .wait(1000)
      .evaluate(() => document.querySelector('header').innerText)
      .end()
      .evaluate(() => document.querySelector('h1').innerText)
      .then(header => expect(header).to.contain('Upcoming Meetups'))
    done()
  })

  it('Speaker signup should have in input tag with the id of speakerEmail', (done) => {
    nightmare
      .goto('http://localhost:4444/#/SignUp')
      .evaluate(() => document.querySelector('#speakerEmail'))
      .then(input => expect(input).to.exist)
    done()
  });
  
  it('Should be able to toggle the status of talks', (done) => {
    nightmare
      .goto('http://localhost:4444/#/Admin/Meetups')
      .wait(1000)
      .type('#table-speaker', 'DefaultAdmin')
      .type('#password', 'admin')
      .click('#submit')
      .wait(1000)
      .goto('http://localhost:4444/#/Admin/Meetups')
      .wait(1000)
      .evaluate(() => document.querySelector('header').innerText)
      .end()
      .then(header => expect(header).to.contain('Upcoming Meetups'))
    done()
      .catch(err => console.log(err))
  })

  it('Should be able to add a new admin', (done) => {
    nightmare
      .goto('http://localhost:4444/#/Organizers')
      .wait(1000)
      .type('#newAdminName', 'Anthony Valera')
      .type('#newAdminEmail', 'thisTicketDeservesAMedal@email.com')
      .type('#newAdminPassword', 'youreDoingGreat')
      .click('#btn')
      .wait(1000)
      .evaluate(() => document.querySelector('admin-map-content').innerText)
      .end()
      .then(header => expect(header).to.contain('Anthony Valera'))
    done()
      .catch(err => console.log(err))
  })

it('changeTalkContent should reject with "Bad talk Id"', function () {
  return expect(changeTalkContent('this', 'test', 'should', 'fail')).to.be.rejectedWith('Cannot read property \'status\' of null');
});

it('changeTalkOwner should reject with Bad Talk Id"', function () {
  return expect(changeTalkOwner(undefined, undefined)).to.be.rejectedWith('TalkId is undefined');
});

it('changeTalkStatus should reject with Bad Talk Id"', function () {
  return expect(changeTalkStatus('Could not find talk')).to.be.rejectedWith('selectedStatus is undefined');
});

it('formatTalkForEmail should reject with Bad Talk Id"', function () {
  return expect(formatTalkForEmail('Bad Speaker Id')).to.be.rejectedWith('eventId is undefined');
});

it('getMeetups should reject with Bad Talk Id"', function () {
  return expect(getMeetups('this should pass with any params')).to.be.fulfilled;
});

it('getTalkDetails should reject with Bad Talk Id"', function () {
  return expect(getTalkDetails('this should pass with any params')).to.be.fulfilled;
});

it('sendEmailToSpeaker should reject with Bad Talk Id"', function () {
  return expect(sendEmailToSpeaker('Could not find talk')).to.be.rejectedWith('speakerEmail is undefined');
});

it('sendEmailToSpeaker should reject with Bad Talk Id"', function () {
  return expect(sendEmailToSpeaker('Could not find talk')).to.be.rejectedWith('speakerEmail is undefined');
});

it('sendEmailToAdmin should reject with Bad Talk Id"', function () {
  return expect(sendEmailToAdmin('Could not find talk')).to.be.rejectedWith('Speaker Email is undefined');
});

it('sendEmailToNewAdmin should reject with Bad Talk Id"', function () {
  return expect(sendEmailToNewAdmin('Could not find talk')).to.be.rejectedWith('New Admin Email is undefined');
});

it('talkSubmit should reject with Bad Talk Id"', function () {
  return expect(talkSubmit('Could not find talk')).to.be.rejected;
});

});
