import React, { Component } from 'react';
import './App.css'
import LandingPage from './LandingPage';
import MainPage from './MainPage';

class Footer extends Component{
  render() {
    return (
      <footer className="uk-padding uk-position-bottom-center">
        Finneas Buick &copy; 2018
      </footer>
    )
  }
}

class App extends Component {
  render() {
    return (
      <div className='App uk-container'>
        <MainPage />
        <Footer />
      </div>
    );
  }
}

export default App;
