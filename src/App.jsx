import React, { Component } from 'react';
import {
  HashRouter as Router,
  Route
} from 'react-router-dom';
import Home       from './components/Home/Home';
import Meetups    from './components/Meetups';
import AdminLogin from './components/AdminLogin';
import TalksPage  from './components/TalksPage/TalksPage';
import Organizers from './components/Organizers';
import SignUp     from './components/SignUp';
import Thankyou   from './components/Thankyou/Thankyou'

class App extends Component {
    render() {
        return (
            <Router>
        	<div>
				<Route exact path='/'        component={Home} />
        <Route path='/AdminLogin'    component={AdminLogin} />
        <Route path='/Admin/Meetups' component={Meetups} />
				<Route path='/Admin/Talks'   component={TalksPage} />
        <Route path='/Organizers'    component={Organizers} />
				<Route path='/SignUp'        component={SignUp} />
        <Route path='/Thankyou'     component={Thankyou} />
			</div>
      </Router>
    );
  }
} 
export default App;