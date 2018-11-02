import React, { Component } from 'react';
import {
  HashRouter as Router,
  Route
} from 'react-router-dom';
import Home        		  from './components/Home';
import SignUp           from './components/SignUp';
import AdminDashboard   from './components/AdminDashboard';
import AdminLogin       from './components/AdminLogin';


class App extends Component {
    render() {
        return (
            <Router>
        	<div>
				<Route exact path='/'           component={Home} />
				<Route path='/SignUp'           component={SignUp} />
				<Route path='/AdminDashboard'	  component={AdminDashboard} />
				<Route path='/AdminLogin'       component={AdminLogin} />
			</div>
      </Router>
    );
  }
}
export default App;