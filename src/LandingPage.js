import React, { Component } from 'react';
import './LandingPage.css'

class LandingPage extends Component {
  render() {
    return (
      <div className="uk-position-center">
        <h1 className="uk-heading-primary">Spotify Favourites</h1>
        <p>Find out what your most played tracks are</p>
        <button className="uk-button uk-button-secondary uk-button-large">Get Started</button>
      </div>
    );
  }
}

export default LandingPage;
