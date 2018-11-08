import React, { Component } from 'react';
import {
  HashRouter as Router,
  Route
} from 'react-router-dom';
import Home        		  from './components/Home';
import SignUp           from './components/SignUp';
import Talks            from './components/Talks';
import AdminLogin       from './components/AdminLogin';
import Meetups          from './components/Meetups'


class App extends Component {
    render() {
        return (
            <Router>
        	<div>
				<Route exact path='/'           component={Home} />
				<Route path='/SignUp'           component={SignUp} />
				<Route path='/Admin/Talks'      component={Talks} />
				<Route path='/AdminLogin'       component={AdminLogin} />
        <Route path='/Admin/Meetups'      component={Meetups} />
			</div>
      </Router>
    );
  }
}
export default App;