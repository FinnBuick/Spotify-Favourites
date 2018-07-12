import React, { Component } from 'react';
import UIkit from 'uikit';
import '../node_modules/uikit/dist/css/uikit.css'
import '../node_modules/uikit/dist/css/uikit-core.css'
import testUserData from './user.json';
import testFavData from './data.json';



class Header extends Component {
  render() {
    return (
      <nav className="uk-navbar uk-navbar-container">
        <div className="uk-navbar-left">
          <ul className="uk-navbar-nav">
            <li className="uk-logo uk-active"><a href="">Spotify Favourites</a></li>
          </ul>
        </div>
        <div className="uk-navbar-right">
          <ul className="uk-navbar-nav">
            <li><a href="">Logout</a></li>
            <div className="uk-navbar-item">{testUserData.display_name}</div>
            <div className="avatar uk-navbar-item"><img src={testUserData.images[0].url} height='40' width='40'/></div>
          </ul>
        </div>
      </nav>

    )
  }
}

class Item extends Component {
  render() {
    return (
      <div className="uk-animation-fade">
        <img src={this.props.img}/>
        <h2>{this.props.track}</h2>
        <h2>{this.props.artist}</h2>
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
    }, 200)
  }

  render() {
    return (
      <div className="uk-container">
        <Header/>
        <div>
          <div className="uk-flex-column">
            <h2>Your Top 5</h2>
          {this.state.items[0] && this.state.items.map(item => <Item track={item && item.name} artist={item && item.artists[0].name} img={item && item.album.images[0].url}/>)}
          </div>
        </div>
      </div>
    );
  }
}

export default MainPage;
