import React, { Component } from 'react';
import './App.css'
import LandingPage from './LandingPage';
import MainPage from './MainPage';
import testUserData from './user.json';

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
  render() {
    return (
      <div className='App uk-container'>
        { testUserData.display_name ? <MainPage /> : <LandingPage />}
        <Footer />
      </div>
    );
  }
}

export default App;
