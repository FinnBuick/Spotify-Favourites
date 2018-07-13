import React, { Component } from 'react';
import './MainPage.css'
import UIkit from 'uikit';
import '../node_modules/uikit/dist/css/uikit.css'
import '../node_modules/uikit/dist/js/uikit-icons.js'
import testUserData from './user.json';
import testFavData from './data.json';



class Header extends Component {
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
            <div className="uk-navbar-item">{testUserData.display_name}</div>
            <div className="uk-navbar-item">
              <img className="uk-border-circle" src={testUserData.images[0].url} height='40' width='40'/>
            </div>
          </ul>
        </div>
      </nav>

    )
  }
}

class Item extends Component {
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
  constructor() {
    super()
    this.state = {items: {}}
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({items: testFavData.items})
    }, 1000)
  }

  render() {
    return (
      <div className="MainPage">
        <Header/>
        <div>
          <div className="uk-container" style={{width: '600px'}}>
            <h2>Your Top 5</h2>
            {this.state.items[0] ? this.state.items.map(item =>
              <Item
                track={item && item.name}
                artist={item && item.artists[0].name}
                img={item && item.album.images[0].url}
                audio={item && item.preview_url}
                />) : <span uk-spinner="ratio: 4.5"></span>}
              </div>
            </div>
          </div>
        );
      }
    }

    export default MainPage;
