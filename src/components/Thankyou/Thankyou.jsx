import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar';

class Thankyou extends Component {
	constructor(props) {
		super(props)
	}
	render() {
		return (
			<div>
				<div>
					<Navbar />
				</div>
				<div style={{marginTop: '200px', textAlign: 'center'}}> 
					Thank you! Your submission has been recieved and we will be in contact shortly.
				</div>
			</div>
		)
	}
}

export default Thankyou;