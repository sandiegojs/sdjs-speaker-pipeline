import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Meetups from './components/Meetups';
import AdminLogin from './components/AdminLogin';
import ConfirmOrCancel from './components/ConfirmOrCancel';
import TalksPage from './components/TalksPage';
import Organizers from './components/Organizers';
import SignUp from './components/SignUp';
import Thankyou from './components/Thankyou';

const App = () => (

  <Router>
    <div>
      <Route exact path="/" component={Home} />
      <Route path="/Admin/Login" component={AdminLogin} />
      <Route path="/Admin/Meetups" component={Meetups} />
      <Route path="/Admin/Talks" component={TalksPage} />
      <Route path="/ConfirmOrCancel" component={ConfirmOrCancel} />
      <Route path="/Organizers" component={Organizers} />
      <Route path="/SignUp" component={SignUp} />
      <Route path="/Thankyou" component={Thankyou} />
    </div>
  </Router>
);
export default App;
