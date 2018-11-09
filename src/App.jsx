import React, { Component } from 'react';
import {
  HashRouter as Router,
  Route
} from 'react-router-dom';
import AdminHome  from './components/AdminHome';
import AdminLogin from './components/AdminLogin';
import Home       from './components/Home';
import Meetups    from './components/Meetups';
import Talks      from './components/Talks';
import Organizers from './components/Organizers';
import SignUp     from './components/SignUp';

class App extends Component {
    render() {
        return (
            <Router>
        	<div>
				<Route exact path='/'        component={Home} />
        <Route path='/AdminHome'     component={AdminHome} />
				<Route path='/AdminLogin'    component={AdminLogin} />
        <Route path='/Admin/Meetups' component={Meetups} />
				<Route path='/Admin/Talks'   component={Talks} />
        <Route path='/Organizers'    component={Organizers} />
				<Route path='/SignUp'        component={SignUp} />
			</div>
      </Router>
    );
  }
}
export default App;