import React, { Component } from 'react';
import './LandingPage.css'

class LandingPage extends Component {
  render() {
    return (
      <div className="LandingPage">
        <div className="uk-position-center">
          <h1 className="uk-heading-primary">Spotify Favourites</h1>
          <p>Find out your most played tracks</p>
          <button onClick={() => window.location = 'https://spotify-favourites-backend.herokuapp.com/login'}
            className="uk-button uk-button-secondary uk-button-large">Get Started</button>
        </div>
      </div>
    );
  }
}

export default LandingPage;
