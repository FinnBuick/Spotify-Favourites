import React, { Component } from 'react';
import UIkit from 'uikit';
import '../node_modules/uikit/dist/css/uikit.css'
import testUserData from './user.json';
import testFavData from './data.json';

class Logo extends Component {
  render() {
    return (
      <h1 style={{float: 'left', color: 'white'}}>Spotify Favourites</h1>
    );
  }
}

class User extends Component {
  render() {
    return (
      <div style={{float: 'right', marginTop: 'auto'}}>
        <div style={{color: 'white', display: 'inline-block', padding: '5px'}}>
          {this.props.name}
          <a href='#' style={{display: 'block'}}>Logout</a>
        </div>
        <div style={{display: 'inline-block'}}>
          <img src={this.props.img} height='40' width='40' style={{borderRadius: '20px'}}/>
        </div>
      </div>
    );
  }
}

class Header extends Component {
  render() {
    return (
      <header style={{height: '50px', padding: '10px', backgroundColor: '#222'}}>
        <Logo/>
        <User name={testUserData.display_name} img={testUserData.images[0].url}/>
      </header>
    )
  }
}

class Item extends Component {
  render() {
    let dataAttrs = {
      'data-uk-scrollspy': "{cls: 'uk-animation-fade, repeat: true}"
    }
    return (
      <div className="uk-animation-fade" {...dataAttrs} style={{padding: '20px'}}>
        <img src={this.props.img} style={{width: '500px', height: 'auto'}}/>
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
      <div>
        <Header/>
        <div>
          <div className="uk-flex-column" style={{padding: '20px'}}>
            <h2>Your Top 5</h2>
          {this.state.items[0] && this.state.items.map(item => <Item track={item && item.name} artist={item && item.artists[0].name} img={item && item.album.images[0].url}/>)}
          </div>
        </div>
      </div>
    );
  }
}

export default MainPage;
