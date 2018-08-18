import React, { Component } from "react";
import queryString from "query-string";
import "./App.css";
import LandingPage from "./LandingPage";
import MainPage from "./MainPage";
// import testUserData from './user.json';

class App extends Component {
  constructor() {
    super();
    this.state = {
      userData: {}
    };
  }

  //Check if we have API access before continuing to the main page of the app
  componentDidMount() {
    let parsed = queryString.parse(window.location.search);
    let accessToken = parsed.access_token;

    fetch("https://api.spotify.com/v1/me", {
      headers: { Authorization: "Bearer " + accessToken }
    })
      .then(response => response.json())
      .then(data =>
        this.setState({ userData: { display_name: data.display_name } })
      );
  }

  render() {
    return (
      <div className="App uk-container">
        {/* If we have API access, display the main page otherwise stay on the landing page */}
        {this.state.userData.display_name ? <MainPage /> : <LandingPage />}
        <footer className="uk-padding">Finneas Buick &copy; 2018</footer>
      </div>
    );
  }
}

export default App;
