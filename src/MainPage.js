import React, { Component } from 'react';
import queryString from 'query-string';
import './MainPage.css';
import '../node_modules/uikit/dist/css/uikit.css';
import '../node_modules/uikit/dist/js/uikit-icons.js';
// import testUserData from './user.json';
// import testFavData from './data.json';



class Header extends Component {
  constructor(){
    super();
    this.state = {
      userData: {}
    }
  }

  componentDidMount() {
    let parsed = queryString.parse(window.location.search);
    let accessToken = parsed.access_token;

    fetch('https://api.spotify.com/v1/me', {
      headers: {'Authorization': 'Bearer ' + accessToken}
    }).then((response) => response.json())
    .then(data => this.setState({userData: {
      display_name: data.display_name,
      image: data.images[0].url
    }}))
  }

  render() {

    return (
      <nav className="uk-navbar uk-navbar-transparent">
        <div className="uk-navbar-left">
          <ul className="uk-navbar-nav">
            <li className="uk-logo uk-active"><a href="">Spotify Favourites</a></li>
          </ul>
        </div>
        <div className="uk-navbar-right">
          <ul className="uk-navbar-nav">
            <li><a href="">Logout</a></li>
            <div className="uk-navbar-item">{this.state.userData.display_name}</div>
            <div className="uk-navbar-item">
              <img className="uk-border-circle" src={this.state.userData.image} height='40' width='40'/>
            </div>
          </ul>
        </div>
      </nav>

    )
  }
}

class Track extends Component {
  render() {
    return (
      <div className="uk-card uk-card-hover uk-card-default uk-grid-collapse uk-child-width-1-2@s uk-margin uk-grid" uk-grid="" uk-scrollspy="target: > div; cls:uk-animation-fade; delay: 500">
        <div className="uk-flex-last@s uk-card-media-right uk-cover-container">
          <img src={this.props.img} alt="" uk-cover="" className="uk-cover"/>
          <canvas width="1000" height="1000"></canvas>
        </div>
        <div className="uk-first-column">
          <div className="uk-card-header">
            <h3 className="uk-card-title">{this.props.track} - {this.props.artist}</h3>
          </div>
          <div className="uk-card-body">
            <audio controls>
              <source src={this.props.audio} type="audio/mpeg"/>
              Your browser does not support the audio element.
            </audio>
          </div>
        </div>
      </div>

    )
  }
}

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tracks: [],
      requestFailed: false
    }
  }

  componentDidMount() {
    let parsed = queryString.parse(window.location.search);
    let accessToken = parsed.access_token;

    fetch('https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=5', {
      headers: {'Authorization': 'Bearer ' + accessToken}
    }).then(response => {
      if(!response.ok) {
        throw Error("Network request failed")
      }

      return response
    })
    .then(data => data.json())
    .then(data => {
      this.setState(
        {
          tracks: data.items
        })
      }, () => {
        this.setState({
          requestFailed: true
        })
      })
    }

    render() {
      if(this.state.requestFailed) return <p>Request Failed, please try again.</p>

      const trackItems = this.state.tracks && this.state.tracks.map(track =>
        <Track
          track={track && track.name}
          artist={track && track.artists[0].name}
          img={track && track.album.images[1].url}
          audio={track && track.preview_url}
          />
      )
      return (
        <div className="MainPage">
          <Header/>
          <div>
            <div className="uk-container" style={{width: '600px'}}>
              <h2>Your Top 5</h2>
              {this.state.tracks ? trackItems : <span uk-spinner="ratio: 4.5"></span>}
            </div>
          </div>
        </div>
      );
    }
  }

  export default MainPage;
