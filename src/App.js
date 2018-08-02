import React, { Component } from 'react';
import queryString from 'query-string';
import './App.css'
import LandingPage from './LandingPage';
import MainPage from './MainPage';
// import testUserData from './user.json';

class Footer extends Component{
  render() {
    return (
      <footer className="uk-padding">
        Finneas Buick &copy; 2018
      </footer>
    )
  }
}

class App extends Component {
  constructor() {
    super();
    this.state ={
      userData: {}
    }
  }

  componentDidMount() {
    let parsed = queryString.parse(window.location.search)
    let accessToken = parsed.access_token

    fetch('https://api.spotify.com/v1/me', {
      headers: {'Authorization': 'Bearer ' + accessToken}
    }).then((response) => response.json())
    .then(data => this.setState({userData: {display_name: data.display_name}}));
  }

  render() {
    return (
      <div className='App uk-container'>
        { this.state.userData.display_name ? <MainPage /> : <LandingPage />}
        <Footer />
      </div>
    );
  }
}

export default App;
