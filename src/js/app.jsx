import React, { Component } from 'react';

export default class App extends Component {
  render() {
    return (
      
      <div className="card text-center">
      <div className="card-header text-left" id="logo">
      <a className="navbar-brand" href="#" ><img src="js.png" /></a>
     
      </div>
      <div className="card-body" id="welcome">
        <h1>Welcome to san diego.JS</h1>
        <h4 className="card-text text-center">Have you been learning JavaScript and want to spend 5 or less minutes sharing something you learned?
         Did you find a library or discover a JS feature you'd like to share? Have an interesting method
         for learning or teaching JavaScript?</h4>
         <br />
        <button id="talk">GIVE A TALK</button>
      </div>
      <div className="card-footer text-dark text-center">
      <a className="text-dark" id="footer" href="#"><h6>Code of conduct</h6></a>
      </div>
</div>
    );
  }
}