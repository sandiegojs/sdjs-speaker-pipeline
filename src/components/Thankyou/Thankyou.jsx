import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar';
import { resetSubmitted } from '../SignUp/SignUpActions'

class Thankyou extends Component{
	constructor(props){
		super(props)
	}

	componentDidMount(){
		const { dispatch } = this.props;
		dispatch(resetSubmitted())
	}


	render(){
		return (
			<div>
				<Navbar />
				<div id='thanks' style={{ marginTop: '200px', textAlign: 'center' }}>
					Thank you! Your submission has been recieved and we will be in contact shortly.
				</div>
			</div>
		)
	}
}
export default Thankyou;
