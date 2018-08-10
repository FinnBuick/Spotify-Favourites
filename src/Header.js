import React, { Component } from "react";
import queryString from "query-string";


class Header extends Component {
  constructor() {
    super();
    this.state = {
      userData: {}
    };
  }

  componentDidMount() {
    let parsed = queryString.parse(window.location.search);
    let accessToken = parsed.access_token;

    fetch("https://api.spotify.com/v1/me", {
      headers: { Authorization: "Bearer " + accessToken }
    })
      .then(response => response.json())
      .then(data =>
        this.setState({
          userData: {
            display_name: data.display_name,
            image: data.images[0].url
          }
        })
      );
  }

  render() {
    return (
      <nav className="uk-navbar uk-navbar-transparent">
        <div className="uk-navbar-left">
          <ul className="uk-navbar-nav">
            <li className="uk-logo uk-active">
              <h3><a className="uk-link-heading uk-link-reset" href="">Spotify Favourites</a></h3>
            </li>
          </ul>
        </div>
        <div className="uk-navbar-right">
          <ul className="uk-navbar-nav">
            <li><a href="https://spotify-favourites-backend.herokuapp.com/logout">Logout</a></li>
            <div className="uk-navbar-item">{this.state.userData.display_name}</div>
            <div className="uk-navbar-item">
              <img
                className="uk-border-circle"
                src={this.state.userData.image}
                height="40"
                width="40"
                alt="User thumbnail"
              />
            </div>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Header;
